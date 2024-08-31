import React, { useState } from "react";
import { Input, Button, Form, message } from "antd";
import "tailwindcss/tailwind.css";
import axios from "axios";
import {
  SearchOutlined,
  SaveOutlined,
  DeleteOutlined,
  EditOutlined,
  ClearOutlined,
} from "@ant-design/icons";

const Supplier = () => {
  const [form] = Form.useForm();
  const [supplierData, setSupplierData] = useState(null);

  const handleSearch = async (values) => {
    if (!values.word) {
      message.error("Keyword should not be empty!");
      return;
    }
    try {
      const response = await axios.post("/api/supplier/search", {
        word: values.word,
      });
      if (response.data === "emptyResult") {
        message.error("No results found!");
      } else {
        setSupplierData(response.data);
        form.setFieldsValue(response.data);
      }
    } catch (error) {
      message.error("Error searching supplier!");
    }
  };

  const handleSave = async (values) => {
    try {
      const response = await axios.post("/api/supplier/save", values);
      if (response.data.success) {
        message.success("Saved successfully!");
      } else {
        message.error("Something went wrong!");
      }
    } catch (error) {
      message.error("Error saving supplier!");
    }
  };

  const handleUpdate = async (values) => {
    try {
      const response = await axios.post("/api/supplier/update", values);
      if (response.data.success) {
        message.success("Updated successfully!");
      } else {
        message.error("Something went wrong!");
      }
    } catch (error) {
      message.error("Error updating supplier!");
    }
  };

  const handleDelete = async (values) => {
    try {
      const response = await axios.post("/api/supplier/delete", {
        code: values.code,
      });
      if (response.data.success) {
        message.success("Deleted successfully!");
        form.resetFields();
      } else {
        message.error("Something went wrong!");
      }
    } catch (error) {
      message.error("Error deleting supplier!");
    }
  };

  const onFinish = (values) => {
    if (supplierData) {
      handleUpdate(values);
    } else {
      handleSave(values);
    }
  };

  return (
    <div className="w-full  items-center justify-center p-4 ">
      <div className=" w-full bg-gray-200 justify-center rounded-xl shadow-xl p-4">
        <div className="mb-2 flex justify-between items-center">
          <h1 className="text-md font-semibold">
            Supplier <span className="text-red-500">Master</span>
          </h1>
          <Form form={form} layout="inline" onFinish={handleSearch}>
            <Form.Item name="keyword">
              <Input
                placeholder="Search..."
                className="rounded-full shadow-xl"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SearchOutlined />}
              />
            </Form.Item>
          </Form>
        </div>

        <Form
          form={form}
          onFinish={onFinish}
          className="space-y-4"
          requiredMark={false}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Form.Item label="Date" name="date" rules={[{ required: true }]}>
              <Input type="date" />
            </Form.Item>
            <Form.Item label="Code" name="code" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </div>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true }]}
          >
            <Input className="w-1/3" />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Form.Item
              label="Telephone (Mobile)"
              name="teleMobile"
              rules={[{ required: true }]}
            >
              <Input type="tel" />
            </Form.Item>
            <Form.Item
              label="Telephone (Land)"
              name="teleLand"
              rules={[{ required: true }]}
            >
              <Input type="tel" />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input type="email" />
            </Form.Item>
          </div>

          <Form.Item
            label="Bank Account No"
            name="accNum"
            rules={[{ required: true }]}
          >
            <Input className="w-1/3" />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Ref Name"
              name="refName"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Ref Phone No"
              name="refMobile"
              rules={[{ required: true }]}
            >
              <Input type="tel" />
            </Form.Item>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-600 text-white"
            >
              Submit
            </Button>
            <Button
              onClick={() => form.resetFields()}
              className="bg-yellow-500 text-white"
            >
              Clear
            </Button>
            <Button
              type="primary"
              danger
              onClick={handleDelete}
              className="bg-red-500 text-white"
            >
              Delete
            </Button>
            <Button
              type="primary"
              onClick={() => (window.location.href = "/")}
              className="bg-black text-white"
            >
              Exit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Supplier;
