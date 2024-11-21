import React, { useEffect, useState } from "react";
import { Input, Button, Form, message } from "antd";
// import 'antd/dist/antd.css';
// import 'tailwindcss/tailwind.css';
import LoginImage from "../assets/loginImg3.png";
import useFetch from "../hooks/useFetch";
import useNotification from "../hooks/useNotification";

const Branch = () => {
  const [form] = Form.useForm();
  const { fetchData, fetchAction, fetchError, fetchLoading } = useFetch();
  const [loading, setLoading] = useState(false);
  const { notifyError, notifySuccess } = useNotification();
  const { fetchData: fetchId, fetchAction: fetchIdAction } = useFetch();
  const [nextId, setNextId] = useState(1);

  // console.log("success or false", fetchData?.status);
  // console.log("fetch data", fetchData);

  useEffect(() => {
    fetchnextID();
  }, []);

  // get nextId
  const fetchnextID = (values) => {
    setLoading(true);
    // const data = {
    //   code: values.categoryCode,
    //   categoryName: values.category,
    // };

    // console.log("data",data);

    fetchIdAction({
      query: `v1.0/branch/next-id`,
      // params: data,
      method: "get",
    });

    setLoading(false);
  };

  useEffect(() => {
    if (fetchId) {
      if (fetchId.status === true) {
        setNextId(fetchId.message);
        form.setFieldsValue({ branchCode: fetchId.message });
      } else {
        notifyError("Cannot find the ID..!");
      }
    }
  }, [fetchId]);

  const Addbranch = (values) => {
    setLoading(true);
    const data = {
      code: nextId,
      branchName: values.branchName,
    };

    console.log("data", data);

    fetchAction({
      query: `v1.0/branch/add`,
      body: data,
    });

    setLoading(false);
  };

  useEffect(() => {
    if (fetchData) {
      if (fetchData.success === true) {
        notifySuccess("", fetchData?.status);
        form.resetFields();
        fetchnextID();
      } else {
        notifyError(fetchData.data);
      }
    }
  }, [fetchData, fetchError]);

  return (
    <div className="w-full flex items-center justify-center p-4 ">
      <div className="grid grid-cols-12 w-2/3 gap-4   bg-white rounded-xl shadow-xl p-4">
        {/* Image Section */}
        <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 flex items-center justify-center">
          <img src={LoginImage} alt="Image" className="w-full" />
        </div>

        {/* Form Section */}
        <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6  flex flex-col justify-center p-4">
          <h1 className="text-2xl font-bold mb-4 text-center">Add Branch</h1>

          <Form
            layout="vertical"
            onFinish={Addbranch}
            form={form}
            requiredMark={false}
          >
            <Form.Item
              name="branchCode"
              label="Branch Code"
              rules={[
                { required: true, message: "Please input the branch code!" },
              ]}
            >
              <Input
                className="rounded-md border-2 border-gray-200 p-2 w-full"
                placeholder="Branch Code"
                value={nextId}
              />
            </Form.Item>

            <Form.Item
              name="branchName"
              label="Branch Name"
              rules={[
                { required: true, message: "Please input the branch name!" },
              ]}
            >
              <Input
                className="rounded-md border-2 border-gray-200 p-2 w-full"
                placeholder="Branch Name"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-purple-500 hover:bg-blue-500 text-white font-semibold p-3 rounded-md mt-4"
                loading={loading}
                // onClick={form.resetFields()}
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Branch;
