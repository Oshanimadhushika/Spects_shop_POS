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

  const Addbranch = (values) => {
    setLoading(true);
    const data = {
      code: values.branchCode,
      branchName: values.branchName,
    };

    console.log("data",data);
    

    fetchAction({
      query: `v1.0/branch/add`,
      params: data,
      method: "get",
    });

    setLoading(false);
  };

  useEffect(() => {
    if (fetchData) {
      if (fetchData.success === true) {
        // navigate("/workspace/subscription-plans");
        notifySuccess("Branch Saved Successfully!");
      } else {
        notifyError(fetchData.message);
      }
    }
  }, [fetchData, fetchError]);

  const handleSubmit = (values) => {
    // const { branchCode, branchName } = values;
    // // Validate if values are not empty
    // if (!branchCode || !branchName) {
    //   message.error("Inputs should not be empty!");
    //   return;
    // }
    // // Assuming you have a function to save branch data
    // saveBranchData(branchCode, branchName)
    //   .then(() => {
    //     message.success("Branch Saved Successfully!");
    //     form.resetFields(); // Reset the form fields after successful save
    //   })
    //   .catch(() => {
    //     message.error("Failed to save branch.");
    //   });
  };

  //   const saveBranchData = async (code, name) => {
  //     // Here you'd make an API call to your backend to save the branch data
  //     console.log("Branch Code:", code);
  //     console.log("Branch Name:", name);
  //     // Simulating successful save with a delay
  //     return new Promise((resolve) => setTimeout(resolve, 1000));
  //   };

  return (
    // <div className="flex items-center justify-center w-full p-3 bg-black rounded-xl">
    <div className="w-full flex items-center justify-center p-4 ">
      {/* <div className="flex  w-full sm:w-1/3 md:w-1/3 lg:w-2/3 xl:w-2/3 bg-white justify-center rounded-xl shadow-xl p-4">
 
          <div className="flex-3 items-center justify-center  " >
            <img src={LoginImage} alt="Image" className="w-full" />
          </div>

          <div className="flex-1 ml-6  my-10 items-center">
            <h1 className="text-2xl font-bold mb-4 text-center">Add Branch </h1>

            <Form
              layout="vertical"
              onFinish={Addbranch}
              form={form}
              requiredMark={false}
            >
              <Form.Item
                name="branchCode"
                label="Branch Code"
                rules={[{ required: true, message: 'Please input the branch code!' }]}
              >
                <Input
                  className="rounded-md border-2 border-gray-200 p-2 w-full"
                  placeholder="Branch Code"
                />
              </Form.Item>

              <Form.Item
                name="branchName"
                label="Branch Name"
                rules={[{ required: true, message: 'Please input the branch name!' }]}
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
                >
                  Save
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div> */}

      <div className="grid grid-cols-12 gap-4 w-full  bg-white rounded-xl shadow-xl p-4">
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
