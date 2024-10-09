import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Table,
  Modal,
  message,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  DeleteOutlined,
  PrinterOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BiExit, BiMessageRounded } from "react-icons/bi";

const { Option } = Select;

const OtherSales = () => {
  const [customerSearchKeyword, setCustomerSearchKeyword] = useState("");
  const [itemSearchKeyword, setItemSearchKeyword] = useState("");
  const [customerSearchResult, setCustomerSearchResult] = useState([]);
  const [itemSearchResult, setItemSearchResult] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [payableAmount, setPayableAmount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [dueBalance, setDueBalance] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemForm] = Form.useForm();
  const [paymentForm] = Form.useForm();
  const [saleForm] = Form.useForm();
  const [customerModalVisible, setCustomerModalVisible] = useState(false);
  const [itemModalVisible, setItemModalVisible] = useState(false);

  // Fetch Customers
  const handleCustomerSearch = async () => {
    if (!customerSearchKeyword) {
      message.warning("Please enter a keyword to search customers.");
      return;
    }
    try {
      // Replace with your API endpoint
      const response = await axios.get(
        `/api/customers?search=${customerSearchKeyword}`
      );
      setCustomerSearchResult(response.data);
      setCustomerModalVisible(true);
    } catch (error) {
      message.error("Error fetching customers.");
    }
  };

  // Fetch Items
  const handleItemSearch = async () => {
    // if (!itemSearchKeyword) {
    //   message.warning("Please enter a keyword to search items.");
    //   return;
    // }
    // try {
    //   // Replace with your API endpoint
    //   const response = await axios.get(
    //     `/api/items?search=${itemSearchKeyword}`
    //   );
    //   setItemSearchResult(response.data);
    //   setItemModalVisible(true);
    // } catch (error) {
    //   message.error("Error fetching items.");
    // }
    setItemModalVisible(true);
  };

  // Add Item to Selected Items
  const handleAddItem = (values) => {
    if (!selectedItem) {
      message.warning("Please select an item.");
      return;
    }
    const { quantity, discount } = values;
    const amount = selectedItem.price * quantity - discount;
    const newItem = {
      ...selectedItem,
      quantity,
      discount,
      amount,
    };
    setSelectedItems([...selectedItems, newItem]);
    calculateTotals([...selectedItems, newItem]);
    itemForm.resetFields();
    setSelectedItem(null);
  };

  // Calculate Totals
  const calculateTotals = (items) => {
    const totalAmt = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const totalDisc = items.reduce((sum, item) => sum + item.discount, 0);
    const payable = totalAmt - totalDisc;
    setTotalAmount(totalAmt);
    setTotalDiscount(totalDisc);
    setPayableAmount(payable);
    setDueBalance(payable - paidAmount);
  };

  // Handle Payment
  const handlePayment = (values) => {
    const { paymentAmount, paymentType } = values;
    const newPayment = {
      key: paymentData.length + 1,
      billNo: `BILL${paymentData.length + 1}`,
      net: payableAmount,
      paymentType,
      paid: paymentAmount,
      balance: payableAmount - paymentAmount,
    };
    setPaymentData([...paymentData, newPayment]);
    setPaidAmount(paidAmount + paymentAmount);
    setDueBalance(payableAmount - (paidAmount + paymentAmount));
    paymentForm.resetFields();
  };

  // Remove Item
  const handleRemoveItem = (key) => {
    const filteredItems = selectedItems.filter((item) => item.key !== key);
    setSelectedItems(filteredItems);
    calculateTotals(filteredItems);
  };

  // Clear All
  const handleClearAll = () => {
    saleForm.resetFields();
    itemForm.resetFields();
    paymentForm.resetFields();
    setSelectedCustomer(null);
    setSelectedItems([]);
    setPaymentData([]);
    setTotalAmount(0);
    setTotalDiscount(0);
    setPayableAmount(0);
    setPaidAmount(0);
    setDueBalance(0);
    setSelectedItem(null);
  };

  // Exit Function
  const handleExit = () => {
    // Implement your exit logic here, e.g., navigate to another page
    window.location.href = "/dashboard";
  };

  // Columns for Selected Items Table
  const selectedItemsColumns = [
    {
      title: "Item Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => `Rs. ${text}`,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (text) => `Rs. ${text}`,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => `Rs. ${text}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="danger"
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveItem(record.key)}
        />
      ),
    },
  ];

  // Columns for Payment Data Table
  const paymentDataColumns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Bill No",
      dataIndex: "billNo",
      key: "billNo",
    },
    {
      title: "Net",
      dataIndex: "net",
      key: "net",
      render: (text) => `Rs. ${text}`,
    },
    {
      title: "Pay Type",
      dataIndex: "paymentType",
      key: "paymentType",
    },
    {
      title: "Paid",
      dataIndex: "paid",
      key: "paid",
      render: (text) => `Rs. ${text}`,
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (text) => `Rs. ${text}`,
    },
  ];

  return (
    <div className=" mx-auto bg-white p-6 w-full shadow-md">
      <div className="grid grid-cols-12 gap-4  w-full">
        {/* Header Title */}
        <div className="col-span-10 flex items-center">
          <h1 className="text-3xl font-bold p-2 my-2">
            Other <span className="text-purple-500">Sales</span>
          </h1>
        </div>

        {/* Icon */}
        <div className="col-span-2 flex items-center justify-center text-center p-2">
          <Link to="/dashboard">
            <FaHome className="text-3xl cursor-pointer" />
          </Link>
        </div>
      </div>

      <div className="flex space-x-2 w-1/4 p-2">
        <Input
          placeholder="Search Customer"
          value={customerSearchKeyword}
          onChange={(e) => setCustomerSearchKeyword(e.target.value)}
          className="rounded-full"
        />
        <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={handleCustomerSearch}
        />
      </div>

      <div className="p-5 bg-gray-200 justify-center rounded-xl shadow-xl">
        {/* Sale Form */}
        <Form layout="vertical" form={saleForm}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border-2 border-gray-300 p-4 mb-4">
            <Form.Item label="Search Item">
              <div className="flex space-x-2">
                <Input
                  placeholder="Search Item"
                  value={itemSearchKeyword}
                  onChange={(e) => setItemSearchKeyword(e.target.value)}
                  className="rounded-full"
                />
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={handleItemSearch}
                />
              </div>
            </Form.Item>
            <Form.Item label="Invoice No" name="invoiceNo">
              <Input placeholder="Invoice No" />
            </Form.Item>
            <Form.Item label="Date" name="date">
              <DatePicker
                className="w-full"
                defaultValue={moment()}
                format="YYYY-MM-DD"
              />
            </Form.Item>
            <Form.Item label="Customer No">
              <Input
                placeholder="Customer No"
                value={selectedCustomer?.customerNo || ""}
                disabled
              />
            </Form.Item>
            <Form.Item label="Customer Name">
              <Input
                placeholder="Customer Name"
                value={selectedCustomer?.name || ""}
                disabled
              />
            </Form.Item>
            {/* <Form.Item label="Payment Type" name="paymentType">
              <Select placeholder="Select Payment Type">
                <Option value="Cash">Cash</Option>
                <Option value="Card">Card</Option>
                <Option value="Online Transfer">Online Transfer</Option>
              </Select>
            </Form.Item> */}
          </div>
        </Form>

        {/* Totals and Item Form */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Totals */}
          <div className="col-span-1 border-2 border-gray-300 p-4">
            <h3 className="text-center font-semibold mb-4">Summary</h3>
            <Form layout="vertical">
              <Form.Item label="Bill Total">
                <Input value={`Rs. ${totalAmount}`} disabled />
              </Form.Item>
              <Form.Item label="Discount">
                <Input value={`Rs. ${totalDiscount}`} disabled />
              </Form.Item>
              <Form.Item label="Payable">
                <Input value={`Rs. ${payableAmount}`} disabled />
              </Form.Item>
              <Form.Item label="Paid">
                <Input value={`Rs. ${paidAmount}`} disabled />
              </Form.Item>
              <Form.Item label="Due Balance">
                <Input value={`Rs. ${dueBalance}`} disabled />
              </Form.Item>
            </Form>
          </div>

          {/* Item Form */}
          <div className="col-span-1 lg:col-span-3 border-2 border-gray-300 p-4">
            <Form layout="vertical" form={itemForm} onFinish={handleAddItem}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <Form.Item label="Code">
                  {/* <Input
                    value={selectedItem?.code || ""}
                    // disabled
                    placeholder="Select Item"
                  /> */}
                   <div className="flex space-x-2">
                <Input
                  placeholder="Search Code"
                  value={itemSearchKeyword}
                  onChange={(e) => setItemSearchKeyword(e.target.value)}
                  className="rounded-full"
                />
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={handleItemSearch}
                />
              </div>
                </Form.Item>


                <Form.Item label="Description">
                  <Input
                    value={selectedItem?.description || ""}
                    disabled
                    placeholder="Select Item"
                  />
                </Form.Item>
                <Form.Item
                  label="Quantity"
                  name="quantity"
                  rules={[
                    { required: true, message: "Please enter quantity" },
                    {
                      type: "number",
                      min: 1,
                      message: "Minimum quantity is 1",
                    },
                  ]}
                >
                  <Input type="number" min={1} />
                </Form.Item>
                <Form.Item label="Price">
                  <Input
                    value={`Rs. ${selectedItem?.price || 0}`}
                    // disabled
                    placeholder="Select Item"
                  />
                </Form.Item>
                <Form.Item
                  label="Discount"
                  name="discount"
                  initialValue={0}
                  rules={[
                    { required: true, message: "Please enter discount" },
                    {
                      type: "number",
                      min: 0,
                      message: "Minimum discount is 0",
                    },
                  ]}
                >
                  <Input type="number" min={0} />
                </Form.Item>
                <Form.Item label="Amount">
                  <Input
                    value={`Rs. ${
                      selectedItem
                        ? selectedItem.price *
                            itemForm.getFieldValue("quantity") -
                          itemForm.getFieldValue("discount")
                        : 0
                    }`}
                    // disabled
                  />
                </Form.Item>
                {/* <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<PlusOutlined />}
                    disabled={!selectedItem}
                    className="mt-7"
                  >
                    Add Item
                  </Button>
                </Form.Item> */}
              </div>
            </Form>

            {/* Selected Items Table */}
            <Table
              dataSource={selectedItems.map((item, index) => ({
                ...item,
                key: index,
              }))}
              columns={selectedItemsColumns}
              pagination={false}
              className="mt-4"
            />
          </div>
        </div>

        {/* Payment Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
          {/* <div className="col-span-1 border-2 border-gray-300 p-4">
            <Form layout="vertical" form={paymentForm} onFinish={handlePayment}>
              
              <Form.Item
                label="Payment Type"
                name="paymentType"
                rules={[
                  { required: true, message: "Please select payment type" },
                ]}
              >
                <Select placeholder="Select Payment Type">
                  <Option value="Cash">Cash</Option>
                  <Option value="Card">Card</Option>
                  <Option value="Online Transfer">Online Transfer</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Payment Amount"
                name="paymentAmount"
                rules={[
                  { required: true, message: "Please enter payment amount" },
                ]}
              >
                <Input type="number" min={0} />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Save Payment
              </Button>
            </Form>
          </div> */}

          {/* Payment Data Table */}
          <div className="col-span-1 lg:col-span-7 border-2 border-gray-300 p-4">
            <Table
              dataSource={paymentData}
              columns={paymentDataColumns}
              pagination={false}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <Button
            type="default"
            icon={<CloseOutlined />}
            onClick={handleClearAll}
          >
            Clear
          </Button>
          <Button type="primary" icon={<PrinterOutlined />}>
            Print
          </Button>
          <Button
            type="default"
            icon={<BiMessageRounded />}
            className="border-green-600 text-green-600"
          >
            SMS
          </Button>
          <Button type="default" onClick={handleExit} icon={<BiExit />}>
            Exit
          </Button>
        </div>

        {/* Customer Modal */}
        <Modal
          visible={customerModalVisible}
          title="Select Customer"
          footer={null}
          onCancel={() => setCustomerModalVisible(false)}
        >
          <Table
            dataSource={customerSearchResult.map((customer) => ({
              ...customer,
              key: customer.id,
            }))}
            columns={[
              {
                title: "Customer No",
                dataIndex: "customerNo",
                key: "customerNo",
              },
              { title: "Name", dataIndex: "name", key: "name" },
              {
                title: "Action",
                key: "action",
                render: (_, record) => (
                  <Button
                    type="primary"
                    onClick={() => {
                      setSelectedCustomer(record);
                      setCustomerModalVisible(false);
                    }}
                  >
                    Select
                  </Button>
                ),
              },
            ]}
          />
        </Modal>

        {/* Item Modal */}
        <Modal
          visible={itemModalVisible}
          title="Select Item"
          footer={null}
          onCancel={() => setItemModalVisible(false)}
        >
          <Table
            dataSource={itemSearchResult.map((item) => ({
              ...item,
              key: item.id,
            }))}
            columns={[
              { title: "Code", dataIndex: "code", key: "code" },
              {
                title: "Description",
                dataIndex: "description",
                key: "description",
              },
              {
                title: "Price",
                dataIndex: "price",
                key: "price",
                render: (text) => `Rs. ${text}`,
              },
              {
                title: "Action",
                key: "action",
                render: (_, record) => (
                  <Button
                    type="primary"
                    onClick={() => {
                      setSelectedItem(record);
                      setItemModalVisible(false);
                    }}
                  >
                    Select
                  </Button>
                ),
              },
            ]}
          />
        </Modal>
      </div>
    </div>
  );
};

export default OtherSales;
