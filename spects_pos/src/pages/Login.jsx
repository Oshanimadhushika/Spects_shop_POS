import React, { useState, useEffect } from 'react';
import { Select, Input, Button, Form, message,Image } from 'antd';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import LoginImage from "../assets/loginImg3.png"
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import useNotification from '../hooks/useNotification';
const { Option } = Select;

const Login = () => {
  const [form] = Form.useForm();

  const [branches, setBranches] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const {
    fetchData: fetchBranchData,
    fetchAction: fetchBranchAction,
    fetchError: fetchBranchError,
  } = useFetch();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const { notifyError, notifySuccess } = useNotification();
  const { fetchData, fetchAction, fetchError, fetchLoading } = useFetch();




  const navigate = useNavigate();

  const handleOnClick = () => {
    // You can add any login logic here if needed
    navigate('/dashboard');
  };

  useEffect(() => {
    getBranches();
  }, []);

  const getBranches = () => {
    setLoading(true);
   

    fetchBranchAction({
      query: `v1.0/branch`,
      // params: data,
      method: "get",
    });


    setLoading(false);
  };

  useEffect(() => {
    if (fetchBranchData) {
      if (fetchBranchData.success === true) {
        setBranches(fetchBranchData?.branchList);

      } else {
        notifyError(fetchBranchData.data);
      }
    }
  }, [fetchBranchData, fetchBranchError]);

  

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
    setLoading(true);
    const data = {
      userName: values.userName,
      branchName: values.branch,
      password: values.password,
    };

    console.log("data", data);

    fetchAction({
      query: `v1.0/user/login`,
      body: data,
    });


    setLoading(false);
  };

  useEffect(() => {
    if (fetchData) {
      if (fetchData.success === true) {

        notifySuccess("", fetchData?.status);
        form.resetFields();
      } else {
        notifyError(fetchData.data);
      }
    }
  }, [fetchData, fetchError]);

  return (
    <div className=" p-4 w-full mt-5 flex justify-center items-center ">
      <div className="grid grid-cols-12 gap-4 p-5 shadow-xl justify-center items-center w-2/3 rounded-xl">
        <div className="col-span-5 flex justify-center">
          <img src={LoginImage} alt="Image" className="w-full" />
        </div>
        <div className="col-span-7  justify-center p-8">
        <h1 className="text-2xl font-bold mb-4 text-center font-sans">
              Login !
            </h1>
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
                    {branch.branchName}
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
              {/* <span className='mt-6'>Don't have an Account? <a href='/admin' className='font-semibold pt-3 text-blue-600' >Sign Up</a></span> */}
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
