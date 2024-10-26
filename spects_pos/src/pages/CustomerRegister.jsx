import React, { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, Select, Col, Row, Table } from "antd";
import "antd/dist/reset.css";
import "tailwindcss/tailwind.css";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import useNotification from "../hooks/useNotification";
import useFetch from "../hooks/useFetch";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import dayjs from "dayjs";

const { Option } = Select;

const CustomerRegister = () => {
  const [form] = Form.useForm();
  const { fetchData, fetchAction, fetchError, fetchLoading } = useFetch();
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [loading, setLoading] = useState(false);

  const { notifyError, notifySuccess } = useNotification();

  const { fetchData: fetchId, fetchAction: fetchIdAction } = useFetch();

  const [nextId, setNextId] = useState(1);
  const {
    fetchData: fetchSearchData,
    fetchAction: fetchSearch,
    fetchError: fetchSearchError,
  } = useFetch();

  const {
    fetchData: fetchUpdateData,
    fetchAction: fetchUpdate,
    fetchError: fetchUpdateError,
  } = useFetch();

  const {
    fetchData: fetchDeleteData,
    fetchAction: fetchDelete,
    fetchError: fetchDeleteError,
  } = useFetch();

  useEffect(() => {
    fetchnextID();
    handleSearch({ keyword: "" });
  }, []);

  // get nextId
  const fetchnextID = () => {
    setLoading(true);

    fetchIdAction({
      query: `v1.0/customer/next-id`,
      // params: data,
      method: "get",
    });

    setLoading(false);
  };

  useEffect(() => {
    if (fetchId) {
      if (fetchId.status === true) {
        setNextId(fetchId.message);
        form.setFieldsValue({ registerNo: fetchId.message });
      } else {
        notifyError("Cannot find the ID..!");
      }
    }
  }, [fetchId]);

  // Add customer
  const handleSave = (values) => {
    setLoading(true);
    const data = {
      regNo: nextId,
      loyaltyBarCode: values.loyaltyBarcode || "",
      name: values.name,
      dateTime: new Date().toISOString(),
      location: values.location,
      occupation: values.occupation || "",
      mobileNo: values.teleMobile,
      telNoLan: values.teleLand || "",
      addressLine1: values.address1 || "",
      addressLine2: values.address2 || "",
      addressLine3: values.address3 || "",
      area: values.area || "",
    };

    fetchAction({
      query: `v1.0/customer/add`,
      body: data,
      // method: "get",
    });

    setLoading(false);
  };

  useEffect(() => {
    if (fetchData) {
      if (fetchData.status === true) {
        notifySuccess(fetchData.message);
        handleSearch({ keyword: "" });
        form.resetFields();
        setSelectedCustomer(null);
        fetchnextID();
      } else {
        notifyError(fetchData.message);
      }
    }
  }, [fetchData, fetchError]);

  // update data

  const handleUpdate = async (values) => {
    setLoading(true);
    const data = {
      regNo: values.registerNo,
      loyaltyBarCode: values.loyaltyBarcode || "",
      name: values.name,
      dateTime: new Date().toISOString(),
      location: values.location,
      occupation: values.occupation || "",
      mobileNo: values.teleMobile,
      telNoLan: values.teleLand || "",
      addressLine1: values.address1 || "",
      addressLine2: values.address2 || "",
      addressLine3: values.address3 || "",
      area: values.area || "",
    };

    fetchUpdate({
      query: `v1.0/customer/update`,
      body: data,
      method: "put",
    });

    setLoading(false);
  };

  useEffect(() => {
    if (fetchUpdateData) {
      if (fetchUpdateData.status === true) {
        notifySuccess(fetchUpdateData.message);
        handleSearch({ keyword: "" });
        form.resetFields();
        setSelectedCustomer(null);
        fetchnextID();
      } else {
        notifyError(fetchUpdateData.message);
      }
    }
  }, [fetchUpdateData, fetchError]);

  // delete customer
  const handleDelete = async (values) => {
    // setLoading(true);
    // const data = {
    //   id: values.id,
    // };
    // fetchDelete({
    //   query: `v1.0/category/add`,
    //   body: data,
    //   // method: "get",
    // });
    // setLoading(false);
  };

  // useEffect(() => {

  //   if (fetchDeleteData) {
  //     if (fetchDeleteData.status === true) {
  //       notifySuccess(fetchDeleteData.message);
  //       form.resetFields();
  //       fetchnextID();
  //     } else {
  //       notifyError(fetchData.message);
  //     }
  //   }
  // }, [fetchData, fetchError]);

  // search

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
        fetchnextID();
      } else {
        notifyError("Error Fetching Data..!");
      }
    }
  }, [fetchSearchData, fetchSearchError]);

  // row click
  const handleRowClick = (record) => {
    form.setFieldsValue({
      registerNo: record.regNo,
      loyaltyBarcode: record.loyaltyBarCode,
      name: record.name,
      datepicker: record.dateTime ? moment(record.dateTime) : null,      location: record.location,
      occupation: record.occupation,
      teleMobile: record.mobileNo,
      teleLand: record.telNoLan,
      address1: record.addressLine1,
      address2: record.addressLine2,
      address3: record.addressLine3,
      area: record.area,
    });
    setSelectedCustomer(record);
  };

  const handleInputChange = (e) => {
    const keyword = e.target.value;

    handleSearch({ keyword });
    fetchnextID();
  };

  // set age from DOB
  const handleDateOfBirthChange = (date) => {
    console.log("DOB", date);

    if (date && dayjs.isDayjs(date)) {
      const today = dayjs();
      const age = today.diff(date, "year");

      form.setFieldsValue({
        age: age,
      });
    } else {
      form.setFieldsValue({
        age: undefined,
      });
    }
  };

  const columns = [
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
        return moment.isMoment(date) ? date.format('YYYY-MM-DD') : 'N/A';
      }    },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Occupation", dataIndex: "occupation", key: "occupation" },
    { title: "Mobile No", dataIndex: "mobileNo", key: "mobileNo" },
    { title: "Landline No", dataIndex: "telNoLan", key: "telNoLan" },
    { title: "Address Line 1", dataIndex: "addressLine1", key: "addressLine1" },
    { title: "Address Line 2", dataIndex: "addressLine2", key: "addressLine2" },
    { title: "Address Line 3", dataIndex: "addressLine3", key: "addressLine3" },
    { title: "Area", dataIndex: "area", key: "area" },
  ];

  return (
    <div className="bg-white p-4 w-full max-h-full ">
      <div className="grid grid-cols-12 gap-4 w-full">
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

      <Form layout="inline" onFinish={handleSearch}>
        <Form.Item name="keyword">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search..."
            className="rounded-full shadow-xl mb-4"
            onChange={handleInputChange}
          />
        </Form.Item>
      </Form>

      <Form
        form={form}
        onFinish={selectedCustomer ? handleUpdate : handleSave}
        layout="vertical"
        requiredMark={false}
        className="p-5 bg-gray-200 justify-center rounded-xl shadow-xl"
      >
        {/* 1st row */}
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8} lg={4} xl={5}>
            <Form.Item
              name="datepicker"
              label="Date"
              rules={[{ required: true, message: "Please select a date!" }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={4} xl={5}>
            <Form.Item
              name="registerNo"
              label="Register No"
              rules={[
                {
                  required: true,
                  message: "Please enter the register number!",
                },
              ]}
            >
              <Input readOnly value={nextId} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={4} xl={5}>
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

        {/*2nd name,tele number */}
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8} lg={4} xl={5}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter the name!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={4} xl={5}>
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
          <Col xs={24} sm={12} md={8} lg={4} xl={5}>
            <Form.Item
              name="location"
              label="Location"
              rules={[
                { required: true, message: "Please enter the location!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={4} xl={5}>
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
        </Row>

        {/*3rd  New Row for ID Number, Date of Birth, Age, Occupation, Area */}
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8} lg={4} xl={5}>
            <Form.Item
              name="idNumber"
              label="ID Number"
              rules={[
                { required: true, message: "Please enter the ID number!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={4} xl={5}>
            <Form.Item
              name="dateOfBirth"
              label="Date of Birth"
              rules={[
                { required: true, message: "Please select a date of birth!" },
              ]}
            >
              <DatePicker
                className="w-full"
                format="YYYY-MM-DD"
                onChange={handleDateOfBirthChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={3} xl={3}>
            <Form.Item
              name="age"
              label="Age"
              rules={[{ required: true, message: "Please enter the age!" }]}
            >
              <Input type="number" readOnly />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={8} lg={4} xl={5}>
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
          <Col xs={24} sm={12} md={8} lg={4} xl={5}>
            <Form.Item
              name="area"
              label="Area"
              rules={[{ required: true, message: "Please select an area!" }]}
            >
              <Select placeholder="Select an area">
                <Option value="Downtown">Downtown</Option>
                <Option value="City Center">City Center</Option>
                <Option value="Suburban Neighborhood">
                  Suburban Neighborhood
                </Option>
                <Option value="Countryside">Countryside</Option>
                <Option value="Commercial District">Commercial District</Option>
                <Option value="Park">Park</Option>
                <Option value="Historic District">Historic District</Option>
                <Option value="Tech Park">Tech Park</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/*4th */}
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8} lg={4} xl={5}>
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
          </Col>
          <Col xs={24} sm={12} md={8} lg={4} xl={5}>
            <Form.Item
              name="address2"
              label="Address Line 2"
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
          </Col>
          <Col xs={24} sm={12} md={8} lg={4} xl={5}>
            <Form.Item
              name="address3"
              label="Address Line 3"
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
          </Col>
        </Row>

        <Form.Item className="mt-5 w-2/3">
          <Button
            type="primary"
            htmlType="submit"
            className="mr-2 w-1/5 bg-purple-500 hover:bg-blue-500 text-white font-semibold p-3 rounded-md"
          >
            Submit
          </Button>
          <Button
            type="default"
            // onClick={() => form.resetFields()}
            className="mr-2 w-1/5 border-2 border-green-600 text-green-600"
          >
            Update
          </Button>
          <Button
            type="default"
            onClick={() => {
              form.resetFields();
              fetchnextID();
              setSelectedCustomer(null);
            }}
            className="mr-2 w-1/5 border-2 border-blue-600 text-blue-600"
          >
            Clear
          </Button>
          <Button
            type="danger"
            onClick={handleDelete}
            className="mr-2 w-1/5 border-2 border-red-500 text-red-500"
          >
            Delete
          </Button>
        </Form.Item>

        <div className="max-h-44 overflow-y-auto mt-4">
          <Table
            dataSource={customers}
            columns={columns}
            rowKey="id"
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
            scroll={{ x: "max-content" }}
          />
        </div>
      </Form>
    </div>
  );
};

export default CustomerRegister;
