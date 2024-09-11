import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import {
  Input,
  Button,
  Select,
  Checkbox,
  Table,
  Typography,
  Row,
  Col,
  Form,
  notification,
  Space,
} from "antd";
import { BiSearch } from "react-icons/bi";

const { TextArea } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

function JobStatus() {
  const [keyword, setKeyword] = useState("");
  const [jobData, setJobData] = useState({});
  const [customerData, setCustomerData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("Collected");
  const [message, setMessage] = useState("");
  const [smsChecked, setSmsChecked] = useState(false);

  const handleSearch = async () => {
    try {
      const jobResponse = await axios.post("/searchJob", { keyword });
      if (jobResponse.data) {
        setJobData(jobResponse.data);
        const customerResponse = await axios.post(
          "/searchCustomerByRegNumber",
          { cusRegNumber: jobResponse.data.cusRegNumber }
        );
        setCustomerData(customerResponse.data);
        const paymentResponse = await axios.post("/searchPaymentByJob", {
          keyword,
        });
        setPaymentData(paymentResponse.data);
        const total = paymentResponse.data.reduce(
          (sum, pay) => sum + pay.amount,
          0
        );
        setTotalAmount(total);
      }
    } catch (error) {
      console.error("Error searching job:", error);
    }
  };

  const handleStatusChange = async () => {
    try {
      const response = await axios.post("/updateJobStatus", {
        id: jobData.id,
        note,
        status,
      });
      if (response.data.success) {
        notification.success({ message: "Job Status Updated!" });
      } else {
        notification.error({ message: "Something went wrong!" });
      }
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  const jobColumns = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Job No", dataIndex: "id", key: "id" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Notes", dataIndex: "note", key: "note" },
    { title: "Amount", key: "amount", render: () => totalAmount },
  ];

  return (
    <div className="bg-white p-4 w-full max-h-full">
      <Row gutter={[16, 16]} justify="space-between">
        {/* Header Title */}
        <Col span={20}>
          <Title level={3}>
            Job <span className="text-purple-500">Status</span>
          </Title>
        </Col>
        {/* Icon */}
        <Col span={4} className="text-center">
          <Link to="/dashboard">
            <FaHome className="text-3xl cursor-pointer" />
          </Link>
        </Col>
      </Row>

      {/* Search Job */}
      <div className="p-5 bg-gray-200 rounded-xl shadow-xl">
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Form.Item label="Search Prescription/Job" labelCol={{ span: 24 }}>
              <Input
                placeholder="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                suffix={
                  <Button
                    type="primary"
                    icon={<BiSearch/>}
                    onClick={handleSearch}
                  />
                }
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Customer Info */}
        <Row  className="p-5 bg-white rounded shadow-md">
          <Col span={12}>
            <Text strong>Name:</Text> <Text>{customerData.map((cust) => cust.name).join(", ")}</Text>
          </Col>
          <Col span={12}>
            <Text strong>Gender:</Text> <Text>Female</Text>
          </Col>
          <Col span={12}>
            <Text strong>Date Of Birth:</Text> <Text>{customerData.map((cust) => cust.dob).join(", ")}</Text>
          </Col>
          <Col span={12}>
            <Text strong>Contact No:</Text> <Text>{customerData.map((cust) => cust.teleMobile).join(", ")}</Text>
          </Col>
        </Row>
        

        {/* Job Table */}
        <Row className="mt-4">
          <Col span={24}>
            <Table
              columns={jobColumns}
              dataSource={jobData ? [jobData] : []}
              pagination={false}
              rowKey="id"
              scroll={{ y: 200 }}
            />
          </Col>
        </Row>

        {/* Note and SMS */}
        <Row gutter={[16, 16]} className="mt-4">
          <Col span={16}>
            <Form.Item >
                <label className="font-semibold">Enter Notes</label>
              <TextArea
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item >
            <label className="font-semibold">SMS</label>

              <TextArea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Status and Buttons */}
        <Row gutter={[16, 16]} justify="space-between" align="middle">
          <Col span={6}>
            <Form.Item label="Status">
              <Select
                value={status}
                onChange={(value) => setStatus(value)}
                style={{ width: "100%" }}
              >
                <Option value="Collected">Collected</Option>
                <Option value="Fitting">FITTING</Option>
                <Option value="Ready">READY</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8} className="text-end">
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Button type="primary" onClick={handleStatusChange} className="w-28">
                SMS Ready
              </Button>
              <Button type="default" onClick={() => (window.location.href = "/")} className="w-28">
                Exit
              </Button>
              <Checkbox
                checked={smsChecked}
                onChange={() => setSmsChecked(!smsChecked)}
                className="w-28 font-semibold"
              >
                SMS Sent
              </Checkbox>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default JobStatus;
