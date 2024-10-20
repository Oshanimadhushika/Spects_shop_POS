import React, { useEffect, useState } from "react";
import { Form, Input, Button, Table, message, Radio } from "antd";
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is imported
import {
  SearchOutlined,
  SaveOutlined,
  DeleteOutlined,
  EditOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import useNotification from "../hooks/useNotification";
import useFetch from "../hooks/useFetch";

const Department = () => {
  const [form] = Form.useForm();
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const { fetchData: fetchId, fetchAction: fetchIdAction } = useFetch();
  const { fetchData, fetchAction, fetchError, fetchLoading } = useFetch();

  const [nextId, setNextId] = useState(1);
  const [loading, setLoading] = useState(false);

  const { notifyError, notifySuccess } = useNotification();
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

  // fetch Next id
  useEffect(() => {
    fetchnextID();
    handleSearch({ keyword: "" });
  }, []);

  const fetchnextID = (values) => {
    setLoading(true);

    fetchIdAction({
      query: `v1.0/department/next-id`,
      // params: data,
      method: "get",
    });

    setLoading(false);
  };

  useEffect(() => {
    if (fetchId) {
      if (fetchId.status === true) {
        setNextId(fetchId.message);
        form.setFieldsValue({ departmentCode: fetchId.message });
      } else {
        notifyError(fetchData.message);
      }
    }
  }, [fetchId]);

  const handleSave = (values) => {
    setLoading(true);
    const data = {
      id: nextId,
      name: values.department,
    };

    fetchAction({
      query: `v1.0/department/add`,
      body: data,
      // method: "get",
    });

    setLoading(false);
  };

  useEffect(() => {
    if (fetchData) {
      if (fetchData.status === true) {
        notifySuccess("Department Saved Successfully!");
        handleSearch({ keyword: "" });
        form.resetFields();
        setSelectedDepartment(null);
        fetchnextID();
      } else {
        notifyError(fetchData.message);
      }
    }
  }, [fetchData, fetchError]);

  const handleSearch = async (values) => {
    const searchKey = values.keyword ? values.keyword : "";

    const data = {
      searchKey,
    };
    // console.log("data", data);
    fetchSearch({
      query: `v1.0/department`,
      params: data,
      method: "get",
    });

    if (!searchKey) {
      form.resetFields();
    }
  };

  useEffect(() => {
    if (fetchSearchData) {
      if (fetchSearchData.success === true) {
        setDepartments(fetchSearchData.list);
        // form.setFieldsValue(fetchSearchData.supplierlist);

        // console.log("suppliers", fetchSearchData.supplierlist);
      } else {
        notifyError(fetchSearchData.data);
      }
    }
  }, [fetchSearchData, fetchSearchError]);

  const handleUpdate = async (values) => {
    setLoading(true);
    const data = {
      departmentId: values.departmentCode,
      departmentName: values.department,
    };

    fetchUpdate({
      query: `v1.0/category/update`,
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
        setSelectedDepartment(null);

        fetchnextID();
      } else {
        notifyError(fetchUpdateData.message);
      }
    }
  }, [fetchUpdateData, fetchError]);

  const handleDelete = async () => {
    // const { categoryCode } = form.getFieldsValue();
    // if (!categoryCode) {
    //   openNotification("warning", "Code should not be Empty..!");
    //   return;
    // }
    // try {
    //   await axios.post("/api/deleteCategory", { id: categoryCode });
    //   openNotification("success", "Category Deleted Successfully..!");
    //   form.resetFields();
    //   setCategories([]);
    // } catch (error) {
    //   openNotification("error", "Something went wrong..!");
    // }
  };

  const handleRowClick = (record) => {
    form.setFieldsValue({
      departmentCode: record.id,
      department: record.departmentName,
    });
    setSelectedDepartment(record);
  };

  const handleInputChange = (e) => {
    const keyword = e.target.value;

    handleSearch({ keyword });
  };

  return (
    <div className="w-full  items-center justify-center p-4 ">
      <div className=" w-full bg-gray-200 justify-center rounded-xl shadow-xl p-4">
        <div className="mb-2 flex justify-between items-center">
          <h1 className="text-md font-semibold">
            Department <span className="text-red-500">Master</span>
          </h1>
          <Form form={form} layout="inline" onFinish={handleSearch}>
            <Form.Item name="keyword">
              <Input
                prefix={<SearchOutlined />}
                placeholder="Search..."
                className="rounded-full shadow-xl"
                onChange={handleInputChange}
              />
            </Form.Item>
            {/* <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SearchOutlined />}
              />
            </Form.Item> */}
          </Form>
        </div>

        <Form
          form={form}
          layout="vertical"
          className="mt-4"
          requiredMark={false}
          onFinish={selectedDepartment ? handleUpdate : handleSave}
        >
          <Form.Item
            name="departmentCode"
            label="Code"
            rules={[{ required: true, message: "Code is required" }]}
          >
            <Input className="w-1/4" readOnly value={nextId} />
          </Form.Item>
          <Form.Item
            name="department"
            label="Department"
            rules={[{ required: true, message: "Department name is required" }]}
          >
            <Input className="w-1/4" />
          </Form.Item>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              className="bg-blue-600"
            >
              {selectedDepartment ? "Update" : "Submit"}
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
                fetchnextID();
                setSelectedDepartment(null);
              }}
              icon={<ClearOutlined />}
              className="bg-yellow-500"
            >
              Clear
            </Button>
            {/* <Button
              type="primary"
              onClick={
                () => handleSave()
                //  handleSubmit("update")
              }
              disabled={!selectedDepartment}
            >
              Update
            </Button> */}
            <Button
              danger
              onClick={handleDelete}
              icon={<DeleteOutlined />}
              className="bg-red-500"
            >
              Delete
            </Button>
            {/* <Button
              type="link"
              onClick={() => (window.location.href = "index.php")}
            >
              Exit
            </Button> */}
          </div>
        </Form>

        <div className="mt-4 max-h-64 overflow-y-auto">
          <Table
            dataSource={departments}
            columns={[
              { title: "Code", dataIndex: "id", key: "id" },
              {
                title: "Department",
                dataIndex: "departmentName",
                key: "departmentName",
              },
            ]}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
            scroll={{ x: "max-content", y: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Department;
