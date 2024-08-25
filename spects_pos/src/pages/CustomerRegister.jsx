import React from "react";
import { Form, Input, Button, DatePicker, Select, Col ,Row} from "antd";
import "antd/dist/reset.css";
import "tailwindcss/tailwind.css";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const { Option } = Select;

const CustomerRegister = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form values:", values);
    // Add your form submission logic here
  };

  return (
    <div className="bg-white  p-4 w-full max-h-full ">
      <div className="row mb-2">
        {/* <div className="col-md-6">
          <h3>
            Customer <span className="text-yellow-500">Register</span>
          </h3>
        </div> */}

        <div className="grid grid-cols-12 gap-4  w-full">
          {/* Header Title */}
          <div className="col-span-10 flex items-center">
            <h1 className="text-3xl font-bold p-2 my-2">
              Customer <span className="text-purple-500">Register</span>
            </h1>
          </div>

          {/* Icon */}
          <div className="col-span-2 flex items-center justify-center text-center p-2">
            <Link to="/dashboard">
              <FaHome className="text-3xl cursor-pointer" />
            </Link>
          </div>
        </div>

        <div className="col-md-6">
          <Form form={form} onFinish={onFinish} className="mt-3">
            <div className="flex items-center">
              <Form.Item
                name="keyword"
                rules={[{ required: true, message: "Please enter a keyword!" }]}
              >
                <Input
                  placeholder="Search..."
                  className="bg-white rounded-full shadow-xl"
                />
              </Form.Item>
              <Button
                type="link"
                htmlType="submit"
                className="ml-4 text-yellow-500 text-xl hover:text-blue-700"
              >
                <i className="fas fa-search"></i>
              </Button>
            </div>
          </Form>
        </div>
      </div>

      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
        className="p-5 bg-gray-200 justify-center rounded-xl shadow-xl"
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="datepicker"
              label="Date"
              rules={[{ required: true, message: "Please select a date!" }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="registerNo"
              label="Register No"
              initialValue={12} // Replace with dynamic value
              rules={[
                {
                  required: true,
                  message: "Please enter the register number!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="loyaltyBarcode"
              label="Loyalty Barcode"
              rules={[
                {
                  required: true,
                  message: "Please enter the loyalty barcode!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

         
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter the name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="teleMobile"
              label="Telephone (Mobile)"
              rules={[
                { required: true, message: "Please enter a mobile number!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="location"
              label="Location"
              rules={[
                { required: true, message: "Please enter the location!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="teleLand"
              label="Telephone (Land)"
              rules={[
                { required: true, message: "Please enter a landline number!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="occupation"
              label="Occupation"
              rules={[
                { required: true, message: "Please enter the occupation!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
{/* 
          <Form.Item
              name="area"
              label="Area"
              rules={[{ required: true, message: "Please select an area!" }]}
            >
              <Select placeholder="Select an area"
               className="w-full">
                <Option value="Main Area">Main Area</Option>
              </Select>
            </Form.Item> */}
         
        </Row>

        <Row gutter={16}>
        <Col span={8}>
            <Form.Item
              name="address1"
              label="Address Line 1"
              rules={[
                {
                  required: true,
                  message: "Please enter the first address line!",
                },
              ]}
               className="mb-0"
            >
              <Input />
            </Form.Item>
            <Form.Item name="address2" label="Address Line 2"  className="mb-0">
              <Input  />
            </Form.Item>
            <Form.Item name="address3" label="Address Line 3"  className="mb-0">
              <Input />
            </Form.Item>
          </Col>
         
          <Col span={8}>
            <Form.Item
              name="area"
              label="Area"
              rules={[{ required: true, message: "Please select an area!" }]}
            >
              <Select placeholder="Select an area">
                <Option value="Main Area">Main Area</Option>
                Add more options as required
              </Select>
            </Form.Item>
          </Col>
          
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-1/3 flex justify-center mt-5">
            Save Customer
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CustomerRegister;
