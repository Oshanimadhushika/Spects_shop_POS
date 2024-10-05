import React from "react";
import { Form, Input, Button, Select, DatePicker } from "antd";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const { Option } = Select;

const Visitors = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Form Values:", values);
    // Handle form submission logic here
  };

  const clearForm = () => {
    form.resetFields();
  };

  const exit = () => {
    window.location.href = "index.php";
  };

  const handleSearch = async (values) => {
    // try {
    //   const res = await axios.post('/api/searchItems', { keyword: values.keyword });
    //   setItems(res.data);
    // } catch (error) {
    //   message.error('Search failed');
    // }
  };
  return (
    <div className="bg-white  p-6 w-full max-h-full ">
      <div className="grid grid-cols-12 gap-4  w-full">
        {/* Header Title */}
        <div className="col-span-10 flex items-center">
          <h1 className="text-3xl font-bold p-2 my-2">
            Visitors <span className="text-purple-500">Page</span>
          </h1>
        </div>

        {/* Icon */}
        <div className="col-span-2 flex items-center justify-center text-center p-2">
          <Link to="/dashboard">
            <FaHome className="text-3xl cursor-pointer" />
          </Link>
        </div>
      </div>

      <Form.Item>
        <Form layout="inline" onFinish={handleSearch}>
          <Form.Item name="keyword">
            <Input placeholder="Search..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Form>
      </Form.Item>

      <div className="p-5 bg-gray-200 justify-center rounded-xl shadow-xl">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="grid grid-cols-1 gap-4"
          requiredMark={false}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Please input the Date!" }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>

            <Form.Item
              label="Reg No"
              name="regNo"
              rules={[{ required: true, message: "Please input the Reg No!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input the Name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Telephone (Mobile)"
              name="teleMobile"
              rules={[{ required: true, message: "Please input the Mobile!" }]}
            >
              <Input.Group compact>
                <Input className="w-1/2" />
                <Input className="w-1/2" />
              </Input.Group>
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Form.Item
              label="Purpose"
              name="purpose"
              rules={[{ required: true, message: "Please select a Purpose!" }]}
            >
              <Select placeholder="Select Purpose">
                <Option value="0">Option 1</Option>
                <Option value="1">Option 2</Option>
                <Option value="2">Option 3</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Visitor's Comment"
              name="visitorComment"
              rules={[{ required: true, message: "Please select a Comment!" }]}
            >
              <Select placeholder="Select Comment">
                <Option value="0">Comment 1</Option>
                <Option value="1">Comment 2</Option>
                <Option value="2">Comment 3</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Form.Item
              label={
                <div className="whitespace-nowrap">
                  Have you checked your eyes?
                </div>
              }
              name="eyeCheck"
              rules={[{ required: true, message: "Please select an option!" }]}
            >
              <Select placeholder="Select">
                <Option value="Yes">Yes</Option>
                <Option value="No">No</Option>
              </Select>
            </Form.Item>

            <Form.Item
              // label="In how many days do you expect them to return?"

              name="returnDays"
            >
              <label className="whitespace-nowrap">
                In how many days do you expect them to return?
              </label>
              <Input.Group compact>
                <Select placeholder="Select Days" className="w-1/4">
                  <Option value="0">0</Option>
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                </Select>
                <DatePicker className="w-3/4" />
              </Input.Group>
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Form.Item
              label="Staff Member"
              name="staffMember"
              rules={[{ required: true, message: "Please select a Staff!" }]}
            >
              <Select placeholder="Select Staff">
                <Option value="0">Staff 1</Option>
                <Option value="1">Staff 2</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={
                <div className="whitespace-nowrap">
                  Conclusion about those who came
                </div>
              }
              name="conclusion"
              rules={[
                { required: true, message: "Please select a Conclusion!" },
              ]}
            >
              <Select placeholder="Select Conclusion">
                <Option value="0">Conclusion 1</Option>
                <Option value="1">Conclusion 2</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            label="Vision details and others"
            name="visionDetails"
            rules={[{ required: true, message: "Please provide details!" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <div className="flex justify-end gap-2">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-600 text-white w-28"
            >
              Submit
            </Button>
            <Button
              className="bg-yellow-500 text-white w-28"
              onClick={clearForm}
            >
              Clear
            </Button>
            <Button
              className="bg-red-500 text-white w-28"
              onClick={() => console.log("Delete clicked")}
            >
              Delete
            </Button>
            <Button className="bg-black text-white w-28" onClick={exit}>
              Exit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Visitors;
