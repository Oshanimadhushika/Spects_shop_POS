import React, { useContext, useEffect, useState } from "react";
import {
  Input as AntdInput,
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Radio,
  Table,
  Modal,
  notification,
  Space,
  Typography,
  Divider,
} from "antd";

import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
// import Refresh from "../assets/images/dashboard/refresh.png";
// import Prescription from "./Prescription";
// import Invoice from "./Invoice";
import moment from "moment";
import dayjs from "dayjs";
import useNotification from "../hooks/useNotification";
import useFetch from "../hooks/useFetch";
import {
  DeleteOutlined,
  DeleteRowOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ItemContext } from "../context/ItemContext";
import { SettingContext } from "../context/SettingContext";
import { UsersInLoggedBranchContext } from "../context/UsersInLoggedBranchContext";
import { VscLayoutPanelJustify } from "react-icons/vsc";

const { Text } = Typography;
// const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;

const PrescriptionInvoice = () => {
  // presInvo
  const [form] = Form.useForm();
  const [selectedOption, setSelectedOption] = useState("prescription");
  const [jobNumber, setJobNumber] = useState("");
  // const [officer, setOfficer] = useState("");
  // const [customerResult, setCustomerResult] = useState({});
  const [history, setHistory] = useState([]);
  // const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    fetchData: fetchSearchData,
    fetchAction: fetchSearch,
    fetchError: fetchSearchError,
  } = useFetch();
  const [customers, setCustomers] = useState([]);
  const { notifyError, notifySuccess } = useNotification();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { users } = useContext(UsersInLoggedBranchContext);
  const [selectedOfficer, setSelectedOfficer] = useState(null);

  console.log("officer",users);
  

    // prescription
    const [formPres] = Form.useForm();
    const [assessment, setAssessment] = useState({});
    // const [prescription, setPrescription] = useState({});
    const navigate = useNavigate();
    const { fetchData, fetchAction, fetchError, fetchLoading } = useFetch();
    const {
      fetchData: fetchNewJobNumber,
      fetchAction: fetchNewJobNumberAction,
      fetchError: fetchNewJobError,
    } = useFetch();
  
    const [loading, setLoading] = useState(false);

  const {
    fetchData: fetchJobHistoryData,
    fetchAction: fetchJobHistoryAction,
    fetchError: fetchJobHistoryError,
  } = useFetch();

    // invoice
    const [formInvo] = Form.useForm();
    const [formInvoKinds] = Form.useForm();
  
    const [formItem] = Form.useForm();
  
    // const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [payType, setPayType] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const {
      handleSearchItem,
      isItemTableVisible,
      setIsItemTableVisible,
      selectedItem,
      setSelectedItem,
    } = useContext(ItemContext);
  
    const { brands, coatings, designs, lensTypes, tints } =
      useContext(SettingContext);
    const [isPayVisible, setIsPayVisible] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const {
      fetchData: fetchInvoice,
      fetchAction: fetchInvoiceAction,
      fetchError: fetchInvoiceError,
    } = useFetch();


  const handleOfficerChange = (value) => {
    setSelectedOfficer(value);
    // console.log("Selected Officer ID:", value);
  };

  // search patient
  useEffect(() => {
    handleSearch({ keyword: "" });
  }, []);

  // search customer
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
      customerAddress: `${record.addressLine1}, ${record.addressLine2}, ${record.addressLine3}`,
      customerMobile: record.mobileNo,
    });
    setSelectedCustomer(record);
    setIsModalVisible(false);

    handleJobHistory(record.regNo);
  };

  // search input change
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
        return date ? moment(date).format("YYYY-MM-DD") : "N/A";
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

  // get customer history
  const handleJobHistory = async (cusId) => {
    const data = {
      customer: cusId,
    };

    fetchJobHistoryAction({
      query: `v1.0/prescription/get-by?`,
      params: data,
      method: "get",
    });
  };

  useEffect(() => {
    if (fetchJobHistoryData) {
      if (fetchJobHistoryData?.success === true) {
        setHistory(fetchJobHistoryData.list);
        //console.log("cus histoty", history);
      } else {
        notifyError("Error Fetching Data..!");
      }
    }
  }, [fetchJobHistoryData, fetchJobHistoryError]);

  const columns = [
    {
      title: "Job ID",
      dataIndex: "jobNo",
      key: "jobNo",
      width: 200,
      // onClick: handleRowClick,
    },
    {
      title: "Date",
      dataIndex: "rdate",
      key: "rdate",
      render: (date) => {
        return date ? moment(date).format("YYYY-MM-DD") : "N/A";
      },
    },
  ];

  const defaultData = [
    {
      jobNo: jobNumber,
      rdate: moment().format("YYYY-MM-DD"),
    },
  ];




// prescription save
  const handleSave = (values) => {
    const data = {
      branchUserId: selectedOfficer,
      jobNo: jobNumber,
      customerId: selectedCustomer.regNo,
      rdate: selectedCustomer.dateTime,
      code: selectedCustomer.loyaltyBarCode,
      name: selectedCustomer.regNoname,
      billDate: values.presdate,
      age: selectedCustomer.age,

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
      tested: values.tested,

      // prescription
      var: values.rightVA,
      val: values.leftVA,
      hmr: values.rightHM,
      hml: values.leftHM,
      phr: values.rightPH,
      phl: values.leftPH,
      suBr: values.rightSub,
      suBl: values.leftSub,
      loLr: values.rightIOL,
      loll: values.leftIOL,
      note2: values.note,

      pd: values.pd,
      sh: values.sh,
      nvDate: values.nvDate,
      nv: values.nv,
      varp: values.varp,
      valp: values.valp,
      tcdate: values.dueDate,
      dpd: values.dpd,
      mpDr: values.mpDr,
      mpDl: values.mpDl,
    };

    fetchAction({
      query: `v1.0/prescription/add`,
      body: data,
    });

    // setLoading(false);
  };

  useEffect(() => {
    if (fetchData) {
      if (fetchData.status === true) {
        notifySuccess(fetchData.message);
      } else {
        notifyError(fetchData.message);
      }
    }
  }, [fetchData]);




  // next job id
  const handleCreateJobNumber = async () => {
    setLoading(true);

    fetchNewJobNumberAction({
      query: `v1.0/prescription/next-job`,
      // params: data,
      method: "get",
    });

    setLoading(false);
  };

  useEffect(() => {
    if (fetchNewJobNumber) {
      if (fetchNewJobNumber.status === true) {
        setJobNumber(fetchNewJobNumber.message);
      } else {
        notifyError(fetchNewJobNumber.message);
      }
    }
  }, [fetchNewJobNumber]);

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

// invoice

// invoice save
const handleSaveInvoice = (values) => {
  const data = {
    invoiceNo:values.invoNo,
    localDateTime: values.invoDate,
    lensType: values.lensTypes,
    brand: values.brands,
    coating: values.coatings,
    tint: values.tints,
    design: values.designs,
    balance:1000.0,
    totalAmount: totalAmount,
    invoiceItemList: selectedItems.map((item) => ({
      itemCode: item.code,
      description: item.desc,
      salePrice: item.price,
      qty: item.qty,
      discount: item.disc,
      amount: item.amount,
    })),  
  };

  fetchInvoiceAction({
    query: `v1.0/invoice/add`,
    body: data,
  });

  if (fetchInvoice && fetchInvoice.status === true) {
    notifySuccess(fetchInvoice.message);
  } else {
    notifyError(fetchInvoice.message);
  }

  // setLoading(false);
};


  useEffect(() => {
    if (!searchKeyword && selectedItem) {
      formItem.setFieldsValue({
        itemCode: selectedItem.itemCode || "",
        barcode: selectedItem.barcode || "",
        description: selectedItem.description || "",
        discount: selectedItem.discount || "",
        salePrice: selectedItem.salePrice || "",
      });
    } else if (!searchKeyword) {
      formItem.setFieldsValue({
        itemCode: "",
        barcode: "",
        description: "",
        discount: "",
        salePrice: "",
      });
    } else if (searchKeyword && selectedItem) {
      formItem.setFieldsValue({
        itemCode: selectedItem.itemCode || "",
        barcode: selectedItem.barcode || "",
        description: selectedItem.description || "",
        discount: selectedItem.discount || "",
        salePrice: selectedItem.salePrice || "",
      });
    }
  }, [searchKeyword, selectedItem, formItem]);

  const handleSearchClick = () => {
    setIsItemTableVisible(true);
    handleSearchItem({ keyword: searchKeyword });
  };

// item click
  const handleAddItem = () => {
    formItem.validateFields().then((values) => {
      const newItem = {
        key: selectedItems.length + 1,
        code: values.itemCode || "",
        desc: values.description || "",
        price: parseFloat(values.salePrice || 0),
        qty: parseFloat(values.qty || 0),
        disc: parseFloat(values.discount || 0),
        amount:
          parseFloat(values.qty || 0) * parseFloat(values.salePrice || 0) -
          parseFloat(values.discount || 0),
      };

      setSelectedItems((prevItems) => [...prevItems, newItem]);

      // Calculate the total amount
      setTotalAmount((prevTotal) => prevTotal + newItem.amount);

      // Clear item form fields
      formItem.resetFields();
    });
  };

  // delete added item row
  const handleDeleteRow = (key) => {
    const updatedItems = selectedItems.filter((item) => item.key !== key);
    setSelectedItems(updatedItems);
  };

  // pay type
  const handlePaymentTypeChange = (e) => {
    setPayType(e.target.value);
    setIsPayVisible(true);
  };

  // content
  const renderModalContent = () => {
    switch (payType) {
      case "cash":
        return (
          <Form.Item label="Cash LKR">
            <Input className="w-full" placeholder="Enter cash amount" />
          </Form.Item>
        );
      case "cheque":
        return (
          <>
            <Form.Item label="Bank Name">
              <Input className="w-full" placeholder="Enter bank name" />
            </Form.Item>
            <Form.Item label="Cheque Number">
              <Input className="w-full" placeholder="Enter cheque number" />
            </Form.Item>
            <Form.Item label="Date">
              <Input
                type="date"
                className="w-full"
                placeholder="Enter cheque date"
              />
            </Form.Item>
            <Form.Item label="Amount">
              <Input className="w-full" placeholder="Enter amount" />
            </Form.Item>
          </>
        );
      case "cardOrTransfer":
        return (
          <>
            <Form.Item label="Account Number">
              <Input className="w-full" placeholder="Enter account number" />
            </Form.Item>
            <Form.Item label="Transfer Amount">
              <Input className="w-full" placeholder="Enter amount" />
            </Form.Item>
          </>
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "prescription":
        return (
          <div className="border-2 border-gray-300 bg-gray-200 p-4 mb-4 shadow-xl">
            <Typography.Title level={3}>Prescription</Typography.Title>
            <Form
              form={formPres}
              layout="vertical"
              onFinish={handleSave}
              className="space-y-4"
            >
              {/* First Row */}
              <div className="grid grid-cols-12 gap-2 mb-4">
                <Form.Item
                  className="col-span-2"
                  label="Pres Date"
                  name="presdate"
                >
                  <DatePicker className="w-full" />
                </Form.Item>
                <div className="col-span-2 flex items-center justify-center">
                  <span className="text-sm font-semibold whitespace-nowrap">
                    Job No:
                  </span>
                  <div className="border-2 border-gray-200 p-2 ml-2 w-full text-center text-2xl font-bold text-red-700 items-center">
                    {jobNumber}
                    {/* <p className="font-bold text-center text-red-600 text-2xl border border-gray-400 p-2 rounded-full"> {jobNumber}</p> */}
                  </div>
                </div>
                <div className="col-span-2 flex items-center">
                  <Button className="w-full" onClick={handleCreateJobNumber}>
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
                    </div>
                    <div>
                      <div className="text-xs text-green-700 font-bold">
                        Left Eye
                      </div>
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
                      <Form.Item className="flex mt-2 gap-1" name="rightDista">
                        <label
                          htmlFor="rightDista"
                          className="font-semibold text-xs"
                        >
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
                      </Form.Item>
                      <Form.Item className="flex mt-2 gap-1" name="rightAdd">
                        <label
                          htmlFor="rightAdd"
                          className="font-semibold text-xs"
                        >
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
                      </Form.Item>
                      <Form.Item className="flex mt-2 gap-1" name="rightVA">
                        <label
                          htmlFor="prescriptionRightVA"
                          className="font-semibold text-xs"
                        >
                          VA:
                        </label>
                        <Input
                          type="text"
                          className="form-control h-6"
                          id="rightVA"
                          name="rightVA"
                        />
                      </Form.Item>
                      <Form.Item className="flex mt-2 gap-1" name="rightNPD">
                        <label htmlFor="NPD" className="font-semibold text-xs">
                          N.PD:
                        </label>
                        <Input
                          type="text"
                          className="form-control h-6"
                          id="rightNPD"
                          name="rightNPD"
                        />
                      </Form.Item>
                      <Form.Item className="flex mt-2 gap-1" name="rightMPD">
                        <label
                          htmlFor="rightMPD"
                          className="font-semibold text-xs"
                        >
                          M.PD:
                        </label>
                        <Input
                          type="text"
                          className="form-control h-6"
                          id="rightMPD"
                          name="rightMPD"
                        />
                      </Form.Item>
                    </div>

                    {/* Cylinder */}
                    <Form.Item className="col-span-2 " id="rightCyl">
                      <label className="text-xs text-green-700 font-bold">
                        Cyl
                      </label>
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
                    </Form.Item>

                    {/* Axis */}
                    <Form.Item className="col-span-2" name="rightAxis">
                      <label className="text-xs text-green-700 font-bold">
                        Axis
                      </label>
                      <Input
                        type="text"
                        className="form-control h-6"
                        id="rightAxis"
                        name="rightAxis"
                      />
                    </Form.Item>

                    {/* Left Eye */}
                    <div className="col-span-2">
                      <label className="text-xs text-green-700 font-bold">
                        LE Sph
                      </label>
                      <Form.Item className="mt-2" name="leftDista">
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
                      </Form.Item>
                      <Form.Item className="mt-2" name="leftAdd">
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
                      </Form.Item>
                      <Form.Item className="mt-2" name="leftVa">
                        <Input
                          type="text"
                          className="form-control h-6"
                          id="leftVa"
                          name="leftVa"
                        />
                      </Form.Item>
                      <Form.Item className="flex mt-2 gap-1" name="leftDpd">
                        <label
                          htmlFor="leftDpd"
                          className="font-semibold text-xs"
                        >
                          D.PD:
                        </label>
                        <Input
                          type="text"
                          className="form-control h-6"
                          id="leftDpd"
                          name="leftDpd"
                        />
                      </Form.Item>
                      <Form.Item className="mt-2" name="leftMpd">
                        <Input
                          type="text"
                          className="form-control h-6"
                          id="leftMpd"
                          name="leftMpd"
                        />
                      </Form.Item>
                    </div>

                    {/* Cylinder (Left Eye) */}

                    <div className="col-span-2 ">
                      <Form.Item name="leftCyl">
                        <label className="text-xs text-green-700 font-bold">
                          Cyl
                        </label>
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
                      </Form.Item>
                    </div>

                    {/* Axis (Left Eye) */}
                    <div className="col-span-2">
                      <Form.Item name="leftAxis">
                        <label className="text-xs text-green-700 font-bold">
                          Axis
                        </label>
                        <Input
                          type="text"
                          className="form-control h-6"
                          id="leftAxis"
                          name="leftAxis"
                        />
                      </Form.Item>

                      <Form.Item className="flex gap-1 mt-6" name="leftSh">
                        <label className="text-xs font-semibold">SH</label>
                        <Input
                          type="text"
                          className="form-control h-6"
                          id="sh"
                          name="leftSh"
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>

                <div className="col-span-4 gap-2 p-4 border-2 border-gray-200 mb-4">
                  {/* <Typography.Title level={4} className="text-center text-xs font-medium mb-2">
              Tested By
            </Typography.Title> */}

                  {/* <Form layout="vertical"> */}
                  {/* Tested By */}
                  <Form.Item
                    name="tested"
                    label={
                      <span className="text-xs font-medium">Tested By</span>
                    }
                  >
                    {/* <Select className="h-6" id="tested" name="tested">
                        <Option value="100">100</Option>
                        <Option value="200">200</Option>
                        <Option value="300">300</Option>
                      </Select> */}
                    <Select
                      className="h-10"
                      placeholder="Select Officer"
                      onChange={handleOfficerChange}
                      value={selectedOfficer}
                    >
                      {users.map((officer) => (
                        <Option key={officer.id} value={officer.id}>
                          {officer.userName}
                        </Option>
                      ))}
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
                      <DatePicker
                        className="h-6"
                        id="nextvisit"
                        name="nvDate"
                      />
                    </Form.Item>

                    {/* Due Date */}
                    <Form.Item
                      name="dueDate"
                      label={
                        <span className="text-xs font-medium">Due Date</span>
                      }
                    >
                      <DatePicker className="h-6" id="dueDate" name="dueDate" />
                    </Form.Item>
                  </div>
                  {/* </Form> */}
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
                  onClick={() => {
                    formPres.resetFields();
                  }}
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
      case "invoice":
        return (
          <div className="border-2 border-gray-300 bg-gray-200 p-4 mb-4 shadow-xl">
            {/* <h3 className="text-lg font-bold mb-4"></h3> */}
            <Typography.Title level={3}>Invoice</Typography.Title>

            <Form
              form={formInvo}
              layout="vertical"
              onFinish={(values) => {
                const payload = {
                  invoiceNo: values.invoNo,
                  localDateTime: values.invoDate,
                  lensType: values.lensTypes,
                  brand: values.brands,
                  coating: values.coatings,
                  tint: values.tints,
                  design: values.designs,
                };
                console.log("Submitted payload:", payload);
                handleSaveInvoice(payload);
              }}           >
              <Form form={formInvoKinds} layout="vertical">
                <div className="grid grid-cols-12 gap-2 mb-4">
                  <Form.Item label="Invoice Date" className="col-span-2" name="invoDate">
                    <DatePicker className="w-full" />
                  </Form.Item>

                  <Form.Item label="Invoice No" className="col-span-2" name="invoNo">
                    <Input className="w-full" />
                  </Form.Item>

                  <Form.Item label="Lens Type" className="col-span-2" name="lensTypes">
                    <Select placeholder="Lens Type">
                      {lensTypes.map((value) => (
                        <Option key={value.id} value={value.id}>
                          {value.type}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item label="Brand" className="col-span-1" name="brands">
                    <Select placeholder="Brand">
                      {brands.map((value) => (
                        <Option key={value.id} value={value.id}>
                          {value.brandName}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item label="Coating" className="col-span-1" name="coatings">
                    <Select placeholder="Coating">
                      {coatings.map((value) => (
                        <Option key={value.id} value={value.id}>
                          {value.coatingName}
                        </Option>
                      ))}
                    </Select>{" "}
                  </Form.Item>

                  <Form.Item label="Tint" className="col-span-2" name="tints">
                    <Select placeholder="Tint">
                      {tints.map((value) => (
                        <Option key={value.id} value={value.id}>
                          {value.tintType}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item label="Design" className="col-span-2" name="designs">
                    <Select placeholder="Design">
                      {designs.map((value) => (
                        <Option key={value.id} value={value.id}>
                          {value.designType}
                        </Option>
                      ))}
                    </Select>{" "}
                  </Form.Item>

                  {/* <Form.Item className="col-span-2 ">
                    <Button
                      type="default"
                      className="w-full bg-yellow-400"
                      onClick={() => {
                        formInvoKinds.resetFields();
                      }}
                    >
                      Clear
                    </Button>
                  </Form.Item> */}

                  {/* <Form.Item className="col-span-3">
                    <Button
                      type="primary"
                      className="w-full"
                      onClick={handleAddItem}
                    >
                      Add
                    </Button>
                  </Form.Item> */}
                </div>
              </Form>

              <Form form={formItem}>
                <div className="grid grid-cols-12 gap-2 mb-4">
                  <Form.Item
                    name="keyword"
                    className="col-span-2 flex items-center mt-7"
                  >
                    <Input.Search
                      placeholder="Search Item"
                      className="w-full"
                      // onSearch={onSearch}
                      enterButton={<SearchOutlined />}
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      onSearch={handleSearchClick}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Item Code"
                    name="itemCode"
                    className="col-span-2"
                  >
                    <Input readOnly className="w-full" />
                  </Form.Item>

                  <Form.Item
                    label="Barcode"
                    name="barcode"
                    className="col-span-2"
                  >
                    <Input readOnly className="w-full" />
                  </Form.Item>

                  <Form.Item
                    label="Item Name"
                    name="description"
                    className="col-span-3"
                  >
                    <Input readOnly className="w-full" />
                  </Form.Item>

                  <Form.Item
                    label="Display On Bill"
                    name="displayOnBill"
                    className="col-span-3"
                  >
                    <Select className="w-full"></Select>
                  </Form.Item>

                  <Form.Item className="col-span-2 mt-4">
                    <Button
                      type="primary"
                      className="w-full"
                      onClick={handleAddItem}
                    >
                      Add Item
                    </Button>
                  </Form.Item>
                </div>

                <div className="grid grid-cols-12 gap-4 mb-4">
                  <div className="col-span-6 mt-2 gap-2">
                    <Form.Item name="qty" label="Quantity" className="mt-2">
                      <Input defaultValue={0} className="w-1/3" />
                    </Form.Item>

                    <Form.Item name="salePrice" label="Price" className="mt-2">
                      <Input defaultValue={0} className="w-1/3" />
                    </Form.Item>

                    <Form.Item
                      name="discount"
                      label="Discount"
                      className="mt-2"
                    >
                      <Input defaultValue={0} className="w-1/3" />
                    </Form.Item>

                    <Form.Item
                      name="discountAmount"
                      label="Discount Amount"
                      className="mt-2"
                    >
                      <Input defaultValue={0} className="w-1/3" />
                    </Form.Item>

                    <Form.Item name="amount" label="Amount" className="mt-2">
                      <Input defaultValue={0} className="w-1/3" />
                    </Form.Item>
                  </div>

                  <div className="col-span-6">
                    <div className="border-2 border-gray-200 p-4 mb-4">
                      <div className="mb-2">
                        <strong className="text-sm">Total</strong>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Bill Total Rs:</span>
                        <span className="font-semibold text-red-600">
                          {" "}
                          {totalAmount.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Discount:</span>
                        <span className="font-semibold text-red-600">0.00</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Payable:</span>
                        <span className="font-semibold text-red-600">0.00</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Paid:</span>
                        <span className="font-semibold text-red-600">0.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Due Balance:</span>
                        <span className="font-semibold text-red-600">0.00</span>
                      </div>
                    </div>

                    {/* <div className="bg-gray-300 p-4 rounded-md mb-4">
                      <Form.Item label="Cash LKR">
                        <Input className="w-full" />
                      </Form.Item>
                    </div> */}

                    <div className="bg-gray-300 p-4 rounded-md ">
                      <Form.Item label="Payment Type">
                        <Radio.Group
                          onChange={handlePaymentTypeChange}
                          value={payType}
                        >
                          <Radio value="cash">Cash</Radio>
                          <Radio value="cheque">Cheque</Radio>
                          <Radio value="cardOrTransfer">Card/Transfer</Radio>
                        </Radio.Group>
                      </Form.Item>

                      <Modal
                        title="Payment Details"
                        open={isPayVisible}
                        onCancel={() => {
                          setIsPayVisible(false);
                        }}
                        footer={[
                          <Button
                            key="cancel"
                            onClick={() => {
                              setIsPayVisible(false);
                            }}
                          >
                            Cancel
                          </Button>,
                          <Button key="submit" type="primary">
                            Submit
                          </Button>,
                        ]}
                      >
                        {renderModalContent()}
                      </Modal>
                    </div>
                  </div>
                </div>
              </Form>

              <div className="grid grid-cols-12 gap-3 mb-4">
                <div className="col-span-9">
                  <Table
                    dataSource={selectedItems}
                    columns={[
                      { title: "Item Code", dataIndex: "code", key: "code" },
                      { title: "Description", dataIndex: "desc", key: "desc" },
                      { title: "Price", dataIndex: "price", key: "price" },
                      { title: "Qty", dataIndex: "qty", key: "qty" },
                      { title: "Discount", dataIndex: "disc", key: "disc" },
                      { title: "Amount", dataIndex: "amount", key: "amount" },
                      {
                        // title: "Action",
                        key: "action",
                        render: (text, record) => (
                          <Button
                            type="link"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDeleteRow(record.key)}
                          />
                        ),
                      },
                    ]}
                    pagination={false}
                    scroll={{
                      x: "max-content",
                      y: selectedItems.length > 4 ? 300 : undefined,
                    }}
                    style={{ maxHeight: "400px", overflow: "auto" }}
                    // scroll={{ x: "max-content", y: "100%" }}
                  />
                </div>
                <div className="col-span-3 gap-1">
                  {/* <Button type="primary" className="w-full" htmlType="submit">
                    Submit
                  </Button> */}
                  <Button
                    type="primary"
                    className="bg-blue-600 text-white w-full"
                    htmlType="submit"
                    name="submit"
                    // onClick={() => {
                    //   navigate("/custom-register");
                    // }}
                    // onClick={handleSaveInvoice}
                  >
                    {/* Patient Register */}
                    Save Invoice
                  </Button>
                  <Button
                    type="default"
                    className="bg-white text-blue-700 border-2 border-blue-700 w-full"
                    htmlType="submit"
                    name="receiptPrint"
                  >
                    Print (Reci)
                  </Button>
                  <Button
                    type="default"
                    className="bg-white text-blue-700 border-2 border-blue-700 w-full"
                    htmlType="submit"
                    name="invoicePrint"
                  >
                    Print (Invo)
                  </Button>
                  <Button
                    type="default"
                    className="bg-white text-blue-700 border-2 border-blue-700 w-full"
                    htmlType="submit"
                    name="invPresPrint"
                  >
                    Invo + Presc
                  </Button>
                  <Button
                    type="default"
                    className="bg-black text-white w-full"
                    htmlType="submit"
                    name="sms"
                  >
                    SMS
                  </Button>
                  <Button
                    type="default"
                    className="bg-green-500 text-white w-full"
                    onClick={() => {
                      formInvo.resetFields();
                      formItem.resetFields();
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        );
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
              <AntdInput
                className="h-10 font-bold text-center text-md text-2xl"
                readOnly
              />
            </Form.Item>
            <Form.Item name="keyword">
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
                <Form.Item name="customerName">
                  <Text className="text-md font-bold uppercase text-green-600">
                    {form.getFieldValue("customerName")}
                  </Text>
                </Form.Item>
              </div>
              <Form.Item name="customerAddress">
                <Text className="text-sm font-bold uppercase text-blue-600">
                  {form.getFieldValue("customerAddress")}
                </Text>
              </Form.Item>
              <Form.Item name="customerMobile">
                <Text className="text-sm font-bold text-black">
                  {form.getFieldValue("customerMobile")}
                </Text>
              </Form.Item>
            </div>
          </div>

          <div className="col-span-2 p-2 border-2 border-gray-200 rounded-lg">
            <Form.Item name="jobNo">
              {/* <AntdInput
                className="h-10 text-green-600 font-bold"
                value= {jobNumber}
              /> */}

              <p className="font-bold text-center text-red-600 text-4xl border border-gray-400 p-2">
                {jobNumber}
              </p>
            </Form.Item>
            <Form.Item name="officer">
              <label className="font-bold text-xs">Officer</label>
              <Select
                className="h-10"
                placeholder="Select Officer"
                onChange={handleOfficerChange}
                value={selectedOfficer}
              >
                {users.map((officer) => (
                  <Option key={officer.id} value={officer.id}>
                    {officer.userName}
                  </Option>
                ))}
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
              </Select>
            </Form.Item>
          </div>

          <div className="flex col-span-4 gap-2 p-4">
            {/* {history.length > 0 && ( */}
            <Table
              className="font-bold"
              columns={columns}
              dataSource={history.length > 0 ? history : defaultData}
              pagination={false}
              bordered
              size="small"
              scroll={{ y: 400, x: "max-content" }}
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
