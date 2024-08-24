import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, message } from "antd";
import axios from "axios";
import LoginImage from "../assets/loginImg3.png";

const { Option } = Select;

const RegisterUser = () => {
  const [branches, setBranches] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch branches when the component mounts
    // axios.get('/api/branches')
    //   .then(response => setBranches(response.data))
    //   .catch(error => message.error('Failed to fetch branches'));
  }, []);

  const handleSubmit = (values) => {
    // const { userName, branch, password, repeatPassword } = values;
    // if (password !== repeatPassword) {
    //   message.error('Passwords do not match');
    //   return;
    // }
    // axios.post('/api/register', { userName, branch, password })
    //   .then(response => {
    //     if (response.data.success) {
    //       message.success('Registration successful');
    //       form.resetFields();
    //     } else {
    //       message.error('Registration failed');
    //     }
    //   })
    //   .catch(error => message.error('Registration failed'));
  };

  return (
    // <div className=" flex items-center justify-center w-full  p-3 bg-white rounded-xl">
    <div className="w-full flex items-center justify-center p-4 ">
        <div className="flex w-2/3 bg-white justify-center rounded-xl shadow-xl p-4">
          <div className="flex-3 items-center justify-center">
            <img src={LoginImage} alt="Image" className="w-full" />
          </div>

          <div className="flex-1 w-full">
            <h1 className="text-2xl font-bold mb-4 text-center">
              Add User 
            </h1>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              requiredMark={false}
            >
              <Form.Item
                label="User Name"
                name="userName"
                rules={[
                  { required: true, message: "Please enter your user name" },
                ]}
              >
                <Input placeholder="User Name" />
              </Form.Item>

              <Form.Item
                label="Branch"
                name="branch"
                rules={[{ required: true, message: "Please select a branch" }]}
              >
                <Select placeholder="Select Branch">
                  {branches.map((branch) => (
                    <Option key={branch.id} value={branch.id}>
                      {branch.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item
                label="Repeat Password"
                name="repeatPassword"
                rules={[
                  { required: true, message: "Please repeat your password" },
                ]}
              >
                <Input.Password placeholder="Repeat Password" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-purple-500 hover:bg-blue-500 text-white font-semibold p-3 rounded-md"
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default RegisterUser;