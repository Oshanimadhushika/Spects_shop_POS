import React, { useEffect, useState } from "react";
import { Input, Button, Form, Table, notification } from "antd";
import {
  SearchOutlined,
  SaveOutlined,
  DeleteOutlined,
  EditOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import axios from "axios";
import useFetch from "../hooks/useFetch";
import useNotification from "../hooks/useNotification";

const Category = () => {
  const [form] = Form.useForm();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { fetchData, fetchAction, fetchError, fetchLoading } = useFetch();

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

  useEffect(() => {
    fetchnextID();
    handleSearch({ keyword: "" });
  }, []);

  // get nextId
  const fetchnextID = (values) => {
    setLoading(true);
    // const data = {
    //   code: values.categoryCode,
    //   categoryName: values.category,
    // };

    // console.log("data",data);

    fetchIdAction({
      query: `v1.0/category/next-id`,
      // params: data,
      method: "get",
    });

    setLoading(false);
  };

  useEffect(() => {
    if (fetchId) {
      if (fetchId.status === true) {
        setNextId(fetchId.message);
        form.setFieldsValue({ categoryCode: fetchId.message });
      } else {
        notifyError("Cannot find the ID..!");
      }
    }
  }, [fetchId]);

  // Add category
  const handleSave = (values) => {
    setLoading(true);
    const data = {
      id: nextId,
      name: values.category,
    };

    fetchAction({
      query: `v1.0/category/add`,
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
        setSelectedCategory(null);
        fetchnextID();
      } else {
        notifyError(fetchData.message);
      }
    }
  }, [fetchData, fetchError]);

  // search
  const handleSearch = async (values) => {
    const searchKey = values.keyword ? values.keyword : "";

    const data = {
      searchKey,
    };

    fetchSearch({
      query: `v1.0/category`,
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
        setCategories(fetchSearchData.list);
                fetchnextID();

      } else {
        notifyError("Error Fetching Data..!");
      }
    }
  }, [fetchSearchData, fetchSearchError]);

  // update data

  const handleUpdate = async (values) => {
    setLoading(true);
    const data = {
      id: values.categoryCode,
      name: values.category,
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
        setSelectedCategory(null);
        fetchnextID();
      } else {
        notifyError(fetchUpdateData.message);
      }
    }
  }, [fetchUpdateData, fetchError]);

  // delete data
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

  // rowclick and set form data
  const handleRowClick = (record) => {
    form.setFieldsValue({
      categoryCode: record.id,
      category: record.name,
    });
    setSelectedCategory(record);
  };

  const handleInputChange = (e) => {
    const keyword = e.target.value;

    handleSearch({ keyword });
    fetchnextID();

  };
  return (
    <div className="w-full  items-center justify-center p-4 ">
      <div className=" w-full bg-gray-200 justify-center rounded-xl shadow-xl p-4">
        <div className="mb-2 flex justify-between items-center">
          <h1 className="text-md font-semibold">
            Category <span className="text-red-500">Master</span>
          </h1>
          <Form layout="inline" onFinish={handleSearch}>
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
          onFinish={selectedCategory ? handleUpdate : handleSave}
          requiredMark={false}
        >
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item label="Code:" name="categoryCode" rules={[{ required: true, message: 'Please input the Code!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Category:" name="category" rules={[{ required: true, message: 'Please input the Category!' }]}>
            <Input />
          </Form.Item>
        </div> */}

          <div className="flex flex-col gap-4">
            <Form.Item
              label="Code:"
              name="categoryCode"
              rules={[{ required: true, message: "Please input the Code!" }]}
            >
              <Input className="w-1/4" readOnly value={nextId} />
            </Form.Item>
            <Form.Item
              label="Category:"
              name="category"
              rules={[
                { required: true, message: "Please input the Category!" },
              ]}
            >
              <Input className="w-1/4" />
            </Form.Item>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              className="bg-blue-600"
            >
              {selectedCategory ? "Update" : "Submit"}
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
                fetchnextID();
                setSelectedCategory(null);
              }}
              icon={<ClearOutlined />}
              className="bg-yellow-500"
            >
              Clear
            </Button>
            <Button
              danger
              onClick={handleDelete}
              icon={<DeleteOutlined />}
              className="bg-red-500"
            >
              Delete
            </Button>
          </div>
        </Form>

        <div className="max-h-44 overflow-y-auto mt-4">
          <Table
            dataSource={categories}
            columns={[
              { title: "Code", dataIndex: "id", key: "id" },
              { title: "Category", dataIndex: "name", key: "name" },
            ]}
            rowKey="id"
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
            scroll={{ x: "max-content" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Category;
