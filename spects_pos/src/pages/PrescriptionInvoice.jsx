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
  Modal,
  Typography,
} from "antd";
// import "antd/dist/antd.css"; // Import Ant Design styles
// import "tailwindcss/tailwind.css"; // Import Tailwind CSS
import ItemMaster from "./ItemMaster";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import Refresh from "../assets/images/dashboard/refresh.png";
import Prescription from "./Prescription";
import Invoice from "./Invoice";
import moment from "moment";
import dayjs from "dayjs";
import useNotification from "../hooks/useNotification";
import useFetch from "../hooks/useFetch";

const { Text } = Typography;

const { Option } = Select;

const PrescriptionInvoice = () => {
  const [form] = Form.useForm();
  const [selectedOption, setSelectedOption] = useState("prescription");
  const [jobNumber, setJobNumber] = useState("");
  const [officer, setOfficer] = useState("");
  const [customerResult, setCustomerResult] = useState({});
  const [history, setHistory] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    fetchData: fetchSearchData,
    fetchAction: fetchSearch,
    fetchError: fetchSearchError,
  } = useFetch();
  const [customers, setCustomers] = useState([]);
  const { notifyError, notifySuccess } = useNotification();
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // search patient
  const handleSearch = async (values) => {
    const searchKey = values.keyword ? values.keyword : "";

    const data = {
      searchKey,
    };

    fetchSearch({
      query: `v1.0/customer`,
      params: data,
      method: "get",
    });

    if (!searchKey) {
      form.resetFields();
    }
  };

  useEffect(() => {
    if (fetchSearchData) {
      if (fetchSearchData?.success === true) {
        setCustomers(fetchSearchData.list);
        // setIsModalVisible(true);

        // fetchnextID();
      } else {
        notifyError("Error Fetching Data..!");
      }
    }
  }, [fetchSearchData, fetchSearchError]);

  // row click
  const handleRowClick = (record) => {

    form.setFieldsValue({
      regNo: record.regNo,
      customerName: record.name,
      customerAddress: `${record.addressLine1}, ${record.addressLine2}, ${record.addressLine3}`, // or combine addressLine1, 2, 3 if needed
      customerMobile: record.mobileNo,
    });
    setSelectedCustomer(record);
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    const keyword = e.target.value;

    handleSearch({ keyword });
  };

  const columns2 = [
    { title: "Register No", dataIndex: "regNo", key: "regNo" },
    {
      title: "Loyalty Barcode",
      dataIndex: "loyaltyBarCode",
      key: "loyaltyBarcode",
    },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Date",
      dataIndex: "dateTime",
      key: "dateTime",
      render: (date) => {
        return moment.isMoment(date) ? date.format("YYYY-MM-DD") : "N/A";
      },
    },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Occupation", dataIndex: "occupation", key: "occupation" },
    { title: "Mobile No", dataIndex: "mobileNo", key: "mobileNo" },
    { title: "Landline No", dataIndex: "telNoLan", key: "telNoLan" },
    { title: "Address Line 1", dataIndex: "addressLine1", key: "addressLine1" },
    { title: "Address Line 2", dataIndex: "addressLine2", key: "addressLine2" },
    { title: "Address Line 3", dataIndex: "addressLine3", key: "addressLine3" },
    { title: "Area", dataIndex: "area", key: "area" },
  ];

  useEffect(() => {
    // Fetch initial data if needed
  }, []);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleShowData = () => {
    const selectedJob = form.getFieldValue("jobNo");
    // Fetch assessment and prescription data
  };

  const handleOfficerChange = (value) => {
    setOfficer(value);
  };

  // const handleRowClick = (record) => {
  //   setJobNumber(record.id);
  //   // Update job number and fetch associated data
  // };

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
              <AntdInput className="h-10" readOnly />
            </Form.Item>
            <Form.Item name="searchRegNo">
              <div className="flex items-center">
                <AntdInput
                  className="bg-white rounded-full shadow-xl"
                  placeholder="Search Patient"
                  onChange={handleInputChange}
                />
                <Button
                  type="default"
                  className="ml-4 text-purple-500 border-2 border-purple-500 "
                  onClick={() => {
                    setIsModalVisible(true);
                  }}
                >
                  {/* <i className="fa-solid fa-notes-medical"></i> */}
                  Search
                </Button>
              </div>
            </Form.Item>

            {/* <div className="flex justify-center  items-center">
              <Link type="default" onClick={handleRefresh}>
                <img src={Refresh} alt="Refresh" className="w-10 h-10" />
              </Link>
            </div> */}
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
                <Form.Item name="customerName" >
                  <Text className="text-md font-bold uppercase text-green-600">
                    {form.getFieldValue("customerName")}
                  </Text>
                </Form.Item>
              </div>
              <Form.Item name="customerAddress" >
                <Text className="text-sm font-bold uppercase text-blue-600">
                  {form.getFieldValue("customerAddress")}
                </Text>
              </Form.Item>
              <Form.Item name="customerMobile" >
                <Text className="text-sm font-bold text-black">
                  {form.getFieldValue("customerMobile")}
                </Text>
              </Form.Item>
            </div>
            
          </div>

          <div className="col-span-2 p-2 border-2 border-gray-200 rounded-lg">
            <Form.Item name="jobNo">
              <AntdInput
                className="h-10 text-green-600 font-bold"
                value={3000}
              />
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

      <Modal
        title="Patient List"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={1000}
      >
        <Table
          columns={columns2}
          dataSource={customers}
          rowKey="id"
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          pagination={false}
          scroll={{ x: 1200 }}
        />
      </Modal>
    </div>
  );
};

export default PrescriptionInvoice;
