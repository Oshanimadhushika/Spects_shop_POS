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



  const AddUser= (values) => {
    setLoading(true);
    const data = {
      code: values.branchCode,
      branchName: values.branchName,
    };

    console.log("data", data);

    fetchAction({
      query: `v1.0/user`,
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
                loading={loading}
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
