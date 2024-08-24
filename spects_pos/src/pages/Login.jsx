import React, { useState, useEffect } from 'react';
import { Select, Input, Button, Form, message,Image } from 'antd';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import LoginImage from "../assets/loginImg3.png"
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

const Login = () => {
  const [branches, setBranches] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const navigate = useNavigate();

  const handleOnClick = () => {
    // You can add any login logic here if needed
    navigate('/dashboard');
  };

  useEffect(() => {
    // Fetch branches when the component loads
    // axios.get('/api/branches')
    //   .then(response => setBranches(response.data))
    //   .catch(error => message.error("Failed to fetch branches"));
  }, []);

  const handleBranchChange = (branchId) => {
    // setSelectedBranch(branchId);
    
    // // Fetch users based on the selected branch
    // axios.get(`/api/users?branch=${branchId}`)
    //   .then(response => setUsers(response.data))
    //   .catch(error => message.error("Failed to fetch users"));
  };

  const handleLogin = (values) => {
    // axios.post('/api/login', values)
    //   .then(response => {
    //     if (response.data.success) {
    //       message.success("Login successful");
    //       // Redirect to another page
    //       window.location.href = '/dashboard';
    //     } else {
    //       message.error("Authentication failed");
    //     }
    //   })
    //   .catch(error => message.error("Login failed"));
  };

  return (
    <div className="container mx-auto p-4 w-2/3 mt-5">
      <div className="grid grid-cols-12 gap-4 p-5 shadow-xl">
        <div className="col-span-5 flex justify-center">
          <img src={LoginImage} alt="Image" className="w-full" />
        </div>
        <div className="col-span-7 flex justify-center p-8">
          <Form
            layout="vertical"
            onFinish={handleLogin}
            className="w-full"
            requiredMark={false}
          >
            <Form.Item
              label="Select Branch"
              name="branch"
              rules={[{ required: true, message: 'Please select a branch!' }]}
            >
              <Select
                placeholder="Select Branch"
                onChange={handleBranchChange}
              >
                {branches.map(branch => (
                  <Option key={branch.id} value={branch.id}>
                    {branch.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Select Username"
              name="userName"
              rules={[{ required: true, message: 'Please select a username!' }]}
            >
              <Select placeholder="Select Username" disabled={!selectedBranch}>
                {users.map(user => (
                  <Option key={user.userName} value={user.userName}>
                    {user.userName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full mt-4 bg-purple-600" onClick={handleOnClick}>
                Login
              </Button>
              <span>Don't have an Account? <a href='/signup' className='font-semibold pt-3 text-blue-600' >Sign Up</a></span>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
