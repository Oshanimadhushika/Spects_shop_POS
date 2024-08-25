import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Table,
  Radio,
  notification,
  DatePicker,
  Typography,
} from "antd";
import { SearchOutlined, FileDoneOutlined } from "@ant-design/icons";
// import 'antd/dist/reset.css'; // Import Ant Design styles
// import './index.css'; // Import Tailwind CSS

const { Option } = Select;
const { RangePicker } = DatePicker;

const Invoice = () => {
  const [form] = Form.useForm();
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [payType, setPayType] = useState("");

  const handleAddItem = () => {
    // Logic to add item
  };

  const handleSearch = () => {
    // Logic to search item
  };

  const handlePaymentTypeChange = (e) => {
    setPayType(e.target.value);
  };
  const handleClear = () => {
    form.resetFields();
    notification.info({ message: "Form cleared!" });
  };

  return (
    <div className="border-2 border-gray-300 bg-gray-200 p-4 mb-4 shadow-xl">
      {/* <h3 className="text-lg font-bold mb-4"></h3> */}
      <Typography.Title level={3}>Invoice</Typography.Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={() => {
          /* Submit logic */
        }}
      >
        <div className="grid grid-cols-12 gap-2 mb-4">
          <Form.Item label="Invoice Date" className="col-span-2">
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item label="Invoice No" className="col-span-2">
            <Input className="w-full" />
          </Form.Item>

          <Form.Item label="Lens Type" className="col-span-1">
            <Select className="w-full">
              <Option value="">Select an option</Option>
              <Option value="1">Option 1</Option>
              <Option value="2">Option 2</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Brand" className="col-span-1">
            <Select className="w-full">
              <Option value="">Select an option</Option>
              <Option value="1">Option 1</Option>
              <Option value="2">Option 2</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Coating" className="col-span-1">
            <Select className="w-full">{/* Options */}</Select>
          </Form.Item>

          <Form.Item label="Tint" className="col-span-2">
            <Select className="w-full">{/* Options */}</Select>
          </Form.Item>

          <Form.Item label="Design" className="col-span-2">
            <Select className="w-full">{/* Options */}</Select>
          </Form.Item>

          <Form.Item className="col-span-2 ">
            <Button type="default" className="w-full bg-yellow-400">
              Clear
            </Button>
          </Form.Item>

          <Form.Item className="col-span-2">
            <Button type="primary" className="w-full" onClick={handleAddItem}>
              Add
            </Button>
          </Form.Item>
        </div>

        <div className="grid grid-cols-12 gap-2 mb-4">
          <Form.Item className="col-span-2 flex items-center mt-7">
            <Input.Search
              placeholder="Search Item"
              className="w-full"
              onSearch={handleSearch}
              enterButton={<SearchOutlined />}
            />
          </Form.Item>

          <Form.Item label="Item Code" className="col-span-2">
            <Select
              className="w-full"
              onChange={(value) => {
                /* Handle item code change */
              }}
            >
              {/* Options dynamically populated */}
            </Select>
          </Form.Item>

          <Form.Item label="Bar" className="col-span-2">
            <Input className="w-full" />
          </Form.Item>

          <Form.Item label="Item" className="col-span-3">
            <Input className="w-full" />
          </Form.Item>

          <Form.Item label="Display On Bill" className="col-span-3">
            <Select className="w-full">{/* Options */}</Select>
          </Form.Item>
        </div>

        <div className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-6">
            <Form.Item label="Quantity">
              <Input className="w-full" />
            </Form.Item>

            <Form.Item label="Price">
              <Input className="w-full" />
            </Form.Item>

            <Form.Item label="Discount">
              <Input className="w-full" />
            </Form.Item>

            <Form.Item label="Discount Amount">
              <Input className="w-full" />
            </Form.Item>

            <Form.Item label="Amount">
              <Input className="w-full" />
            </Form.Item>

            {/* <Button type="primary" onClick={handleAddItem}>
              <FileDoneOutlined />
              Add Item
            </Button> */}
          </div>

          <div className="col-span-6">
            <div className="border-2 border-gray-200 p-4 mb-4">
              <div className="mb-2">
                <strong className="text-sm">Total</strong>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Bill Total Rs:</span>
                <span className="font-semibold text-red-600">0.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Discount:</span>
                <span className="font-semibold text-red-600">0.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Payable:</span>
                <span className="font-semibold text-red-600">0.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Paid:</span>
                <span className="font-semibold text-red-600">0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Due Balance:</span>
                <span className="font-semibold text-red-600">0.00</span>
              </div>
            </div>

            <div className="bg-gray-300 p-4 rounded-md mb-4">
              <Form.Item label="Cash LKR">
                <Input className="w-full" />
              </Form.Item>
            </div>

            <div className="bg-gray-300 p-4 rounded-md">
              <Form.Item label="Payment Type">
                <Radio.Group onChange={handlePaymentTypeChange} value={payType}>
                  <Radio value="cash">Cash</Radio>
                  <Radio value="cheque">Cheque</Radio>
                  <Radio value="cardOrTransfer">Card/Transfer</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3 mb-4">
          <div className="col-span-9">
            <Table
              dataSource={selectedItems}
              columns={[
                { title: "Item Code", dataIndex: "code", key: "code" },
                { title: "Description", dataIndex: "desc", key: "desc" },
                { title: "Price", dataIndex: "price", key: "price" },
                { title: "Qty", dataIndex: "qty", key: "qty" },
                { title: "Discount", dataIndex: "disc", key: "disc" },
                { title: "Amount", dataIndex: "amount", key: "amount" },
              ]}
              pagination={false}
              scroll={{ x: "max-content", y: "100%" }}
            />
          </div>
          <div className="col-span-3 gap-1">
            {/* <Button type="primary" className="w-full" htmlType="submit">
              Submit
            </Button> */}
            <Button
              type="primary"
              className="bg-blue-600 text-white w-full"
              htmlType="submit"
              name="submit"
            >
              Patient Register
            </Button>
            <Button
              type="default"
              className="bg-white text-blue-700 border-2 border-blue-700 w-full"
              htmlType="submit"
              name="receiptPrint"
            >
              Print (Reci)
            </Button>
            <Button
              type="default"
              className="bg-white text-blue-700 border-2 border-blue-700 w-full"
              htmlType="submit"
              name="invoicePrint"
            >
              Print (Invo)
            </Button>
            <Button
              type="default"
              className="bg-white text-blue-700 border-2 border-blue-700 w-full"
              htmlType="submit"
              name="invPresPrint"
            >
              Invo + Presc
            </Button>
            <Button
              type="default"
              className="bg-black text-white w-full"
              htmlType="submit"
              name="sms"
            >
              SMS
            </Button>
            <Button
              type="default"
              className="bg-green-500 text-white w-full"
              onClick={handleClear}
            >
              Clear
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Invoice;
