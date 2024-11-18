import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Radio,
  Button,
  Select,
  Table,
  Input as AntdInput,
  Divider,
} from "antd";
// import "antd/dist/antd.css"; // Import Ant Design styles
// import "tailwindcss/tailwind.css"; // Import Tailwind CSS
import ItemMaster from "./ItemMaster";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import Refresh from "../assets/images/dashboard/refresh.png";
import Prescription from "./Prescription";
import Invoice from "./Invoice";

const { Option } = Select;

const PrescriptionInvoice = () => {
  const [form] = Form.useForm();
  const [selectedOption, setSelectedOption] = useState("prescription");
  const [jobNumber, setJobNumber] = useState("");
  const [officer, setOfficer] = useState("");
  const [customerResult, setCustomerResult] = useState({});
  const [history, setHistory] = useState([]);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    // Fetch initial data if needed
  }, []);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    // Handle content change based on selected option
  };

  const handleSearch = () => {
    // Handle search functionality
    const regNo = form.getFieldValue("searchRegNo");
    // Fetch customer data and update state
  };

  const handleRefresh = () => {
    // const regNo = form.getFieldValue("regNo");
    
    // Perform any additional actions you need before refreshing the page
    // Fetch updated customer data and job history
  
    // Refresh the page
    window.location.reload();
  };

  const handleShowData = () => {
    const selectedJob = form.getFieldValue("jobNo");
    // Fetch assessment and prescription data
  };

  const handleOfficerChange = (value) => {
    setOfficer(value);
  };

  const handleRowClick = (record) => {
    setJobNumber(record.id);
    // Update job number and fetch associated data
  };

  // Define columns for the Ant Design Table
  const columns = [
    {
      title: "Job ID",
      dataIndex: "id",
      key: "id",
      onClick: handleRowClick,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Button onClick={() => handleRowClick(record)}>Show</Button>
    //   ),
    // },
  ];

  const renderContent = () => {
    switch (selectedOption) {
      case "prescription":
        return <Prescription />;
      case "invoice":
        return <Invoice />;
      default:
        return null;
    }
  };

  return (
    <div className=" bg-white p-4 w-full h-screen">
      <div className="grid grid-cols-12 gap-4  w-full">
        {/* Header Title */}
        <div className="col-span-10 flex items-center">
          <h1 className="text-3xl font-bold p-2 my-2">
            Prescription <span className="text-purple-500">Invoice</span>
          </h1>
        </div>

        {/* Icon */}
        <div className="col-span-2 flex items-center justify-center text-center p-2">
          <Link to="/dashboard">
            <FaHome className="text-3xl cursor-pointer" />
          </Link>
        </div>
      </div>

      <Form form={form} layout="vertical" onFinish={handleSearch}>
        <div className="grid grid-cols-12 gap-2 mb-4">
          <div className="col-span-2 p-2 border-2 border-gray-200 rounded-lg">
            <Form.Item name="regNo" label="Reg No:" className="mb-2">
              <AntdInput className="h-10" />
            </Form.Item>
            <Form.Item name="searchRegNo">
              <div className="flex items-center">
                <AntdInput
                  className="bg-white rounded-full shadow-xl"
                  placeholder="Search Patient"
                />
                <Button
                  type="default"
                  className="ml-4 text-purple-500 border-2 border-purple-500 "
                  onClick={handleSearch}
                >
                  {/* <i className="fa-solid fa-notes-medical"></i> */}
                  Search
                </Button>
              </div>
            </Form.Item>

            <div className="flex justify-center  items-center">
              <Link type="default" onClick={handleRefresh}>
                <img src={Refresh} alt="Refresh" className="w-10 h-10" />
              </Link>
            </div>
          </div>

          <div className="col-span-2 p-2 border-2 border-gray-200 rounded-lg">
            <Form.Item name="option" label="Options">
              <Radio.Group
                onChange={handleOptionChange}
                defaultValue={selectedOption}
              >
                <Radio value="prescription">Prescription</Radio>
                <Radio value="invoice">Invoice</Radio>
              </Radio.Group>
            </Form.Item>
          </div>

          <div className="col-span-2 p-2 border-2 border-gray-200 rounded-lg">
            <div className="text-center">
              <div>
                <Form.Item name="customerName">
                  <label className="text-sm font-medium uppercase text-blue-600">
                    Mrs B.kusumalatha
                  </label>
                </Form.Item>
              </div>
              <Form.Item name="customerAddress">
                <label className="text-sm font-medium uppercase text-blue-600">
                  Address
                </label>
              </Form.Item>
              <Form.Item name="customerMobile">
                <label className="text-sm font-medium">071236477</label>
              </Form.Item>
            </div>
          </div>

          <div className="col-span-2 p-2 border-2 border-gray-200 rounded-lg">
            <Form.Item name="jobNo">
              <AntdInput className="h-10 text-green-600 font-bold" value={3000}/>
            </Form.Item>
            <Form.Item name="officer">
              <label className="font-bold text-xs">Officer</label>
              <Select
                className="h-10"
                placeholder="Select Officer"
                onChange={handleOfficerChange}
                value={officer}
              >
                <Option value="Gayan">Gayan</Option>
                <Option value="Heshan">Heshan</Option>
                <Option value="Janu">Janu</Option>
              </Select>
            </Form.Item>

            <Form.Item name="stock">
            <label className="font-bold text-xs">Stock</label>

              <Select
                className="h-10"
                placeholder="Select Stoke"
                // onChange={handleOfficerChange}
                // value={officer}
              >
                <Option value="Showroom">Showroom</Option>
                {/* <Option value="Heshan">Heshan</Option>
                <Option value="Janu">Janu</Option> */}
              </Select>
            </Form.Item>
          </div>

          <div className="flex col-span-4 gap-2 p-4">
            {/* {history.length > 0 && ( */}
            <Table
              columns={columns}
              dataSource={history}
              pagination={false}
              bordered
              size="small"
              scroll={{ y: 400, x: "max-content" }} // Set a fixed height for the table
            />
            {/* )} */}

          </div>
        </div>
      </Form>

      <Divider />

      <div className="col-span-12 p-4 contentFrameCol w-full">
        <div className="w-full  h-auto">{renderContent()}</div>
      </div>
    </div>
  );
};

export default PrescriptionInvoice;
