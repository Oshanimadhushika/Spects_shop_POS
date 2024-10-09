import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Table, message, Row, Col } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const { Option } = Select;

const ItemMaster = () => {
  const [form] = Form.useForm();
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [lastItemCode, setLastItemCode] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Fetch data for departments, categories, suppliers, and last item code
    const fetchData = async () => {
      //   try {
      //     const [deptRes, catRes, supRes, lastCodeRes] = await Promise.all([
      //       axios.get('/api/departments'),
      //       axios.get('/api/categories'),
      //       axios.get('/api/suppliers'),
      //       axios.get('/api/lastItemCode')
      //     ]);
      //     setDepartments(deptRes.data);
      //     setCategories(catRes.data);
      //     setSuppliers(supRes.data);
      //     setLastItemCode(lastCodeRes.data);
      //   } catch (error) {
      //     message.error('Failed to fetch data');
      //   }
    };

    fetchData();
  }, []);

  const handleSearch = async (values) => {
    // try {
    //   const res = await axios.post('/api/searchItems', { keyword: values.keyword });
    //   setItems(res.data);
    // } catch (error) {
    //   message.error('Search failed');
    // }
  };

  const handleSubmit = async (values) => {
    //     try {
    //       if (selectedItem) {
    //         await axios.post('/api/updateItem', values);
    //         message.success('Item updated successfully');
    //       } else {
    //         await axios.post('/api/saveItem', values);
    //         message.success('Item added successfully');
    //       }
    //       form.resetFields();
    //       setSelectedItem(null);
    //     } catch (error) {
    //       message.error('Operation failed');
    //     }
  };

  const handleDelete = async () => {
    // if (!selectedItem) {
    //   message.warning('Please select an item');
    //   return;
    // }
    //     try {
    //       await axios.post('/api/deleteItem', { itemCode: selectedItem.itemCode });
    //       message.success('Item deleted successfully');
    //       form.resetFields();
    //       setSelectedItem(null);
    //     } catch (error) {
    //       message.error('Delete failed');
    //     }
  };

  const columns = [
    { title: "Code", dataIndex: "code", key: "code" },
    { title: "BarCode", dataIndex: "barcode", key: "barcode" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Supplier", dataIndex: "supplier", key: "supplier" },
    { title: "Cost", dataIndex: "cost", key: "cost" },
    { title: "Profit", dataIndex: "profit", key: "profit" },
    { title: "Sales Price", dataIndex: "salesPrice", key: "salesPrice" },
    { title: "Discount Rs", dataIndex: "discountRs", key: "discountRs" },
    { title: "Wholesale", dataIndex: "wholesale", key: "wholesale" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "MaxStockQty", dataIndex: "maxStockQty", key: "maxStockQty" },
    { title: "MinStockQty", dataIndex: "minStockQty", key: "minStockQty" },
  ];

  const onRowClick = (record) => {
    form.setFieldsValue(record);
    setSelectedItem(record);
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
      <Form.Item>
        <Form layout="inline" onFinish={handleSearch}>
          <Form.Item name="keyword">
            <Input placeholder="Search..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Form>
      </Form.Item>

      <div className="p-5 bg-gray-200 justify-center rounded-xl shadow-xl">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Item Code"
                name="itemCode"
                rules={[{ required: true, message: "Please input item code!" }]}
              >
                <Input defaultValue={lastItemCode} placeholder="Enter Item Code"/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Barcode"
                name="barcode"
                rules={[{ required: true, message: "Please input barcode!" }]}
              >
                <Input placeholder="Enter Barcode"/>
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
                <Input placeholder="Enter Description"/>
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
                    <Option key={dept.id} value={dept.name}>
                      {dept.name}
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
                    <Option key={cat.id} value={cat.name}>
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
                    <Option key={sup.id} value={sup.name}>
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
                <Input type="number" placeholder="Enter  Cost " className="w-1/2"/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Profit"
                name="profit"
                rules={[{ required: true, message: "Please input profit!" }]}
              >
                <Input type="number" placeholder="Enter  Profit " className="w-1/2"/>
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
                <Input placeholder="Enter  Sales Price " className="w-1/2"/>
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
                <Input placeholder="Enter  Discount " className="w-1/2"/>
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
                <Input placeholder="Enter  Location " className="w-1/2"/>
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
            <Button type="primary" htmlType="submit" className="mr-2 bg-purple-500 hover:bg-blue-500 text-white font-semibold p-3 rounded-md">
              Submit
            </Button>
            <Button
              type="default"
              onClick={() => form.resetFields()}
              className="mr-2 border-2 border-blue-600 text-blue-600"
            >
              Clear
            </Button>
            <Button type="danger" onClick={handleDelete} className="mr-2 border-2 border-red-500 text-red-500">
              Delete
            </Button>
          </Form.Item>
        </Form>

        <Table
        className="whitespace-nowrap text-xs"
          columns={columns}
          dataSource={items}
          rowKey="code"
          onRow={(record) => ({
            onClick: () => onRowClick(record),
          })}
          scroll={{ x: 'max-content',y: '100%' }}
        />
      </div>
    </div>
  );
};

export default ItemMaster;
