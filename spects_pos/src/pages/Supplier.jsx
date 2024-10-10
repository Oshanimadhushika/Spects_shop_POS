import React, { useEffect, useState } from "react";
import { Input, Button, Form, message, Modal, Table } from "antd";
import "tailwindcss/tailwind.css";
import axios from "axios";
import {
  SearchOutlined,
  SaveOutlined,
  DeleteOutlined,
  EditOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import useFetch from "../hooks/useFetch";
import useNotification from "../hooks/useNotification";

const Supplier = () => {
  const [form] = Form.useForm();
  const [supplierData, setSupplierData] = useState(null);
  const { fetchData, fetchAction, fetchError, fetchLoading } = useFetch();
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

  const [loading, setLoading] = useState(false);
  const { notifyError, notifySuccess } = useNotification();
  const [isModalVisible, setIsModalVisible] = useState(false);
    const [originalValues, setOriginalValues] = useState(null);
    const [supplierId, setSupplierId] = useState(null);


  // console.log("success1",fetchData?.status);

  const handleSave = (values) => {
    setLoading(true);
    const data = {
      code: values.code,
      name: values.name,
      address: values.address,
      mobile: values.teleMobile,
      email: values.email,
      bank: values.bank,
      accNo: values.accNum,
      // openingBalance: "500000",
      refName: values.refName,
      refMobile: values.refMobile,
      userName: "oshani",
    };

    console.log("data", data);

    fetchAction({
      query: `v1.0/supplier/add`,
      body: data,
      // method: "get",
    });

    // console.log("fetchDAta", fetchData);

    setLoading(false);
  };

  useEffect(() => {
    if (fetchData) {
      if (fetchData.success === true) {
        //  console.log("success",fetchData?.status);

        notifySuccess("", fetchData?.status);
        // message.success(fetchData?.status);
        form.resetFields();
      } else {
        notifyError(fetchData.data);
      }
    }
  }, [fetchData, fetchError]);

  const handleSearch = async (values) => {
    console.log("handle search");

    const data = {
      searchKey: values.keyword,
    };

    // console.log("data", data);

    fetchSearch({
      query: `v1.0/supplier`,
      params: data,
      method: "get",
    });

   
  };

  useEffect(() => {
    if (fetchSearchData) {
      if (fetchSearchData.success === true) {
        setSupplierData(fetchSearchData.supplierlist);
        setIsModalVisible(true);
        // form.setFieldsValue(fetchSearchData.supplierlist);

        // console.log("suppliers", fetchSearchData.supplierlist);

      } else {
        notifyError(fetchSearchData.data);
      }
    }
  }, [fetchSearchData, fetchSearchError]);


  const handleRowClick = (record) => {
    console.log("Record clicked:", record);

    form.setFieldsValue({
      date: record.localDateTime ? record.localDateTime.split('T')[0] : '',
      code: record.code,
      name: record.name,
      address: record.address,
      bank:record.bank,
      teleMobile: record.mobile,
      email: record.email,
      accNum: record.accNo,
      refName: record.refName,
      refMobile: record.refMobile
    });
    // form.setFieldsValue(formValues);
    // form.setFieldsValue(record); 
    setSupplierId(record.supplierId)
    setOriginalValues(record);
    setIsModalVisible(false); 
  };


  const handleUpdate = async (values) => {
    const data = {
      supplierId:supplierId,
      code: values.code,
      name: values.name,
      address: values.address,
      mobile: values.teleMobile,
      email: values.email,
      bank: values.bank,
      accNo: values.accNum,
      // openingBalance: "500000",
      refName: values.refName,
      refMobile: values.refMobile,
      userName: "oshani",
    };

    console.log("data", data);

    fetchUpdate({
      query: `v1.0/supplier/update`,
      body: data,
      method: "put",
    });

    // console.log("fetchDAta", fetchData);

    setLoading(false);

  };

  useEffect(() => {
    if (fetchUpdateData) {
      if (fetchUpdateData.success === true) {
        //  console.log("success",fetchData?.status);

        notifySuccess("", fetchUpdateData?.status);
        // message.success(fetchData?.status);
        form.resetFields();
      } else {
        notifyError(fetchUpdateData.data);
      }
    }
  }, [fetchUpdateData, fetchUpdateError]);


  const handleDelete = async (values) => {
    try {
      const response = await axios.post("/api/supplier/delete", {
        code: values.code,
      });
      if (response.data.success) {
        message.success("Deleted successfully!");
        form.resetFields();
      } else {
        message.error("Something went wrong!");
      }
    } catch (error) {
      message.error("Error deleting supplier!");
    }
  };

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Bank",
      dataIndex: "bank",
      key: "bank",
    },
    {
      title: "Account No.",
      dataIndex: "accNo",
      key: "accNo",
    },
    // {
    //   title: "Opening Balance",
    //   dataIndex: "openingBalance",
    //   key: "openingBalance",
    //   render: (value) => `$${value.toLocaleString()}`,
    // },
    {
      title: "Ref Name",
      dataIndex: "refName",
      key: "refName",
    },
    {
      title: "Ref Mobile",
      dataIndex: "refMobile",
      key: "refMobile",
    },
  ];

  const handleSubmit = () => {
    form
      .validateFields() // Validate the fields
      .then((values) => {
        if (originalValues) {
          // If original values exist, call the update function
          handleUpdate(values);
        } else {
          // If no original values, call the save function
          handleSave(values);
        }
      })
      .catch((errorInfo) => {
        console.log('Validation Failed:', errorInfo);
      });
  };

  return (
    <div className="w-full  items-center justify-center p-4 ">
      <div className=" w-full bg-gray-200 justify-center rounded-xl shadow-xl p-4">
        <div className="mb-2 flex justify-between items-center">
          <h1 className="text-md font-semibold">
            Supplier <span className="text-red-500">Master</span>
          </h1>
          <Form  layout="inline" onFinish={handleSearch}>
            <Form.Item name="keyword">
              <Input
                placeholder="Search..."
                className="rounded-full shadow-xl"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SearchOutlined />}
                // onClick={handleSearch}
              />
            </Form.Item>
          </Form>
        </div>

        <Form
          form={form}
          // onFinish={handleSave}
          className="space-y-4"
          requiredMark={false}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Form.Item label="Date" name="date" rules={[{ required: true }]}>
              <Input type="date" />
            </Form.Item>
            <Form.Item label="Code" name="code" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </div>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true }]}
          >
            <Input className="w-1/3" />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Form.Item
              label="Telephone (Mobile)"
              name="teleMobile"
              rules={[{ required: true }]}
            >
              <Input type="tel" />
            </Form.Item>
            <Form.Item
              label="Telephone (Land)"
              name="teleLand"
              rules={[{ required: true }]}
            >
              <Input type="tel" />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input type="email" />
            </Form.Item>
          </div>

          {/* ============================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Form.Item
            label="Bank "
            name="bank"
            rules={[{ required: true }]}
          >
            <Input className="" />
          </Form.Item>
            <Form.Item
            label="Bank Account No"
            name="accNum"
            rules={[{ required: true }]}
          >
            <Input className="" />
          </Form.Item>
          </div>

        

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Ref Name"
              name="refName"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Ref Phone No"
              name="refMobile"
              rules={[{ required: true }]}
            >
              <Input type="tel" />
            </Form.Item>
          </div>

          <div className="flex justify-end space-x-2 w-2/3 items-end">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-600 text-white w-1/4"
              onClick={handleSubmit}

            >
              {/* Submit */}
              {originalValues ? 'Update' : 'Submit'}
            </Button>
            {/* <Button
              type="primary"
              htmlType="submit"
              className="bg-green-600 text-white w-1/4"
              onClick={handleUpdateClick}
            >
              Update
            </Button> */}
            <Button
              onClick={() => form.resetFields()}
              className="bg-yellow-500 text-white w-1/4"
            >
              Clear
            </Button>
            <Button
              type="primary"
              danger
              onClick={handleDelete}
              className="bg-red-500 text-white w-1/4"
            >
              Delete
            </Button>
            <Button
              type="primary"
              onClick={() => (window.location.href = "/")}
              className="bg-black text-white w-1/4"
            >
              Exit
            </Button>
          </div>
        </Form>

         <Modal
          title="Select Supplier"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null} 
          width={800} 
        >
          <Table
            columns={columns}
            dataSource={supplierData}
            rowKey="supplierId"
            onRow={(record) => ({
              onClick: () => handleRowClick(record), 
            })}
            pagination={false} 
            scroll={{ x: 1200 }}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Supplier;
