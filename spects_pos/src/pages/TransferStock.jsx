import React from "react";
import { Input, DatePicker, Form, Button, Table, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const TransferStock = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Item Code",
      dataIndex: "itemCode",
      key: "itemCode",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Transfer Before Qty",
      dataIndex: "transferBeforeQty",
      key: "transferBeforeQty",
    },
    {
      title: "Transfer Qty",
      dataIndex: "transferQty",
      key: "transferQty",
    },
    {
      title: "Transfer After Qty",
      dataIndex: "transferAfterQty",
      key: "transferAfterQty",
    },
  ];

  const dataSource = []; // Add data as needed

  return (
    <div className="bg-white p-8 w-full max-h-full">
      {/* Header */}
      <div className="grid grid-cols-12 gap-4 w-full">
        <div className="col-span-10 flex items-center">
          <h1 className="text-3xl font-bold p-2 my-2">
            Stock <span className="text-purple-500">Transfer</span>
          </h1>
        </div>
        <div className="col-span-2 flex items-center justify-center text-center p-2">
          <Link to="/dashboard">
            <FaHome className="text-3xl cursor-pointer" />
          </Link>
        </div>
      </div>

      {/* Form */}
      <div className="p-5 bg-gray-200 justify-center rounded-xl shadow-xl">
        <Form form={form}>
          {/* First Row */}
          <div className="grid grid-cols-12 gap-4 mb-4 border-2 border-gray-300 p-4">
            <Form.Item label="Transfer No:" className="col-span-3">
              <Input className="h-10" />
            </Form.Item>
            <Form.Item label="Date:" className="col-span-3">
              <DatePicker className="w-full h-10" />
            </Form.Item>
            <Form.Item className="col-span-6">
              <Input
                className="h-10"
                suffix={<SearchOutlined />}
                placeholder="Search..."
              />
            </Form.Item>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-12 gap-4 mb-4 border-2 border-gray-300 p-4">
            <Form.Item className="col-span-6">
              <label className="block font-bold">From:</label>

              <Select className="h-10" />
            </Form.Item>
            <Form.Item className="col-span-6">
              <label className="block font-bold">To:</label>
              <Select className="h-10" />
            </Form.Item>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-12 gap-4 mb-4 border-2 border-gray-300 p-4">
            <div className="col-span-2">
              <label className="block font-bold">Availability:</label>
              <Input className="h-10" />
            </div>

            <div className="col-span-3">
              <label className="block font-bold">Item:</label>
              <Input className="h-10" />
            </div>

            <div className="col-span-3">
              <label className="block font-bold">Description:</label>
              <Input className="h-10" />
            </div>

            <div className="col-span-2">
              <label className="block font-bold">Qty:</label>
              <Input className="h-10" />
            </div>

            <div className="col-span-2">
              <label className="block font-bold">Current Stock:</label>
              <Input className="h-10" />
            </div>
          </div>

          {/* Fourth Row (Table) */}
          <div className="mb-4">
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={false}
              size="small"
              rowKey="id"
              className="text-xs"
              scroll={{ x: "max-content", y: "100%" }}
            />
          </div>

          {/* Fifth Row */}
          <div className="mb-4 border-2 border-gray-300 p-4">
            <div className="col-span-7 ">
              <label className="col-span-12 font-bold text-red-700">
                Showroom Availability
              </label>
            </div>

            <div className="grid grid-cols-12 gap-4 mt-3">
              <div className="col-span-4">
                <Form.Item label="Showroom:">
                  <Input className="h-10" />
                </Form.Item>
              </div>

              <div className="col-span-4">
                <Form.Item label="General Stock:">
                  <Input className="h-10" />
                </Form.Item>
              </div>

              <div className="col-span-4">
                <Form.Item label="Eye Camp:">
                  <Input className="h-10" />
                </Form.Item>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {/* <div className="grid grid-cols-12 gap-2 mt-3">
            <div className="col-span-12 text-end pt-3 gap-3">
              <div className="mb-3 flex justify-end space-x-5">
                <Button
                  type="primary"
                  className="bg-blue-600 text-white p-2 font-semibold w-32"
                >
                  Submit
                </Button>
                <Button
                  type="primary"
                  danger
                  className="text-white p-2 font-semibold w-32"
                >
                  Delete
                </Button>
                <Button
                  type="primary"
                  className="bg-yellow-500 text-white p-2 font-semibold w-32"
                  onClick={() => form.resetFields()}
                >
                  Clear
                </Button>
                <Button
                  className="bg-black text-white p-2 font-semibold w-32"
                  onClick={() => navigate(-1)}
                >
                  Exit
                </Button>
              </div>
            </div>
          </div> */}
        </Form>
      </div>
    </div>
  );
};

export default TransferStock;
