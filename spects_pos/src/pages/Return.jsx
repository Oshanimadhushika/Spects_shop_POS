import React from 'react';
import { Button, Input, Table, Form, DatePicker } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
// import 'antd/dist/antd.css';

const { Item: FormItem } = Form;

const Return = () => {
  const [form] = Form.useForm();

  const clearForm = () => {
    form.resetFields();
  };

  const exit = () => {
    window.location.href = "index.php";
  };

  const creditNoteColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'No', dataIndex: 'no', key: 'no' },
    { title: 'Qty', dataIndex: 'qty', key: 'qty' },
    { title: '%', dataIndex: 'percent', key: 'percent' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: '', key: 'action' },
  ];

  const invoiceColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'No', dataIndex: 'no', key: 'no' },
    { title: 'Qty', dataIndex: 'qty', key: 'qty' },
    { title: 'Discount', dataIndex: 'discount', key: 'discount' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: '', key: 'action' },
  ];

  const data = [
    { key: '1', name: '001', no: 'Electronics', qty: '10', percent: '5%', price: '$100', amount: '$95' },
    { key: '2', name: '002', no: 'Clothing', qty: '15', percent: '10%', price: '$200', amount: '$180' },
  ];

  return (
    <div className=" bg-white p-4">
      <div className="grid grid-cols-12 gap-4  w-full">
        {/* Header Title */}
        <div className="col-span-10 flex items-center">
          <h1 className="text-3xl font-bold p-2 my-2">
            Sale <span className="text-purple-500">Return</span>
          </h1>
        </div>

        {/* Icon */}
        <div className="col-span-2 flex items-center justify-center text-center p-2">
          <Link to="/dashboard">
          
            <FaHome className="text-3xl cursor-pointer" />

          </Link>
        </div>

      
      </div>
      <div className="p-5 bg-gray-200 justify-center rounded-xl shadow-xl">
      <Form form={form} id="saleReturnForm" layout="vertical" >
        <div className="grid grid-cols-12 gap-4 p-4 border-2 border-gray-300 mb-2">
          {/* First Row */}
          <div className="col-span-12">
            <label className="form-label text-sm font-bold">Item</label>

            <div className="grid grid-cols-12 gap-4">
              <FormItem label="Credit Note No" className="col-span-2" name="creditNoteVal">
                <Input className="h-8" />
              </FormItem>

              <FormItem label="Our No:" className="col-span-1" name="ourNo">
                <Input className="h-8" required />
              </FormItem>

              <FormItem label="Date:" className="col-span-2" name="date">
                <DatePicker className="w-full h-8" format="YYYY-MM-DD" />
              </FormItem>

              <FormItem label="Invoice No:" className="col-span-1" name="invoiceNo">
                <Input className="h-8" required />
              </FormItem>

              <FormItem label="Customer:" className="col-span-4">
                <div className="flex gap-2">
                  <Input className="h-8" />
                  <Input className="h-8" />
                </div>
              </FormItem>

              <FormItem label="Net Invoice Value:" className="col-span-2" name="netInvoVal">
                <Input className="h-8" required />
              </FormItem>
            </div>

            <hr className="text-black font-bold my-4" />

            {/* Second Row */}
            <div className="grid grid-cols-12 gap-4">
              <FormItem label="Item No" className="col-span-2" name="itemNo">
                <Input className="h-8" required />
              </FormItem>

              <FormItem label="Description" className="col-span-2" name="description">
                <Input className="h-8" required />
              </FormItem>

              <FormItem label="Qty" className="col-span-1" name="qty">
                <Input className="h-8" />
              </FormItem>

              {/* <FormItem label="Disc" className="col-span-1" name="discount">
                <Input className="h-8" />
              </FormItem> */}

              <FormItem label="Price" className="col-span-2" name="price">
                <Input className="h-8" />
              </FormItem>

              <FormItem label="Discount" className="col-span-2" name="discount">
                <Input className="h-8" />
              </FormItem>

              <FormItem label="Amount" className="col-span-2" name="amount">
                <Input className="h-8" required />
              </FormItem>
            </div>
          </div>
        </div>

        {/* Credit Note Section */}
        <div className="grid grid-cols-12 gap-4 p-4 border-2 border-gray-300 mb-2">
          <div className="col-span-9">
            <label className="form-label text-sm font-bold">Credit Note</label>
            <Table
              className="max-h-32 overflow-y-auto text-xs"
              columns={creditNoteColumns}
              dataSource={data}
              pagination={false}
              size="small"
              bordered
            />
          </div>
          <FormItem label="Credit Note Value" className="col-span-3" name="creditNoteVal">
            <Input className="h-8" />
          </FormItem>
        </div>

        {/* Current Invoice Section */}
        <div className="grid grid-cols-12 gap-4 p-4 border-2 border-gray-300">
          <div className="col-span-12">
            <label className="form-label text-sm font-bold">Current Invoice</label>
            <Table
              className="max-h-32 overflow-y-auto text-xs"
              columns={invoiceColumns}
              dataSource={data}
              pagination={false}
              size="small"
              bordered
            />
          </div>
        </div>

        {/* Button Section */}
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-9"></div>
          <div className="col-span-3 text-end">
            <div className="flex gap-2">
              <Button type="primary" danger onClick={() => form.submit()} className="w-28">Delete</Button>
              <Button type="default" className="bg-yellow-500 text-white w-28" onClick={clearForm}>Clear</Button>
              <Button type="primary" className="w-28" onClick={exit}>Exit</Button>
            </div>
          </div>
        </div>
      </Form>
</div>
     
    </div>
  );
};

export default Return;
