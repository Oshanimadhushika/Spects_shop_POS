import React, { useState, useEffect } from "react";
import { Select, Input, Button, Form } from "antd";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useNotification from "../hooks/useNotification";
import LoginImage from "../assets/loginImg3.png";
import "tailwindcss/tailwind.css";

const { Option } = Select;

const Login = () => {
  const [form] = Form.useForm();
  const [branches, setBranches] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedBranchName, setSelectedBranchName] = useState("");
  const {
    fetchData: fetchBranchData,
    fetchAction: fetchBranchAction,
    fetchError: fetchBranchError,
  } = useFetch();
  const { notifyError, notifySuccess } = useNotification();
  const { fetchData, fetchAction, fetchError } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    getBranches();
  }, []);

  const getBranches = () => {
    fetchBranchAction({
      query: `v1.0/user/`,
      method: "get",
    });
  };

  useEffect(() => {
    if (fetchBranchData && fetchBranchData.success) {
      const uniqueBranches = [];
      const usersList = [];

      fetchBranchData.list.forEach((user) => {
        user.branches.forEach((branch) => {
          if (!uniqueBranches.find((b) => b.id === branch.id)) {
            uniqueBranches.push(branch);
          }
        });
        usersList.push({
          userName: user.userName,
          branchId: user.branches[0].id,
        });
      });

      setBranches(uniqueBranches);
      setUsers(usersList);
    } else if (fetchBranchError) {
      notifyError(fetchBranchError);
    }
  }, [fetchBranchData, fetchBranchError]);

  const handleBranchChange = (branchId) => {
    const selectedBranch = branches.find((branch) => branch.id === branchId);
    setSelectedBranch(branchId);
    setSelectedBranchName(selectedBranch?.branchName || ""); 

    const branchUsers = users.filter((user) => user.branchId === branchId);
    setFilteredUsers(branchUsers);
    form.setFieldsValue({ userName: null });
  };

  const handleLogin = (values) => {
    const data = {
      username: values.userName,
      branchName: selectedBranchName, 
      password: values.password,
    };

    fetchAction({
      query: `v1.0/user/login`,
      body: data,
    });
  };

  useEffect(() => {
    if (fetchData) {
      if (fetchData.success === true) {
        notifySuccess("", fetchData?.status);
        form.resetFields();
        navigate("/dashboard");
      } else {
        notifyError(fetchData?.status);
      }
    }
  }, [fetchData, fetchError, navigate]);

  return (
    <div className="p-4 w-full mt-5 flex justify-center items-center">
      <div className="grid grid-cols-12 gap-4 p-5 shadow-xl justify-center items-center w-2/3 rounded-xl">
        <div className="col-span-5 flex justify-center">
          <img src={LoginImage} alt="Image" className="w-full" />
        </div>
        <div className="col-span-7 justify-center p-8">
          <h1 className="text-2xl font-bold mb-4 text-center font-sans">
            Login !
          </h1>
          <Form
            form={form}
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
                {branches.map((branch) => (
                  <Option key={branch.id} value={branch.id}>
                    {branch.branchName}
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
                {filteredUsers.map((user) => (
                  <Option key={user.userName} value={user.userName}>
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
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
