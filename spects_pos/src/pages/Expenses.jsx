import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Select, Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import moment from 'moment';

const { Option } = Select;

const Expenses = () => {
  const [form] = Form.useForm();
  const [idExpense, setIdExpense] = useState('');

  // Mock function to simulate getting the last ID from an API
  const fetchLastId = async () => {
    // Simulate fetching last ID from backend
    const lastDedId = 100; // Example last ID
    setIdExpense(lastDedId + 1);
  };

  useEffect(() => {
    fetchLastId();
  }, []);

  const handleSave = () => {
    form
      .validateFields()
      .then(values => {
        const expenseData = {
          ...values,
          idExpense,
        };
        console.log('Saving expense data:', expenseData);
        // Call your API here
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const clearForm = () => {
    form.resetFields();
    fetchLastId(); // Reset ID
  };

  const handleSearch = (values) => {
    // Implement your search logic here
    console.log('Searching with:', values);
  };

  return (
    <div className="bg-white p-4 w-full max-h-full">
      <div className="grid grid-cols-12 gap-4 mb-4">
        {/* Header Title */}
        <div className="col-span-10 flex items-center">
          <h1 className="text-3xl font-bold p-2 my-2">
            Expenses <span className="text-purple-500">Page</span>
          </h1>
        </div>

        {/* Icon */}
        <div className="col-span-2 flex items-center justify-center text-center p-2">
          <Link to="/dashboard">
            <FaHome className="text-3xl cursor-pointer" />
          </Link>
        </div>
      </div>

      <Form layout="inline" onFinish={handleSearch} className="mb-4">
        <Form.Item name="keyword">
          <Input placeholder="Search..." />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>

      <div className="p-5 bg-gray-200 justify-center rounded-xl shadow-xl">
        <Form form={form} layout="vertical" className="grid grid-cols-12 gap-4">
          {/* 1st row */}
          <Form.Item name="date" label="Date" className="col-span-5">
            <DatePicker
              className="w-full"
              format="YYYY-MM-DD"
              onChange={(date) => form.setFieldsValue({ date: date ? date.format('YYYY-MM-DD') : null })}
              value={form.getFieldValue('date') ? moment(form.getFieldValue('date')) : null}
            />
          </Form.Item>

          <Form.Item name="idExpense" label="ID" className="col-span-3">
            <Input
              className="h-10"
              value={idExpense}
              disabled
            />
          </Form.Item>

          {/* 2nd row */}
          <Form.Item name="deduction" label="Deduction" className="col-span-8">
            <Select
              className="w-full"
              onChange={(value) => form.setFieldsValue({ deduction: value })}
              value={form.getFieldValue('deduction')}
            >
              <Option value="Tea">Tea</Option>
              <Option value="Food">Food</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>

          {/* 3rd row */}
          <Form.Item name="description" label="Description" className="col-span-5">
            <Input
              className="h-10"
              onChange={(e) => form.setFieldsValue({ description: e.target.value })}
              value={form.getFieldValue('description')}
            />
          </Form.Item>

          <Form.Item name="amount" label="Amount" className="col-span-3">
            <Input
              className="h-10"
              onChange={(e) => form.setFieldsValue({ amount: e.target.value })}
              value={form.getFieldValue('amount')}
            />
          </Form.Item>

          {/* Buttons */}
          <div className="col-span-12 mt-6 flex justify-end gap-3">
            <Space>
              <Button type="primary" className="bg-blue-600 text-white w-32" onClick={handleSave}>
                Submit
              </Button>
              <Button type="default" className="bg-yellow-500 text-white w-32" onClick={clearForm}>
                Clear
              </Button>
              <Button type="danger" className="bg-red-500 text-white w-32">
                Delete
              </Button>
              <Button type="default" className="bg-black text-white w-32" onClick={() => window.location.href = 'index.php'}>
                Exit
              </Button>
            </Space>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Expenses;
