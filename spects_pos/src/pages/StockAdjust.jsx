import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Table,
  notification,
  DatePicker,
} from "antd";
import "tailwindcss/tailwind.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const { Option } = Select;

const StockAdjust = () => {
  const [form] = Form.useForm();
  const [itemResult, setItemResult] = useState({});
  const [adjustedData, setAdjustedData] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the next adjustment note ID (simulate fetching the last ID)
    const fetchLastId = async () => {
      try {
        const response = await axios.get("/api/lastId"); // Replace with actual API endpoint
        setNextId(response.data + 1);
      } catch (error) {
        console.error("Error fetching last adjustment ID:", error);
      }
    };
    fetchLastId();
  }, []);

  const handleItemSearch = async (itemNo) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/searchItem", { itemNo }); // Replace with actual API endpoint
      setItemResult(response.data);
    } catch (error) {
      console.error("Error fetching item:", error);
      notification.error({
        message: "Error",
        description: "Item not found",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (values) => {
    const { itemNo, adjust, remark, available, reason } = values;
    const after =
      reason === "Over Stock" ? available - adjust : available + adjust;

    const rowData = {
      itemCode: itemNo,
      qty: available,
      adjusted: adjust,
      after,
      reason,
      remark,
    };

    setAdjustedData([...adjustedData, rowData]);

    // Simulate saving to backend
    try {
      const response = await axios.post("/api/saveAdjustedData", adjustedData); // Replace with actual API endpoint
      notification.success({
        message: "Success",
        description: "Adjusted data saved successfully",
      });
    } catch (error) {
      console.error("Error saving adjusted data:", error);
      notification.error({
        message: "Error",
        description: "Failed to save adjusted data",
      });
    }
  };

  const columns = [
    { title: "Item No", dataIndex: "itemCode", key: "itemCode" },
    { title: "Qty", dataIndex: "qty", key: "qty" },
    { title: "Adjusted", dataIndex: "adjusted", key: "adjusted" },
    { title: "After", dataIndex: "after", key: "after" },
    { title: "Reason", dataIndex: "reason", key: "reason" },
    { title: "Remark", dataIndex: "remark", key: "remark" },
  ];

  return (
    <div className="bg-white  p-4 w-full max-h-full">
      <div className="grid grid-cols-12 gap-4  w-full">
        {/* Header Title */}
        <div className="col-span-10 flex items-center">
          <h1 className="text-3xl font-bold p-2 my-2">
            Stock <span className="text-purple-500">Adjustment</span>
          </h1>
        </div>

        {/* Icon */}
        <div className="col-span-2 flex items-center justify-center text-center p-2">
          <Link to="/dashboard">
            <FaHome className="text-3xl cursor-pointer" />
          </Link>
        </div>
      </div>

      <div className="p-5 bg-gray-200 justify-center rounded-xl shadow-xl">
        <Form
          form={form}
          onFinish={handleFormSubmit}
          layout="vertical"
          className="grid grid-cols-12 gap-2"
        >
          <div className="col-span-12 border-2 border-gray-300 p-2">
            <div className="grid grid-cols-12 gap-4">
              <Form.Item name="date" label="Date" className="col-span-3">
                <DatePicker className="w-full" />
              </Form.Item>

              <Form.Item name="itemNo" label="Item No" className="col-span-3">
                <Input.Search
                  onSearch={handleItemSearch}
                  enterButton="Search"
                  loading={loading}
                  placeholder="Enter Item No"
                />
              </Form.Item>

              <Form.Item
                name="itemName"
                label="Item Name"
                className="col-span-3"
              >
                <Input value={itemResult?.description || ""} readOnly />
              </Form.Item>

              <Form.Item
                name="available"
                label="Available"
                className="col-span-3"
              >
                <Input value={itemResult?.maxStockQty || ""} readOnly />
              </Form.Item>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <Form.Item
                name="noteNo"
                label="Adjustment Note No"
                className="col-span-3"
              >
                <Input value={nextId} readOnly />
              </Form.Item>

              <Form.Item name="reason" label="Reason" className="col-span-3">
                <Select>
                  <Option value="Over Stock">Over Stock</Option>
                  <Option value="Less Stock">Less Stock</Option>
                </Select>
              </Form.Item>

              <Form.Item name="adjust" label="Adjust" className="col-span-3">
                <Input />
              </Form.Item>

              <Form.Item
                name="newStock"
                label="New Stock"
                className="col-span-3"
              >
                <Input readOnly />
              </Form.Item>
            </div>

            <Form.Item name="remark" label="Remark" className="col-span-12">
              <Input.TextArea rows={2} />
            </Form.Item>
          </div>

          {/* Table for showing adjusted items */}
          <div className="col-span-12 border-2 border-gray-200 p-2">
            <h4 className="text-md">Item Register</h4>
            <Table
              dataSource={adjustedData}
              columns={columns}
              pagination={false}
              rowKey="itemCode"
              className="custom-table max-h-32 overflow-y-auto"
            />
          </div>

          {/* Action buttons */}
          <div className="col-span-12 text-right">
            <Button type="primary" htmlType="submit" className="mr-2">
              Save
            </Button>
            <Button type="danger" className="mr-2">
              Delete
            </Button>
            <Button
              type="default"
              className="mr-2"
              onClick={() => form.resetFields()}
            >
              Clear
            </Button>
            <Button
              type="default"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Exit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default StockAdjust;
