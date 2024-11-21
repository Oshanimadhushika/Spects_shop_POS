import React, { useState, useEffect } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  notification,
  Space,
  Typography,
} from "antd";
// import "antd/dist/reset.css";
// import "tailwindcss/tailwind.css";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useNotification from "../hooks/useNotification";
import moment from "moment";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Option } = Select;

const Prescription = () => {
  const [form] = Form.useForm();
  const [jobNo, setJobNo] = useState("");
  const [assessment, setAssessment] = useState({});
  const [prescription, setPrescription] = useState({});
  const navigate = useNavigate();
  const { fetchData, fetchAction, fetchError, fetchLoading } = useFetch();




  useEffect(() => {
    // Simulate fetching data
    const fetchInitialData = async () => {
      // Simulate fetching job number
      //   setJobNo('123456');
      //   // Simulate fetching initial assessment and prescription data
      //   setAssessment({
      //     rightVa: '',
      //     leftVa: '',
      //     note: ''
      //   });
      //   setPrescription({
      //     rightDista: '100',
      //     leftDista: '100'
      //   });
    };

    fetchInitialData();
  }, []);

  const handleSave = (values) => {
    // setLoading(true);
  
    const data = {
      // id: nextId,
      // name: values.category,
      branchUserId: values.branchUserId,
      rdate: values.rdate,
      code: values.code,
      name: values.name,
      billDate: values.billDate,
      age: values.age,
      ws: values.ws,
      reDate: values.reDate,
      reR: values.reR,
      reL: values.reL,
      reRAdd: values.reRAdd,
      reLAdd: values.reLAdd,
      cyR: values.cyR,
      cyL: values.cyL,
      cyRAdd: values.cyRAdd,
      cyLAdd: values.cyLAdd,
      axR: values.axR,
      axL: values.axL,
      axRAdd: values.axRAdd,
      axLAdd: values.axLAdd,
      note2: values.note2,
      tested: values.tested,
      var: values.var,
      val: values.val,
      pd: values.pd,
      sh: values.sh,
      nvDate: values.nvDate,
      nv: values.nv,
      hmr: values.hmr,
      hml: values.hml,
      phr: values.phr,
      phl: values.phl,
      suBr: values.suBr,
      suBl: values.suBl,
      loLr: values.loLr,
      loll: values.loll,
      varp: values.varp,
      valp: values.valp,
      tcdate: values.tcdate,
      dpd: values.dpd,
      mpDr: values.mpDr,
      mpDl: values.mpDl,
    };
  
    fetchAction({
      query: `v1.0/prescription/add`,
      body: data,
      // method: "POST",
    });
  
    // setLoading(false);
  };
  

  const handleCreateJob = async () => {
    // Handle create job logic
    // try {
    //   // Simulate job creation logic
    //   setJobNo('654321');
    //   notification.success({ message: 'Job Created Successfully!' });
    // } catch (error) {
    //   notification.error({ message: 'Failed to create job!' });
    // }
  };

  const handleClear = () => {
    form.resetFields();
    notification.info({ message: "Form cleared!" });
  };

  const distaOptions = [
    "Plano",
    "Own",
    "+0.25",
    "+0.50",
    "+0.75",
    "+1.00",
    "+1.25",
    "+1.5",
    "+1.75",
    "+2",
    "+2.25",
    "+2.5",
    "+2.75",
    "+3",
    "+3.25",
    "+3.5",
    "+3.75",
    "+4",
    "+4.25",
    "+4.5",
    "+4.75",
    "+5",
    "+5.25",
    "+5.5",
    "+5.75",
    "+6",
    "+6.25",
    "+6.5",
    "+6.75",
    "+7",
    "+7.25",
    "+7.5",
    "+7.75",
    "+8",
    "+8.25",
    "+8.5",
    "+8.75",
    "+9",
    "+9.25",
    "+9.5",
    "+9.75",
    "+10",
    "+10.25",
    "+10.5",
    "+10.75",
    "+11",
    "+11.25",
    "+11.5",
    "+11.75",
    "+12",
    "+12.25",
    "+12.5",
    "+12.75",
    "+13",
    "-0.25",
    "-0.5",
    "-0.75",
    "-1",
    "-1.25",
    "-1.5",
    "-1.75",
    "-2",
    "-2.25",
    "-2.5",
    "-2.75",
    "-3",
    "-3.25",
    "-3.5",
    "-3.75",
    "-4",
    "-4.25",
    "-4.5",
    "-4.75",
    "-5",
    "-5.25",
    "-5.5",
    "-5.75",
    "-6",
    "-6.25",
    "-6.5",
    "-6.75",
    "-7",
    "-7.25",
    "-7.5",
    "-7.75",
    "-8",
    "-8.25",
    "-8.5",
    "-8.75",
    "-9",
    "-9.25",
    "-9.5",
    "-9.75",
    "-10",
    "-10.25",
    "-10.5",
    "-10.75",
    "-11",
    "-11.25",
    "-11.5",
    "-11.75",
    "-12",
    "-12.25",
    "-12.5",
    "-12.75",
    "-13",
    "-13.25",
    "-13.5",
    "-13.75",
    "-14",
    "-14.25",
    "-14.5",
    "-14.75",
    "-15",
    "-15.25",
    "-15.5",
    "-15.75",
    "-16",
    "-16.25",
    "-16.5",
    "-16.75",
    "-17",
    "-17.25",
    "-17.5",
    "-17.75",
    "-18",
    "-18.25",
    "-18.5",
    "-18.75",
    "-19",
    "-19.25",
    "-19.5",
    "-19.75",
    "-20",
  ];

  const addOptions = [
    "+1.00",
    "+1.25",
    "+1.50",
    "+1.75",
    "+2.00",
    "+2.25",
    "+2.50",
    "+2.75",
    "+3.00",
    "+3.50",
    "+4.00",
  ];

  const cylOptions = [
    "+0.25",
    "+0.50",
    "+0.75",
    "+1.00",
    "+1.25",
    "+1.50",
    "+1.75",
    "+2.00",
    "+2.25",
    "+2.50",
    "+2.75",
    "+3.00",
    "+3.50",
    "+4.00",
    "+4.50",
    "+5.00",
    "+5.50",
    "+6.00",
    "-0.25",
    "-0.50",
    "-0.75",
    "-1.00",
    "-1.25",
    "-1.50",
    "-1.75",
    "-2.00",
    "-2.25",
    "-2.50",
    "-2.75",
    "-3.00",
    "-3.50",
    "-4.00",
    "-4.50",
    "-5.00",
    "-5.50",
    "-6.00",
  ];

  return (
    <div className="border-2 border-gray-300 bg-gray-200 p-4 mb-4 shadow-xl">
      <Typography.Title level={3}>Prescription</Typography.Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        className="space-y-4"
      >
        {/* First Row */}
        <div className="grid grid-cols-12 gap-2 mb-4">
          <Form.Item className="col-span-2" label="Pres Date" name="date">
            <DatePicker className="w-full" />
          </Form.Item>
          <div className="col-span-2 flex items-center">
            <span className="text-sm font-semibold whitespace-nowrap">
              Job No:
            </span>
            <div className="border-2 border-gray-200 p-2 ml-2 w-full text-center text-lg font-bold text-red-700">
              {jobNo} 3000
            </div>
          </div>
          <div className="col-span-2 flex items-center">
            <Button className="w-full" onClick={handleCreateJob}>
              Create Job No
            </Button>
          </div>
          <div className="col-span-2 flex items-center">
            <Button className="w-full">Find Missing Job No</Button>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-6">
            <div className="bg-black text-white font-semibold text-sm text-center mb-2">
              Assessments
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-green-700 font-bold">
                  Right Eye
                </div>
                <Form.Item label="VA" name="rightVA" className="mb-0">
                  <Input value={assessment.rightVa} />
                </Form.Item>

                <Form.Item label="P/H" name="rightPH" className="mb-0">
                  <Input value={assessment.rightVa} />
                </Form.Item>

                <Form.Item label="H/M" name="rightHM" className="mb-0">
                  <Input value={assessment.rightVa} />
                </Form.Item>

                <Form.Item label="IOL" name="rightIOL" className="mb-0">
                  <Input value={assessment.rightVa} />
                </Form.Item>

                <Form.Item label="Sub" name="rightSub" className="mb-0">
                  <Input value={assessment.rightVa} />
                </Form.Item>
                {/* Add more fields as necessary */}
              </div>
              <div>
                <div className="text-xs text-green-700 font-bold">Left Eye</div>
                <Form.Item label="VA" name="leftVA" className="mb-0">
                  <Input value={assessment.leftVa} />
                </Form.Item>

                <Form.Item label="P/H" name="leftPH" className="mb-0">
                  <Input value={assessment.rightVa} />
                </Form.Item>

                <Form.Item label="H/M" name="leftHM" className="mb-0">
                  <Input value={assessment.rightVa} />
                </Form.Item>

                <Form.Item label="IOL" name="leftIOL" className="mb-0">
                  <Input value={assessment.rightVa} />
                </Form.Item>

                <Form.Item label="Sub" name="leftSub" className="mb-0">
                  <Input value={assessment.rightVa} />
                </Form.Item>
                {/* Add more fields as necessary */}
              </div>
            </div>
          </div>
          <div className="col-span-6 mt-7">
            <Form.Item label="Notes" name="note" className="h-full">
              <TextArea rows={8} value={assessment.note} />
            </Form.Item>
          </div>
        </div>

        {/* Third Row */}
        <div className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-8 border-2 border-gray-200 p-4 mb-4">
            <div className="bg-black text-white font-semibold text-sm text-center mb-2">
              Prescription
            </div>

            <div className="grid grid-cols-12 gap-3">
              {/* Right Eye */}
              <div className="col-span-2">
                <label className="text-xs text-green-700 font-bold">
                  RE Sph
                </label>
                <div className="flex mt-2 gap-1">
                  <label htmlFor="rightDista" className="font-semibold text-xs">
                    Dista:
                  </label>
                  <Select
                    className="form-select h-6 w-full"
                    name="rightDista"
                    id="rightDista"
                  >
                    {distaOptions.map((dista, index) => (
                      <Select.Option key={index} value={dista}>
                        {dista}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
                <div className="flex mt-2 gap-1">
                  <label htmlFor="rightAdd" className="font-semibold text-xs">
                    Add:
                  </label>
                  <Select
                    className="form-select h-6 w-full"
                    name="rightAdd"
                    id="rightAdd"
                  >
                    {addOptions.map((add, index) => (
                      <Select.Option key={index} value={add}>
                        {add}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
                <div className="flex mt-2 gap-1">
                  <label
                    htmlFor="prescriptionRightVA"
                    className="font-semibold text-xs"
                  >
                    VA:
                  </label>
                  <Input
                    type="text"
                    className="form-control h-6"
                    id="prescriptionRightVA"
                    name="prescriptionRightVA"
                  />
                </div>
                <div className="flex mt-2 gap-1">
                  <label htmlFor="NPD" className="font-semibold text-xs">
                    N.PD:
                  </label>
                  <Input
                    type="text"
                    className="form-control h-6"
                    id="NPD"
                    name="NPD"
                  />
                </div>
                <div className="flex mt-2 gap-1">
                  <label htmlFor="rightMPD" className="font-semibold text-xs">
                    M.PD:
                  </label>
                  <Input
                    type="text"
                    className="form-control h-6"
                    id="rightMPD"
                    name="rightMPD"
                  />
                </div>
              </div>

              {/* Cylinder */}
              <div className="col-span-2 ">
                <label className="text-xs text-green-700 font-bold">Cyl</label>
                <div>
                  <Select
                    className="form-select h-6 w-full"
                    name="rightCyl"
                    id="rightCyl"
                  >
                    {cylOptions.map((cyl, index) => (
                      <Select.Option key={index} value={cyl}>
                        {cyl}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              </div>

              {/* Axis */}
              <div className="col-span-2">
                <label className="text-xs text-green-700 font-bold">Axis</label>
                <Input
                  type="text"
                  className="form-control h-6"
                  id="rightAxis"
                  name="rightAxis"
                />
              </div>

              {/* Left Eye */}
              <div className="col-span-2">
                <label className="text-xs text-green-700 font-bold">
                  LE Sph
                </label>
                <div className="mt-2">
                  {/* <Select
                    className="form-select h-6 w-full"
                    name="leftDista"
                    id="leftDista"
                  >
                    <Option value="100">100</Option>
                    <Option value="200">200</Option>
                    <Option value="300">300</Option>
                  </Select> */}
                  <Select
                    className="form-select h-6 w-full"
                    name="leftDista"
                    id="leftDista"
                  >
                    {distaOptions.map((dista, index) => (
                      <Select.Option key={index} value={dista}>
                        {dista}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
                <div className="mt-2">
                  {/* <Select
                    className="form-select h-6 w-full"
                    name="leftAdd"
                    id="leftAdd"
                  >
                    <Option value="100">100</Option>
                    <Option value="200">200</Option>
                    <Option value="300">300</Option>
                  </Select> */}

                  <Select
                    className="form-select h-6 w-full"
                    name="leftAdd"
                    id="leftAdd"
                  >
                    {addOptions.map((add, index) => (
                      <Select.Option key={index} value={add}>
                        {add}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
                <div className="mt-2">
                  <Input
                    type="text"
                    className="form-control h-6"
                    id="prescriptionLeftVa"
                    name="prescriptionLeftVa"
                  />
                </div>
                <div className="flex mt-2 gap-1">
                  <label htmlFor="leftDpd" className="font-semibold text-xs">
                    D.PD:
                  </label>
                  <Input
                    type="text"
                    className="form-control h-6"
                    id="leftDpd"
                    name="leftDpd"
                  />
                </div>
                <div className="mt-2">
                  <Input
                    type="text"
                    className="form-control h-6"
                    id="leftMpd"
                    name="leftMpd"
                  />
                </div>
              </div>

              {/* Cylinder (Left Eye) */}

              <div className="col-span-2 ">
                <label className="text-xs text-green-700 font-bold">Cyl</label>
                <div>
                  {/* <Select
                    className="form-select h-6 w-full"
                    name="leftCyl"
                    id="leftCyl"
                  >
                    <Option value="100">100</Option>
                    <Option value="200">200</Option>
                    <Option value="300">300</Option>
                  </Select> */}
                  <Select
                    className="form-select h-6 w-full"
                    name="leftCyl"
                    id="leftCyl"
                  >
                    {cylOptions.map((cyl, index) => (
                      <Select.Option key={index} value={cyl}>
                        {cyl}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              </div>

              {/* Axis (Left Eye) */}
              <div className="col-span-2">
                <label className="text-xs text-green-700 font-bold">Axis</label>
                <Input
                  type="text"
                  className="form-control h-6"
                  id="leftAxis"
                  name="leftAxis"
                />
                <div className="flex gap-1 mt-6">
                  <label className="text-xs font-semibold">SH</label>
                  <Input
                    type="text"
                    className="form-control h-6"
                    id="sh"
                    name="prescriptionSh"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-4 gap-2 p-4 border-2 border-gray-200 mb-4">
            {/* <Typography.Title level={4} className="text-center text-xs font-medium mb-2">
        Tested By
      </Typography.Title> */}

            <Form layout="vertical">
              {/* Tested By */}
              <Form.Item
                name="tested"
                label={<span className="text-xs font-medium">Tested By</span>}
              >
                <Select className="h-6" id="tested" name="tested">
                  <Option value="100">100</Option>
                  <Option value="200">200</Option>
                  <Option value="300">300</Option>
                </Select>
              </Form.Item>

              <div className="flex gap-4 mt-4">
                {/* Next Visit */}
                <Form.Item
                  name="nextvisit"
                  label={
                    <span className="text-xs font-medium">Next Visit</span>
                  }
                >
                  <DatePicker className="h-6" id="nextvisit" name="nextvisit" />
                </Form.Item>

                {/* Due Date */}
                <Form.Item
                  name="dueDate"
                  label={<span className="text-xs font-medium">Due Date</span>}
                >
                  <DatePicker className="h-6" id="dueDate" name="dueDate" />
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>

        <Space size="middle">
          <Button
            type="primary"
            htmlType="submit"
            className="w-32"
            onClick={() => {
              navigate("/custom-register");
            }}
          >
            Patient Register
          </Button>
          <Button type="primary" htmlType="submit" className="w-32">
            Save
          </Button>
          <Button type="default" htmlType="submit" className="w-32">
            View PDF
          </Button>
          <Button
            type="default"
            className="w-32 bg-yellow-500 text-white"
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button
            type="default"
            htmlType="submit"
            className="w-32 text-red-500 border-2 border-red-500"
          >
            Delete
          </Button>
        </Space>
      </Form>
    </div>
  );
};

export default Prescription;
