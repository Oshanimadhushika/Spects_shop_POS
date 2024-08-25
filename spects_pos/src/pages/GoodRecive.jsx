import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  notification,
  Table,
} from "antd";
import { SearchOutlined, SaveOutlined } from "@ant-design/icons";
// import 'tailwindcss/tailwind.css';
import { FaHome } from "react-icons/fa";

import { Link } from "react-router-dom";

const { Option } = Select;

const PurchasingInvoice = () => {
  const [form] = Form.useForm();
  const [supplierList, setSupplierList] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [data, setData] = useState([]);
  const [lastGrnNumber, setLastGrnNumber] = useState(1); // Replace with actual last GRN number from backend

  // Handle form submission
  const onFinish = (values) => {
    console.log("Form values:", values);
    // Handle form submission to backend here
  };

  // Function to fetch suppliers
  const fetchSuppliers = async (keyword) => {
    // Fetch suppliers from backend
    // setSupplierList(response.data);
  };

  // Function to fetch items
  const fetchItems = async (keyword) => {
    // Fetch items from backend
    // setItemList(response.data);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index", // We will use this to display the index
      key: "index",
      render: (text, record, index) => index + 1, // Increment index by 1 to start from 1
    },
    {
      title: "Item Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: () => "Size", // Static text for size
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "Dis%",
      dataIndex: "disc",
      key: "disc",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  // Prepare the data source
  const dataSource = data.map((row, index) => ({
    key: index, // Unique key for each row
    index: index + 1,
    code: row.code,
    desc: row.desc,
    size: "Size", // Static value for now
    qty: row.qty,
    disc: row.disc,
    price: row.price,
    amount: row.amount,
  }));

  return (
    <div className=" bg-white p-4 w-full h-screen">
      <div className="row mb-2">
        <div className="grid grid-cols-12 gap-4  w-full">
          {/* Header Title */}
          <div className="col-span-10 flex items-center">
            <h1 className="text-3xl font-bold p-2 my-2">
              Purchasing <span className="text-purple-500">Invoice</span>
            </h1>
          </div>

          {/* Icon */}
          <div className="col-span-2 flex items-center justify-center text-center p-2">
            <Link to="/dashboard">
              <FaHome className="text-3xl cursor-pointer" />
            </Link>
          </div>
        </div>
        <div className="col-md-6">
          <Form form={form} layout="inline" onFinish={onFinish}>
            <Form.Item name="searchGrn">
              <Input
                placeholder="Search Purchasing Invoice"
                className="bg-white rounded-full shadow-xl"
                prefix={<SearchOutlined />}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
              Search
            </Button>
          </Form>
        </div>
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish} className="shadow-xl p-5  bg-gray-200 rounded-lg">
        <div className="grid grid-cols-12 gap-2 ">
          {/* Our details section */}
          <div className="col-span-12 p-3 border-2 border-gray-300 rounded-lg">
            <label className="text-sm font-bold">Our details</label>
            <div className="grid grid-cols-12 gap-4 mt-3">
              <Form.Item
                name="grnNo"
                label="Our No (GRN No):"
                className="col-span-6"
              >
                <Input value={lastGrnNumber} placeholder="Enter GRN No" />
              </Form.Item>
              <Form.Item name="date" label="Date:" className="col-span-6">
                <DatePicker className="w-full" />
              </Form.Item>
            </div>
          </div>

          {/* Company details section */}
          <div className="col-span-12 p-3 border-2 border-gray-300 rounded-lg">
            <label className="text-sm font-bold">Company details</label>
            <div className="grid grid-cols-12 gap-4">
              <Form.Item name="searchCompany" className="col-span-3">
                <Input
                  placeholder="Search"
                  className="bg-white rounded-full shadow-xl mt-7"
                  onChange={(e) => fetchSuppliers(e.target.value)}
                  prefix={<SearchOutlined />}
                />
              </Form.Item>

              <Form.Item
                name="supplier"
                label="Company Code:"
                className="col-span-3"
              >
                <Select
                  placeholder="Select a company"
                  onChange={(value) =>
                    form.setFieldsValue({ companyName: value })
                  }
                >
                  {supplierList.map((supplier) => (
                    <Option
                      key={supplier.code}
                      value={supplier.name}
                      data-id={supplier.code}
                    >
                      {supplier.code}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="companyName"
                label="Company Name:"
                className="col-span-3"
              >
                <Input placeholder="Enter Company Name" />
              </Form.Item>

              <Form.Item
                name="invoiceNo"
                label="Invoice No:"
                className="col-span-3"
              >
                <Input placeholder="Enter Invoice Number" />
              </Form.Item>
            </div>
          </div>

          {/* Invoice details section */}
          <div className="col-span-12 p-3 border-2 border-gray-300 rounded-lg">
            <label className="text-sm font-bold">Invoice details</label>
            <div className="grid grid-cols-12 gap-4">
              <Form.Item name="itemKeyword" className="col-span-2">
                <Input
                  placeholder="Search..."
                  className="bg-white rounded-full shadow-xl mt-7"
                  prefix={<SearchOutlined />}
                  onChange={(e) => fetchItems(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="itemCode"
                label="Item Code:"
                className="col-span-2"
              >
                <Select
                  placeholder="Select item"
                  onChange={(value) =>
                    form.setFieldsValue({ description: value })
                  }
                >
                  {itemList.map((item) => (
                    <Option
                      key={item.code}
                      value={item.description}
                      data-id={item.code}
                    >
                      {item.code}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="description"
                label="Description:"
                className="col-span-3"
              >
                <Input placeholder="Enter Description" />
              </Form.Item>

              <Form.Item name="Qty" label="Qty:" className="col-span-1">
                <Input placeholder="Enter Quantity" />
              </Form.Item>

              <Form.Item
                name="discountRs"
                label="Dis Rs:"
                className="col-span-1"
              >
                <Input placeholder="Enter Discount" />
              </Form.Item>

              <Form.Item name="price" label="Price:" className="col-span-1">
                <Input placeholder="Enter Price" />
              </Form.Item>

              <Form.Item name="amount" label="Amount:" className="col-span-2">
                <Input placeholder="Enter Amount" />
              </Form.Item>
            </div>

            <div className="mt-2">
              <Table
                className="whitespace-nowrap text-xs"
                columns={columns}
                dataSource={dataSource}
                pagination={false} // Disable pagination if not needed
                bordered // Add borders to the table
                size="small" // Small size to match the text-xs from your example
                scroll={{ x: "max-content", y: "100%" }}
              />
            </div>
          </div>

         
        </div>

        <div className="grid grid-cols-12 gap-4 p-6">
        {/* Buttons */}
        <div className="col-span-8 flex gap-2 items-center">
          {/* Blue - Bill Close */}
          <Button
            type="default"
            htmlType="submit"
            className="text-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600 w-1/6"
          >
            Bill Close
          </Button>

          {/* Yellow - Close */}
          <Button
            type="default"
            htmlType="submit"
            className="text-yellow-500 border-yellow-500 hover:bg-yellow-600 hover:border-yellow-600 w-1/6"
          >
            Close
          </Button>

          {/* Green - Update */}
          <Button
            type="default"
            htmlType="submit"
            className="text-green-500 border-green-500 hover:bg-green-600 hover:border-green-600 w-1/6"
          >
            Update
          </Button>

          {/* Red - Delete */}
          <Button
            type="default"
            htmlType="submit"
            className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 w-1/6"
          >
            Delete
          </Button>

          {/* Black - Exit */}
          <Button
            type="default"
            htmlType="submit"
            className="border-black text-black hover:bg-gray-100 hover:text-gray-700 w-1/6"
          >
            Exit
          </Button>
        </div>

        {/* Total Amount and Status */}
        <div className="col-span-4 flex justify-center items-center">
          <div className="text-start">
            <div className="text-lg font-bold mb-1 text-blue-700">Bill Total Amount: $0.00</div>
            <div className="text-lg text-red-600 font-semibold">Bill Status: Pending</div>
          </div>
        </div>
      </div>
      </Form>
    </div>
  );
};

export default PurchasingInvoice;
