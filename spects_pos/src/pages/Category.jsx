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

  const handleSave = (values) => {
    setLoading(true);
    const data = {
      code: values.categoryCode,
      categoryName: values.category,
    };

    console.log("data",data);
    

    fetchAction({
      query: `v1.0/category/add`,
      params: data,
      method: "get",
    });

    setLoading(false);
  };

  useEffect(() => {
    if (fetchData) {
      if (fetchData.success === true) {
        // navigate("/workspace/subscription-plans");
        notifySuccess("Branch Saved Successfully!");
      } else {
        notifyError(fetchData.message);
      }
    }
  }, [fetchData, fetchError]);

  const openNotification = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const handleSearch = async (values) => {
    const { keyword } = values;

    if (!keyword) {
      openNotification("warning", "Keyword should not be Empty..!");
      return;
    }

    try {
      const response = await axios.post("/api/searchCategory", { keyword });
      const { data } = response;
      if (data.length === 0) {
        openNotification("warning", "No results found..!");
      } else {
        setCategories(data);
      }
    } catch (error) {
      openNotification("error", "Something went wrong..!");
    }
  };



  // const handleSave = async (values) => {
  //   const { categoryCode, category } = values;

  //   if (!categoryCode || !category) {
  //     openNotification("warning", "Input Should not be Empty..!");
  //     return;
  //   }

  //   try {
  //     await axios.post("/api/saveCategory", {
  //       id: categoryCode,
  //       name: category,
  //     });
  //     openNotification("success", "Category Saved Successfully..!");
  //     form.resetFields();
  //     setCategories([]);
  //   } catch (error) {
  //     openNotification("error", "Something went wrong..!");
  //   }
  // };

  const handleUpdate = async (values) => {
    // const { categoryCode, category } = values;

    // if (!categoryCode || !category) {
    //   openNotification("warning", "Input Should not be Empty..!");
    //   return;
    // }

    // try {
    //   await axios.post("/api/updateCategory", {
    //     id: categoryCode,
    //     name: category,
    //   });
    //   openNotification("success", "Category Updated Successfully..!");
    //   form.resetFields();
    //   setCategories([]);
    // } catch (error) {
    //   openNotification("error", "Something went wrong..!");
    // }
  };

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
      categoryCode: record.id,
      category: record.name,
    });
    setSelectedCategory(record);
  };

  return (
    <div className="w-full  items-center justify-center p-4 ">
      <div className=" w-full bg-gray-200 justify-center rounded-xl shadow-xl p-4">
        <div className="mb-2 flex justify-between items-center">
          <h1 className="text-md font-semibold">
            Category <span className="text-red-500">Master</span>
          </h1>
          <Form form={form} layout="inline" onFinish={handleSearch}>
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
              />
            </Form.Item>
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
              <Input className="w-1/4" />
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
              onClick={() => form.resetFields()}
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
