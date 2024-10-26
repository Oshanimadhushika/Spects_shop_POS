import React, { useState, useEffect, useContext } from "react";
import { Select, Input, Button, Form, message, Image } from "antd";
import axios from "axios";
import "tailwindcss/tailwind.css";
import LoginImage from "../assets/loginImg3.png";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useNotification from "../hooks/useNotification";
import { DataContext } from "../context/DataContext";
import { setLocalStorageData } from "../helpers/StorageHelper";
const { Option } = Select;

const Login = () => {
  const [form] = Form.useForm();

  // const [branches, setBranches] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const {
    fetchData: fetchUserData,
    fetchAction: fetchUserAction,
    fetchError: fetchUserError,
  } = useFetch();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const { notifyError, notifySuccess } = useNotification();
  const { fetchData, fetchAction, fetchError, fetchLoading } = useFetch();
  const { branches, usersInBranch, setUsersInBranch} = useContext(DataContext);

  const navigate = useNavigate();

// console.log("userinBranch",usersInBranch);



  const handleBranchChange = (branchId) => {
    // console.log("branchid",branchId);
    
    setSelectedBranch(branchId);

    if (usersInBranch && Array.isArray(usersInBranch)) {
      const selectedBranchData = usersInBranch.find(
        (branch) => branch.branch.branchName === branchId
      );

      // console.log("selected branch",selectedBranchData);
      

      if (selectedBranchData) {
        setUsers(selectedBranchData.users);
        // console.log("user in selected branch",users);
        
      } else {
        setUsers([]);
      }
    } else {
      console.error("usersInBranch is not defined or not an array");
    }
  };

  const handleLogin = (values) => {
    setLoading(true);
    const data = {
      username: values.userName,
      branchName: values.branch,
      password: values.password,
    };

    console.log("data", data);

    fetchAction({
      query: `v1.0/user/login`,
      body: data,
    });

    setLocalStorageData("authData", data);
    setLoading(false);
  };

  useEffect(() => {
    if (fetchData) {
      if (fetchData.success === true) {
        notifySuccess("", fetchData?.status);
        navigate("/dashboard");
        form.resetFields();
      } else {
        notifyError(fetchData.status);
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
              rules={[{ required: true, message: "Please select a branch!" }]}
            >
              <Select placeholder="Select Branch" onChange={handleBranchChange}>
                {console.log("branch", usersInBranch)}
                {usersInBranch &&
                  usersInBranch.map((branch) => (
                    <Option key={branch.branch.id} value={branch.branch.branchName}>
                      {branch.branch.branchName}
                    </Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Select Username"
              name="userName"
              rules={[{ required: true, message: "Please select a username!" }]}
            >
              <Select placeholder="Select Username" disabled={!selectedBranch}>
                {users.map((user) => (
                  <Option key={user.id} value={user.userName}>
                    {user.userName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full mt-4 bg-purple-600"
                // onClick={navigate("/dashboard")}
              >
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
