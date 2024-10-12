import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, message } from "antd";
import axios from "axios";
import LoginImage from "../assets/loginImg3.png";
import useFetch from "../hooks/useFetch";
import useNotification from "../hooks/useNotification";

const { Option } = Select;

const RegisterUser = () => {
  const [branches, setBranches] = useState([]);
  const [form] = Form.useForm();
  const { fetchData, fetchAction, fetchError, fetchLoading } = useFetch();
  const [loading, setLoading] = useState(false);
  const { notifyError, notifySuccess } = useNotification();
  const {
    fetchData: fetchBranchData,
    fetchAction: fetchBranchAction,
    fetchError: fetchBranchError,
  } = useFetch();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    getBranches();
  }, []);

  const getBranches = (values) => {
    setLoading(true);
    // const data = {
    //   searchKey: "no",
    // };

    // console.log("data", data);

    fetchBranchAction({
      query: `v1.0/branch`,
      // params: data,
      method: "get",
    });

    // console.log("fetchDAta", fetchData);

    setLoading(false);
  };

  useEffect(() => {
    if (fetchBranchData) {
      if (fetchBranchData.success === true) {
        console.log("branch", fetchBranchData?.branchList);
        setBranches(fetchBranchData?.branchList);

        // notifySuccess("", fetchBranchData?.status);
        // message.success(fetchData?.status);
      } else {
        notifyError(fetchBranchData.data);
      }
    }
  }, [fetchBranchData, fetchBranchError]);

  const AddUser = (values) => {
    setLoading(true);
    const data = {
      userName: values.userName,
      branch: values.branch,
      userRole: values.role,
      mobileNo: "",
      password: values.password,
    };

    console.log("data", data);

    fetchAction({
      query: `v1.0/user/sign-up`,
      body: data,
      // method: "get",
    });

    // console.log("fetchDAta", fetchData);

    setLoading(false);
  };

  useEffect(() => {
    if (fetchData) {
      if (fetchData.success === true) {
        notifySuccess("", fetchData?.status);
        // message.success(fetchData?.status);
        form.resetFields();
      } else {
        notifyError(fetchData.data);
      }
    }
  }, [fetchData, fetchError]);

  const onValuesChange = (changedValues, allValues) => {
    const { userName, branch, role, password, repeatPassword } = allValues;

    // Check if all fields are filled and passwords match
    const isFormValid =
      userName &&
      branch &&
      role &&
      password &&
      repeatPassword &&
      password === repeatPassword;

    setIsButtonDisabled(!isFormValid);
  };

  const roles = [
    { label: "Super Admin", value: "Super Admin" },
    { label: "Admin", value: "Admin" },
    { label: "User", value: "User" },
  ];

  return (
    // <div className=" flex items-center justify-center w-full  p-3 bg-white rounded-xl">
    <div className="w-full flex items-center justify-center p-4 ">
      <div className="grid grid-cols-12 w-2/3 gap-4   bg-white rounded-xl shadow-xl p-4">
        <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 flex items-center justify-center">
          <img src={LoginImage} alt="Image" className="w-full" />
        </div>

        <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6  flex flex-col justify-center p-4">
          <h1 className="text-2xl font-bold mb-4 text-center">Add User</h1>
          <Form
            form={form}
            layout="vertical"
            onFinish={AddUser}
            requiredMark={false}
            onValuesChange={onValuesChange}
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
                {(Array.isArray(branches) ? branches : []).map((branch) => (
                  <Option key={branch.id} value={branch.id}>
                    {branch.branchName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Select Role"
              name="role"
              rules={[{ required: true, message: "Please select a role" }]}
            >
              <Select placeholder="Select Role">
                {(Array.isArray(roles) ? roles : []).map((role) => (
                  <Option key={role.value} value={role.value}>
                    {role.label}
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

            {/* <Form.Item
              label="Repeat Password"
              name="repeatPassword"
              rules={[
                { required: true, message: "Please repeat your password" },
              ]}
            >
              <Input.Password placeholder="Repeat Password" />
            </Form.Item> */}

            <Form.Item
              label="Repeat Password"
              name="repeatPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please repeat your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The  passwords that you entered do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Repeat Password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-purple-500 hover:bg-blue-500 text-white font-semibold p-3 rounded-md"
                loading={loading}
                disabled={isButtonDisabled}
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
