// import React, { useContext, useEffect, useState } from "react";
// import {
//   Form,
//   Input,
//   Button,
//   Select,
//   Table,
//   Radio,
//   notification,
//   DatePicker,
//   Typography,
//   Modal,
// } from "antd";
// import { SearchOutlined, FileDoneOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import { ItemContext } from "../context/ItemContext";
// import { SettingContext } from "../context/SettingContext";


// const { Option } = Select;
// const { RangePicker } = DatePicker;

// const Invoice = () => {
//   const [form] = Form.useForm();
//   const [formItem] = Form.useForm();

//   const [items, setItems] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [payType, setPayType] = useState("");
//   const navigate = useNavigate();
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const {
//     handleSearch,
//     isItemTableVisible,
//     setIsItemTableVisible,
//     selectedItem,
//     setSelectedItem,
//   } = useContext(ItemContext);

//   const { brands, coatings, designs, lensTypes } = useContext(SettingContext);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   console.log("selected item",selectedItem);
  

//   useEffect(() => {
//     if (!searchKeyword) {
//       formItem.resetFields(["keyword"]);
//     }
//   }, [searchKeyword, formItem]);

//   // useEffect(() => {
//   //   if (selectedItem) {
//   //     formItem.setFieldsValue({
//   //       itemCode: selectedItem.itemCode || "",
//   //       barcode: selectedItem.barcode || "",
//   //       description: selectedItem.description || "",
//   //       // qty: selectedItem.description || "",
//   //       discount: selectedItem.discount || "",
//   //       salePrice: selectedItem.salePrice || "",
//   //     });
//   //   }
//   // }, [selectedItem, formItem]);

//   useEffect(() => {
//     if (!searchKeyword && selectedItem) {
//       formItem.setFieldsValue({
//         itemCode: selectedItem.itemCode || "",
//         barcode: selectedItem.barcode || "",
//         description: selectedItem.description || "",
//         discount: selectedItem.discount || "",
//         salePrice: selectedItem.salePrice || "",
//       });
//     } else if (!searchKeyword) {
//       formItem.setFieldsValue({
//         itemCode: "",
//         barcode: "",
//         description: "",
//         discount: "",
//         salePrice: "",
//       });
//     } else if (selectedItem) {
//       formItem.setFieldsValue({
//         itemCode: selectedItem.itemCode || "",
//         barcode: selectedItem.barcode || "",
//         description: selectedItem.description || "",
//         discount: selectedItem.discount || "",
//         salePrice: selectedItem.salePrice || "",
//       });
//     }
//   }, [searchKeyword, selectedItem, formItem]);
  
  
  

//   const handleSearchClick = () => {
//     setIsItemTableVisible(true);
//     handleSearch({ keyword: searchKeyword });
//   };

//   const handleAddItem = () => {
//     // Logic to add item
//   };

//   const handlePaymentTypeChange = (e) => {
//     setPayType(e.target.value);
//     setIsModalVisible(true);
//   };

//   const renderModalContent = () => {
//     switch (payType) {
//       case "cash":
//         return (
//           <Form.Item label="Cash LKR">
//             <Input className="w-full" placeholder="Enter cash amount" />
//           </Form.Item>
//         );
//       case "cheque":
//         return (
//           <>
//           <Form.Item label="Bank Name">
//             <Input className="w-full" placeholder="Enter bank name" />
//           </Form.Item>
//           <Form.Item label="Cheque Number">
//             <Input className="w-full" placeholder="Enter cheque number" />
//           </Form.Item>
//           <Form.Item label="Date">
//             <Input
//               type="date"
//               className="w-full"
//               placeholder="Enter cheque date"
//             />
//           </Form.Item>
//           <Form.Item label="Amount">
//             <Input className="w-full" placeholder="Enter amount" />
//           </Form.Item>
//         </>
//         );
//       case "cardOrTransfer":
//         return (
//           <>
//             <Form.Item label="Account Number">
//               <Input className="w-full" placeholder="Enter account number" />
//             </Form.Item>
//             <Form.Item label="Transfer Amount">
//               <Input className="w-full" placeholder="Enter amount" />
//             </Form.Item>
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   const handleClear = () => {
//     form.resetFields();
//     notification.info({ message: "Form cleared!" });
//   };

//   return (
//     <div className="border-2 border-gray-300 bg-gray-200 p-4 mb-4 shadow-xl">
//       {/* <h3 className="text-lg font-bold mb-4"></h3> */}
//       <Typography.Title level={3}>Invoice</Typography.Title>

//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={() => {
//           /* Submit logic */
//         }}
//       >
//         <div className="grid grid-cols-12 gap-2 mb-4">
//           <Form.Item label="Invoice Date" className="col-span-2">
//             <DatePicker className="w-full" />
//           </Form.Item>

//           <Form.Item label="Invoice No" className="col-span-2">
//             <Input className="w-full" />
//           </Form.Item>

//           <Form.Item label="Lens Type" className="col-span-2">
//             <Select placeholder="Lens Type">
//               {lensTypes.map((value) => (
//                 <Option key={value.id} value={value.id}>
//                   {value.branchName}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item label="Brand" className="col-span-1">
//             <Select placeholder="Brand">
//               {brands.map((value) => (
//                 <Option key={value.id} value={value.id}>
//                   {value.brandName}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item label="Coating" className="col-span-1">
//             <Select placeholder="Coating">
//               {coatings.map((value) => (
//                 <Option key={value.id} value={value.id}>
//                   {value.brandName}
//                 </Option>
//               ))}
//             </Select>{" "}
//           </Form.Item>

//           <Form.Item label="Tint" className="col-span-2">
//             <Select placeholder="Tint">
//               {/* {tints.map((value) => (
//                 <Option key={value.id} value={value.id}>
//                   {value.brandName}
//                 </Option>
//               ))} */}
//             </Select>{" "}
//           </Form.Item>

//           <Form.Item label="Design" className="col-span-2">
//             <Select placeholder="Design">
//               {designs.map((value) => (
//                 <Option key={value.id} value={value.id}>
//                   {value.brandName}
//                 </Option>
//               ))}
//             </Select>{" "}
//           </Form.Item>

//           <Form.Item className="col-span-2 ">
//             <Button type="default" className="w-full bg-yellow-400">
//               Clear
//             </Button>
//           </Form.Item>

//           <Form.Item className="col-span-2">
//             <Button type="primary" className="w-full" onClick={handleAddItem}>
//               Add
//             </Button>
//           </Form.Item>
//         </div>

//         <Form form={formItem}>
//           <div className="grid grid-cols-12 gap-2 mb-4">
//             <Form.Item
//               name="keyword"
//               className="col-span-2 flex items-center mt-7"
//             >
//               <Input.Search
//                 placeholder="Search Item"
//                 className="w-full"
//                 // onSearch={onSearch}
//                 enterButton={<SearchOutlined />}
//                 value={searchKeyword}
//                 onChange={(e) => setSearchKeyword(e.target.value)}
//                 onSearch={handleSearchClick}
//               />
//             </Form.Item>

//             <Form.Item label="Item Code" name="itemCode" className="col-span-2">
//               <Input readOnly className="w-full" />
//             </Form.Item>

//             <Form.Item label="Barcode" name="barcode" className="col-span-2">
//               <Input readOnly className="w-full" />
//             </Form.Item>

//             <Form.Item
//               label="Item Name"
//               name="description"
//               className="col-span-3"
//             >
//               <Input readOnly className="w-full" />
//             </Form.Item>

//             <Form.Item
//               label="Display On Bill"
//               name="displayOnBill"
//               className="col-span-3"
//             >
//               <Select className="w-full"></Select>
//             </Form.Item>
//           </div>

//           <div className="grid grid-cols-12 gap-4 mb-4">
//             <div className="col-span-6 mt-2 gap-2">
//               <Form.Item name="qty" label="Quantity" className="mt-2">
//                 <Input defaultValue={0} className="w-1/3" />
//               </Form.Item>

//               <Form.Item name="salePrice" label="Price" className="mt-2">
//                 <Input defaultValue={0} className="w-1/3" />
//               </Form.Item>

//               <Form.Item name="discount" label="Discount" className="mt-2">
//                 <Input defaultValue={0} className="w-1/3" />
//               </Form.Item>

//               <Form.Item
//                 name="discountAmount"
//                 label="Discount Amount"
//                 className="mt-2"
//               >
//                 <Input defaultValue={0} className="w-1/3" />
//               </Form.Item>

//               <Form.Item name="amount" label="Amount" className="mt-2">
//                 <Input defaultValue={0} className="w-1/3" />
//               </Form.Item>
//             </div>

//             <div className="col-span-6">
//               <div className="border-2 border-gray-200 p-4 mb-4">
//                 <div className="mb-2">
//                   <strong className="text-sm">Total</strong>
//                 </div>
//                 <div className="flex justify-between mb-2">
//                   <span className="font-semibold">Bill Total Rs:</span>
//                   <span className="font-semibold text-red-600">0.00</span>
//                 </div>
//                 <div className="flex justify-between mb-2">
//                   <span className="font-semibold">Discount:</span>
//                   <span className="font-semibold text-red-600">0.00</span>
//                 </div>
//                 <div className="flex justify-between mb-2">
//                   <span className="font-semibold">Payable:</span>
//                   <span className="font-semibold text-red-600">0.00</span>
//                 </div>
//                 <div className="flex justify-between mb-2">
//                   <span className="font-semibold">Paid:</span>
//                   <span className="font-semibold text-red-600">0.00</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="font-semibold">Due Balance:</span>
//                   <span className="font-semibold text-red-600">0.00</span>
//                 </div>
//               </div>

//               {/* <div className="bg-gray-300 p-4 rounded-md mb-4">
//                 <Form.Item label="Cash LKR">
//                   <Input className="w-full" />
//                 </Form.Item>
//               </div> */}

//               <div className="bg-gray-300 p-4 rounded-md ">
//                 <Form.Item label="Payment Type">
//                   <Radio.Group
//                     onChange={handlePaymentTypeChange}
//                     value={payType}
//                   >
//                     <Radio value="cash">Cash</Radio>
//                     <Radio value="cheque">Cheque</Radio>
//                     <Radio value="cardOrTransfer">Card/Transfer</Radio>
//                   </Radio.Group>
//                 </Form.Item>

//                 <Modal
//                   title="Payment Details"
//                   open={isModalVisible}
//                   onCancel={() => {
//                     setIsModalVisible(false);
//                   }}
//                   footer={[
//                     <Button
//                       key="cancel"
//                       onClick={() => {
//                         setIsModalVisible(false);
//                       }}
//                     >
//                       Cancel
//                     </Button>,
//                     <Button key="submit" type="primary">
//                       Submit
//                     </Button>,
//                   ]}
//                 >
//                   {renderModalContent()}
//                 </Modal>
//               </div>
//             </div>
//           </div>
//         </Form>

//         <div className="grid grid-cols-12 gap-3 mb-4">
//           <div className="col-span-9">
//             <Table
//               dataSource={selectedItems}
//               columns={[
//                 { title: "Item Code", dataIndex: "code", key: "code" },
//                 { title: "Description", dataIndex: "desc", key: "desc" },
//                 { title: "Price", dataIndex: "price", key: "price" },
//                 { title: "Qty", dataIndex: "qty", key: "qty" },
//                 { title: "Discount", dataIndex: "disc", key: "disc" },
//                 { title: "Amount", dataIndex: "amount", key: "amount" },
//               ]}
//               pagination={false}
//               scroll={{ x: "max-content", y: "100%" }}
//             />
//           </div>
//           <div className="col-span-3 gap-1">
//             {/* <Button type="primary" className="w-full" htmlType="submit">
//               Submit
//             </Button> */}
//             <Button
//               type="primary"
//               className="bg-blue-600 text-white w-full"
//               htmlType="submit"
//               name="submit"
//               onClick={() => {
//                 navigate("/custom-register");
//               }}
//             >
//               Patient Register
//             </Button>
//             <Button
//               type="default"
//               className="bg-white text-blue-700 border-2 border-blue-700 w-full"
//               htmlType="submit"
//               name="receiptPrint"
//             >
//               Print (Reci)
//             </Button>
//             <Button
//               type="default"
//               className="bg-white text-blue-700 border-2 border-blue-700 w-full"
//               htmlType="submit"
//               name="invoicePrint"
//             >
//               Print (Invo)
//             </Button>
//             <Button
//               type="default"
//               className="bg-white text-blue-700 border-2 border-blue-700 w-full"
//               htmlType="submit"
//               name="invPresPrint"
//             >
//               Invo + Presc
//             </Button>
//             <Button
//               type="default"
//               className="bg-black text-white w-full"
//               htmlType="submit"
//               name="sms"
//             >
//               SMS
//             </Button>
//             <Button
//               type="default"
//               className="bg-green-500 text-white w-full"
//               onClick={handleClear}
//             >
//               Clear
//             </Button>
//           </div>
//         </div>
//       </Form>
//     </div>
//   );
// };

// export default Invoice;
