import React, { useState } from "react";
import { Form, Input, Button, Table, message, Radio } from "antd";
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is imported
import { SearchOutlined, SaveOutlined, DeleteOutlined, EditOutlined, ClearOutlined } from '@ant-design/icons';


const Department = () => {
  const [form] = Form.useForm();
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const handleSearch = async (values) => {
    const { keyword } = values;
    if (!keyword) {
      message.warning("Keyword should not be Empty..!");
      return;
    }
    // Replace with actual API call
    // const result = await searchDepartment(keyword);
    // Mock result
    const result = [{ id: "001", name: "Department A" }]; // Mocked data
    if (result.length === 0) {
      message.warning("No results found..!");
    } else {
      setDepartments(result);
    }
  };

  const handleSubmit = async (action) => {
    try {
      const values = await form.validateFields();
      if (!values.departmentCode || !values.department) {
        message.warning("Code or Department Name should not be Empty..!");
        return;
      }
      // Handle form submission based on the action
      // Example API calls
      // switch (action) {
      //   case 'save':
      //     await saveDepartment(values.departmentCode, values.department);
      //     message.success("Department Saved Successfully..!");
      //     break;
      //   case 'update':
      //     await updateDepartment(values.departmentCode, values.department);
      //     message.success("Department Updated Successfully..!");
      //     break;
      //   case 'delete':
      //     await deleteDepartment(values.departmentCode);
      //     message.success("Department Deleted Successfully..!");
      //     break;
      //   default:
      //     break;
      // }
      message.success(
        `${
          action.charAt(0).toUpperCase() + action.slice(1)
        } Department Successfully..!`
      );
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleClear = () => {
    form.resetFields();
    setSelectedDepartment(null);
  };

  const handleRowClick = (record) => {
    form.setFieldsValue({
      departmentCode: record.id,
      department: record.name,
    });
    setSelectedDepartment(record);
  };

  return (
    <div className="w-full  items-center justify-center p-4 ">
      <div className=" w-full bg-gray-200 justify-center rounded-xl shadow-xl p-4">
        <div className="mb-2 flex justify-between items-center">
          <h1 className="text-md font-semibold">
            Department <span className="text-red-500">Master</span>
          </h1>
          <Form form={form} layout="inline" onFinish={handleSearch}>
          <Form.Item name="keyword">
            <Input placeholder="Search..." className="rounded-full shadow-xl" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />} />
          </Form.Item>
        </Form>
        </div>

        <Form
          form={form}
          layout="vertical"
          className="mt-4"
          requiredMark={false}
        >
          <Form.Item
            name="departmentCode"
            label="Code"
            rules={[{ required: true, message: "Code is required" }]}
          >
            <Input className="w-1/4" />
          </Form.Item>
          <Form.Item
            name="department"
            label="Department"
            rules={[{ required: true, message: "Department name is required" }]}
          >
            <Input className="w-1/4" />
          </Form.Item>
          <div className="flex justify-end gap-2 mt-4">
            <Button type="primary" onClick={() => handleSubmit("save")}>
              Save
            </Button>
            <Button type="default" onClick={handleClear}>
              Clear
            </Button>
            <Button
              type="primary"
              onClick={() => handleSubmit("update")}
              disabled={!selectedDepartment}
            >
              Update
            </Button>
            <Button
              type="danger"
              onClick={() => handleSubmit("delete")}
              disabled={!selectedDepartment}
            >
              Delete
            </Button>
            <Button
              type="link"
              onClick={() => (window.location.href = "index.php")}
            >
              Exit
            </Button>
          </div>
        </Form>

        <div className="mt-4 max-h-64 overflow-y-auto">
          <Table
            dataSource={departments}
            columns={[
              { title: "Code", dataIndex: "id", key: "id" },
              { title: "Department", dataIndex: "name", key: "name" },
            ]}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
            scroll={{ x: "max-content", y: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Department;
