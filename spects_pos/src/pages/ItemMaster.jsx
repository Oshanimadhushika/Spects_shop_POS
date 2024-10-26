import React, { useState, useEffect, useContext } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Table,
  message,
  Row,
  Col,
  Modal,
} from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import useNotification from "../hooks/useNotification";
import useFetch from "../hooks/useFetch";
import { DataContext } from "../context/DataContext";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const ItemMaster = () => {
  const [form] = Form.useForm();
  // const [departments, setDepartments] = useState([]);
  // const [categories, setCategories] = useState([]);
  // const [suppliers, setSuppliers] = useState([]);
  const [lastItemCode, setLastItemCode] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

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

  const {
    fetchData: fetchDeleteData,
    fetchAction: fetchDelete,
    fetchError: fetchDeleteError,
  } = useFetch();

  const [loading, setLoading] = useState(false);
  const { notifyError, notifySuccess } = useNotification();
  const [itemData, setItemData] = useState(null);
  const { branches, departments, categories, suppliers} = useContext(DataContext);

  useEffect(() => {
    handleSearch({ keyword: "" });
  }, []);

  // search item
  const handleSearch = async (values) => {
    const searchKey = values.keyword ? values.keyword : "";

    const data = {
      searchKey,
    };

    fetchSearch({
      query: `v1.0/item`,
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
        setItemData(fetchSearchData.itemList);
        // console.log("item dta",itemData);
        
      } else {
        notifyError(fetchSearchData.data);
      }
    }
  }, [fetchSearchData, fetchSearchError]);

  // save item
  const handleSubmit = async (values) => {
    const data = {
      itemCode: values.itemCode,
      barcode: values.barcode,
      description: values.description,
      branch:2,
      category: values.category,
      departmentId: values.department,
      supplierId: values.supplier,
      cost: values.cost,
      profit: values.profit,
      salePrice: values.salesPrice,
      discount: values.discountRs,
      wholesalePrice: values.wholesale,
      location: values.location,
    };

    // console.log("data", data);

    fetchAction({
      query: `v1.0/item/add`,
      body: data,
      // method: "get",
    });
  };

  useEffect(() => {
    if (fetchData) {
      if (fetchData.success === true) {
        notifySuccess(fetchData.status);
        handleSearch({ keyword: "" });
        form.resetFields();
        setSelectedItem(null);
      } else {
        notifyError(fetchData.message);
      }
    }
  }, [fetchData, fetchError]);

  // update item
  const handleUpdate = async (values) => {
    setLoading(true);
    const data = {
      itemCode: values.itemCode,
      barcode: values.barcode,
      description: values.description,
      branch:2,
      category: values.category,
      departmentId: values.department,
      supplierId: values.supplier,
      cost: values.cost,
      profit: values.profit,
      salePrice: values.salesPrice,
      discount: values.discountRs,
      wholesalePrice: values.wholesale,
      location: values.location,
    };

    fetchUpdate({
      query: `v1.0/item/update`,
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
        setSelectedItem(null);
        // fetchnextID();
      } else {
        notifyError(fetchUpdateData.message);
      }
    }
  }, [fetchUpdateData, fetchError]);

    // delete item
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
    

  const columns = [
    { title: "Code", dataIndex: "itemCode", key: "itemCode" },
    { title: "BarCode", dataIndex: "barcode", key: "barcode" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Department", dataIndex: ["department", "departmentName"], key: "department" }, 
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Supplier", dataIndex: ["supplierList",  "supName"], key: "supplier" },
    { title: "Cost", dataIndex: "cost", key: "cost" },
    { title: "Profit", dataIndex: "profit", key: "profit" },
    { title: "Sales Price", dataIndex: "salePrice", key: "salesPrice" }, 
    { title: "Discount Rs", dataIndex: "discount", key: "discount" },
    { title: "Wholesale", dataIndex: "wholesalePrice", key: "wholesale" }, 
    { title: "Location", dataIndex: "location", key: "location" },
  
  ];
  

  const onRowClick = (record) => {
    form.setFieldsValue({
      itemCode: record.itemCode,
      barcode: record.barcode,
      description: record.description,
      category: record.category,
      departmentId: record.department,
      supplierId: record.supplier,
      cost: record.cost,
      profit: record.profit,
      salesPrice: record.salePrice,
      discountRs: record.discount,
      wholesale: record.wholesalePrice,
      location: record.location,
    });
    setSelectedItem(record);
  };

  const handleInputChange = (e) => {
    const keyword = e.target.value;

    handleSearch({ keyword });
    // fetchnextID();
  };


  return (
    <div className="bg-white  p-4 w-full max-h-full ">
      <div className="grid grid-cols-12 gap-4  w-full">
        {/* Header Title */}
        <div className="col-span-10 flex items-center">
          <h1 className="text-3xl font-bold p-2 my-2">
            Item <span className="text-purple-500">Master</span>
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

      <div className="p-5 bg-gray-200 justify-center rounded-xl shadow-xl">
        <Form
          form={form}
          layout="vertical"
          onFinish={selectedItem ? handleUpdate : handleSubmit}
          requiredMark={false}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Item Code"
                name="itemCode"
                rules={[{ required: true, message: "Please input item code!" }]}
              >
                <Input
                  defaultValue={lastItemCode}
                  placeholder="Enter Item Code"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Barcode"
                name="barcode"
                rules={[{ required: true, message: "Please input barcode!" }]}
              >
                <Input placeholder="Enter Barcode" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please input description!" },
                ]}
              >
                <Input placeholder="Enter Description" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Department"
                name="department"
                rules={[
                  { required: true, message: "Please select department!" },
                ]}
              >
                <Select placeholder="Select department">
                  {departments.map((dept) => (
                    <Option key={dept.id} value={dept.id}>
                      {dept.departmentName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true, message: "Please select category!" }]}
              >
                <Select placeholder="Select category">
                  {categories.map((cat) => (
                    <Option key={cat.id} value={cat.id}>
                      {cat.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Supplier"
                name="supplier"
                rules={[{ required: true, message: "Please select supplier!" }]}
              >
                <Select placeholder="Select supplier">
                  {suppliers.map((sup) => (
                    <Option key={sup.supplierId} value={sup.supplierId}>
                      {sup.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Cost"
                name="cost"
                rules={[{ required: true, message: "Please input cost!" }]}
              >
                <Input
                  type="number"
                  placeholder="Enter  Cost "
                  className="w-1/2"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Profit"
                name="profit"
                rules={[{ required: true, message: "Please input profit!" }]}
              >
                <Input
                  type="number"
                  placeholder="Enter  Profit "
                  className="w-1/2"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Sales Price"
                name="salesPrice"
                rules={[
                  { required: true, message: "Please input sales price!" },
                ]}
              >
                <Input placeholder="Enter  Sales Price " className="w-1/2" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Discount Rs"
                name="discountRs"
                rules={[
                  { required: true, message: "Please input discount amount!" },
                ]}
              >
                <Input placeholder="Enter  Discount " className="w-1/2" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Wholesale"
                name="wholesale"
                rules={[{ required: true, message: "Please input wholesale!" }]}
              >
                <Input placeholder="Enter  Wholesale " className="w-1/2" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Location"
                name="location"
                rules={[{ required: true, message: "Please input location!" }]}
              >
                <Input placeholder="Enter  Location " className="w-1/2" />
              </Form.Item>
            </Col>
          </Row>

          {/* <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Maximum Stock Quantity"
                name="maxStockQty"
                rules={[
                  {
                    required: true,
                    message: "Please input maximum stock quantity!",
                  },
                ]}
              >
                <Input placeholder="Enter  Maximum stock quantity " className="w-1/2"/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Minimum Stock Quantity"
                name="minStockQty"
                rules={[
                  {
                    required: true,
                    message: "Please input minimum stock quantity!",
                  },
                ]}
              >
                <Input placeholder="Enter  minimum stock quantity " className="w-1/2"/>
              </Form.Item>
            </Col>
          </Row> */}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="mr-2 bg-purple-500 hover:bg-blue-500 text-white font-semibold p-3 rounded-md"
            >
              {selectedItem ? "Update" : "Submit"}
            </Button>
            <Button
              type="default"
              onClick={() => {
                form.resetFields();
                // fetchnextID();
                setSelectedItem(null);
              }}
              className="mr-2 border-2 border-blue-600 text-blue-600"
            >
              Clear
            </Button>
            <Button
              type="danger"
              onClick={handleDelete}
              className="mr-2 border-2 border-red-500 text-red-500"
            >
              Delete
            </Button>
          </Form.Item>
        </Form>

        <Table
          className="whitespace-nowrap text-xs "
          columns={columns}
          dataSource={itemData}
          rowKey="code"
          onRow={(record) => ({
            onClick: () => onRowClick(record),
          })}
          pagination={false} 
          scroll={{ x: 'max-content', y: '100%' }}        />

      
      </div>
    </div>
  );
};

export default ItemMaster;
