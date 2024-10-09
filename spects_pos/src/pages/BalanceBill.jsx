// import React, { useState } from "react";
// import { Input, Button, DatePicker, Radio, Table, Form } from "antd";
// import { SearchOutlined } from "@ant-design/icons";
// import { Link, useNavigate } from "react-router-dom";
// import { FaHome } from "react-icons/fa";

// const BalanceBill = () => {
//   const [jobNo, setJobNo] = useState("");
//   const [customerData, setCustomerData] = useState({});
//   const [invoiceData, setInvoiceData] = useState([]);
//   const [paymentData, setPaymentData] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [totalDiscount, setTotalDiscount] = useState(0);
//   const [totalPaid, setTotalPaid] = useState(0);
//   const [balance, setBalance] = useState(0);
//   const [payType, setPayType] = useState("");
//   const navigate = useNavigate();
//   const [form] = Form.useForm();

//   const handleSearch = async () => {
//     try {
//       const jobResult = await fetchJobData(jobNo); // Replace with your actual API call
//       setCustomerData(jobResult.customer);
//       setInvoiceData(jobResult.invoices);
//       setPaymentData(jobResult.payments);

//       const totalAmt = jobResult.invoices.reduce(
//         (sum, inv) => sum + inv.amount,
//         0
//       );
//       const totalDisc = jobResult.invoices.reduce(
//         (sum, inv) => sum + inv.discount,
//         0
//       );
//       const totalPaidAmt = jobResult.payments.reduce(
//         (sum, pay) => sum + pay.amount,
//         0
//       );

//       setTotalAmount(totalAmt);
//       setTotalDiscount(totalDisc);
//       setTotalPaid(totalPaidAmt);
//       setBalance(totalAmt - totalDisc - totalPaidAmt);
//     } catch (error) {
//       console.error("Error fetching job data:", error);
//     }
//   };

//   const columns = [
//     {
//       title: "Job No",
//       dataIndex: "jobNumber",
//       key: "jobNumber",
//     },
//     {
//       title: "Inv No",
//       dataIndex: "invoiceNumber",
//       key: "invoiceNumber",
//     },
//     {
//       title: "Rec No",
//       dataIndex: "receiptNumber",
//       key: "receiptNumber",
//     },
//     {
//       title: "Amount",
//       dataIndex: "amount",
//       key: "amount",
//     },
//     {
//       title: "Paid",
//       dataIndex: "paidAmount",
//       key: "paidAmount",
//     },
//     {
//       title: "Pay Type",
//       dataIndex: "payType",
//       key: "payType",
//     },
//     {
//       title: "Balance",
//       dataIndex: "balance",
//       key: "balance",
//     },
//   ];

//   return (
//     <div className="bg-white  p-8 w-full max-h-full ">
//       <div className="grid grid-cols-12 gap-4  w-full">
//         {/* Header Title */}
//         <div className="col-span-10 flex items-center">
//           <h1 className="text-3xl font-bold p-2 my-2">
//             Balance <span className="text-purple-500">Bill</span>
//           </h1>
//         </div>

//         {/* Icon */}
//         <div className="col-span-2 flex items-center justify-center text-center p-2">
//           <Link to="/dashboard">
//             <FaHome className="text-3xl cursor-pointer" />
//           </Link>
//         </div>
//       </div>

//       <div className="p-5 bg-gray-200 justify-center rounded-xl shadow-xl">
//         <Form onSubmit={handleSearch} form={form}>
//           <div className="grid grid-cols-12 gap-4 mb-4 border-2 border-gray-300 p-4">
//             <div className="col-span-3">
//               <label htmlFor="date" className="form-label text-xs font-medium">
//                 Date:
//               </label>
//               <DatePicker className="w-full" />
//             </div>
//             <div className="col-span-3">
//               <label htmlFor="jobNo" className="form-label text-xs font-medium">
//                 Job No:
//               </label>
//               <Input
//                 value={jobNo}
//                 onChange={(e) => setJobNo(e.target.value)}
//                 className="h-10"
//               />
//             </div>
//             <div className="col-span-4">
//               <label className="form-label text-xs font-medium">
//                 Customer:
//               </label>
//               <span className="text-sm font-bold ml-2">
//                 {/* {customerData?.name} */}
//                 MRS Janaka Thennakon
//               </span>
//             </div>
//             <div className="col-span-2">
//               <label className="form-label text-sm font-medium">
//                 {/* {customerData?.teleMobile} */}
//                 0704673920
//               </label>
//             </div>
//           </div>

//           <div className="grid grid-cols-12 gap-4 mb-4 border-2 border-gray-300 p-4">
//             <div className="col-span-2">
//               <label
//                 htmlFor="saleDate"
//                 className="form-label text-xs font-medium"
//               >
//                 Sale Date:
//               </label>
//               <DatePicker className="w-full" />
//             </div>
//             <div className="col-span-2">
//               <label
//                 htmlFor="receiptNo"
//                 className="form-label text-xs font-medium"
//               >
//                 Receipt No:
//               </label>
//               <Input className="h-10" />
//             </div>
//             <div className="col-span-1">
//               <label
//                 htmlFor="invoiceNo"
//                 className="form-label text-xs font-medium"
//               >
//                 Invoice No:
//               </label>
//               <Input className="h-10" />
//             </div>
//             <div className="col-span-2">
//               <label
//                 htmlFor="netValue"
//                 className="form-label text-xs font-medium"
//               >
//                 Net Value:
//               </label>
//               <Input value={totalAmount - totalDiscount} className="h-10" />
//             </div>
//             <div className="col-span-1">
//               <label
//                 htmlFor="return"
//                 className="form-label text-xs font-medium"
//               >
//                 Return:
//               </label>
//               <Input className="h-10" />
//             </div>
//             <div className="col-span-2">
//               <label htmlFor="paid" className="form-label text-xs font-medium">
//                 Paid:
//               </label>
//               <Input value={totalPaid} className="h-10" />
//             </div>
//             <div className="col-span-2">
//               <label
//                 htmlFor="balance"
//                 className="form-label text-xs font-medium"
//               >
//                 Balance:
//               </label>
//               <Input value={balance} className="h-10" />
//             </div>
//           </div>

//           <div className="grid grid-cols-12 gap-4 mb-4">
//             <div className="col-span-2">
//               <label className="text-sm font-semibold">Pay Mode</label>
//               <Radio.Group
//                 onChange={(e) => setPayType(e.target.value)}
//                 value={payType}
//                 className="flex flex-col"
//               >
//                 <Radio value="cash" className="font-semibold text-sm mt-2">
//                   Cash
//                 </Radio>
//                 <Radio value="cheque" className="font-semibold text-sm mt-2">
//                   Cheque
//                 </Radio>
//                 <Radio value="transfer" className="font-semibold text-sm mt-2">
//                   Card/Transfer
//                 </Radio>
//               </Radio.Group>
//             </div>

//             <div className="col-span-10">
//               <div className="max-h-36 overflow-y-auto">
//                 <Table
//                   columns={columns}
//                   dataSource={paymentData}
//                   pagination={false}
//                   size="small"
//                   rowKey="id"
//                   className="text-xs"
//                   scroll={{ x: "max-content", y: "100%" }}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-12 gap-4">
//             <div className="col-span-6 border-2 border-gray-300 relative p-4">
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 className="absolute bottom-2 right-2"
//               >
//                 View Update
//               </Button>
//             </div>

//             <div className="col-span-3 border-2 border-gray-300 p-4">
//               <label className="text-red-500 font-bold text-sm">
//                 Search Patient
//               </label>
//               <div className="flex items-center mt-2">
//                 <Input
//                   placeholder="Search..."
//                   className="rounded-full"
//                   suffix={<SearchOutlined />}
//                 />
//                 <Button
//                   type="text"
//                   icon={
//                     <i className="fas fa-notes-medical text-yellow-500 text-xl" />
//                   }
//                   className="ml-4"
//                 />
//               </div>
//             </div>

//             <div className="col-span-3 border-2 border-gray-300 p-4">
//               <label className="text-red-500 font-bold text-sm">
//                 Add Payment
//               </label>
//               <div className="flex items-center mt-2">
//                 <Input placeholder="Add Payment..." className="rounded-full" />
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-12 gap-2 mt-3">
//             <div className="col-span-12 text-end pt-3 gap-3">
//               <div className="mb-3 flex justify-end space-x-5">
//                 <Button
//                   type="primary"
//                   className="bg-blue-600 text-white p-2 font-semibold w-32"
//                 >
//                   Bill Print
//                 </Button>
//                 <Button
//                   type="primary"
//                   danger
//                   className="text-white p-2 font-semibold w-32"
//                 >
//                   Delete
//                 </Button>
//                 <Button
//                   type="primary"
//                   className="bg-yellow-500 text-white p-2 font-semibold w-32"
//                   onClick={() => form.resetFields()}
//                   >
//                   Clear
//                 </Button>
//                 <Button
//                   className="bg-black text-white p-2 font-semibold w-32"
//                   onClick={()=> navigate('/dashboard')}
// onClick={() => navigate(-1)}

//                 >
//                   Exit
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// };

// // Example function to fetch job data - replace this with actual API call
// const fetchJobData = async (jobNo) => {
//   // Replace with actual API logic
//   return {
//     customer: {
//       name: "John Doe",
//       teleMobile: "123456789",
//     },
//     invoices: [
//       { amount: 200, discount: 20, id: "INV123" },
//       { amount: 300, discount: 30, id: "INV124" },
//     ],
//     payments: [
//       {
//         jobNumber: jobNo,
//         invoiceNumber: "INV123",
//         receiptNumber: "REC123",
//         amount: 150,
//         payType: "Cash",
//         balance: 50,
//       },
//       {
//         jobNumber: jobNo,
//         invoiceNumber: "INV124",
//         receiptNumber: "REC124",
//         amount: 250,
//         payType: "Card",
//         balance: 20,
//       },
//     ],
//   };
// };

// export default BalanceBill;
import React, { useState } from "react";
import { Input, Button, DatePicker, Radio, Table, Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const BalanceBill = () => {
  const [jobNo, setJobNo] = useState("");
  const [customerData, setCustomerData] = useState({});
  const [invoiceData, setInvoiceData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [balance, setBalance] = useState(0);
  const [payType, setPayType] = useState("");
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // // Example function to fetch job data - replace this with actual API call
  const fetchJobData = async (jobNo) => {
    // Replace with actual API logic
    return {
      customer: {
        name: "John Doe",
        teleMobile: "123456789",
      },
      invoices: [
        { amount: 200, discount: 20, id: "INV123" },
        { amount: 300, discount: 30, id: "INV124" },
      ],
      payments: [
        {
          jobNumber: jobNo,
          invoiceNumber: "INV123",
          receiptNumber: "REC123",
          amount: 150,
          payType: "Cash",
          balance: 50,
        },
        {
          jobNumber: jobNo,
          invoiceNumber: "INV124",
          receiptNumber: "REC124",
          amount: 250,
          payType: "Card",
          balance: 20,
        },
      ],
    };
  };

  const handleSearch = async () => {
    try {
      const jobResult = await fetchJobData(jobNo); // Replace with your actual API call
      setCustomerData(jobResult.customer);
      setInvoiceData(jobResult.invoices);
      setPaymentData(jobResult.payments);

      const totalAmt = jobResult.invoices.reduce(
        (sum, inv) => sum + inv.amount,
        0
      );
      const totalDisc = jobResult.invoices.reduce(
        (sum, inv) => sum + inv.discount,
        0
      );
      const totalPaidAmt = jobResult.payments.reduce(
        (sum, pay) => sum + pay.amount,
        0
      );

      setTotalAmount(totalAmt);
      setTotalDiscount(totalDisc);
      setTotalPaid(totalPaidAmt);
      setBalance(totalAmt - totalDisc - totalPaidAmt);
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };

  const columns = [
    {
      title: "Job No",
      dataIndex: "jobNumber",
      key: "jobNumber",
    },
    {
      title: "Inv No",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
    },
    {
      title: "Rec No",
      dataIndex: "receiptNumber",
      key: "receiptNumber",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Paid",
      dataIndex: "paidAmount",
      key: "paidAmount",
    },
    {
      title: "Pay Type",
      dataIndex: "payType",
      key: "payType",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
    },
  ];

  return (
    <div className="bg-white p-8 w-full max-h-full">
      <div className="grid grid-cols-12 gap-4 w-full">
        {/* Header Title */}
        <div className="col-span-10 flex items-center">
          <h1 className="text-3xl font-bold p-2 my-2">
            Balance <span className="text-purple-500">Payment</span>
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
        <Form onFinish={handleSearch} form={form}>
          <div className="grid grid-cols-12 gap-4 mb-4 border-2 border-gray-300 p-4">
            <Form.Item label="Date:" className="col-span-3">
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item label="Job No:" className="col-span-3">
              <Input
                value={jobNo}
                onChange={(e) => setJobNo(e.target.value)}
                className="h-10"
              />
            </Form.Item>
            <Form.Item label="Customer:" className="col-span-4">
              <span className="text-sm font-bold ml-2">
                {/* {customerData?.name} */}
                MRS Janaka Thennakon
              </span>
            </Form.Item>
            <Form.Item className="col-span-2">
              <label className="form-label text-sm font-medium">
                {/* {customerData?.teleMobile} */}
                0704673920
              </label>
            </Form.Item>
          </div>

          <div className="grid grid-cols-12 gap-4 mb-4 border-2 border-gray-300 p-4">
            <Form.Item className="col-span-2">
              <label className="whitespace-nowrap">Sale Date:</label>
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item className="col-span-2">
              <label  className="whitespace-nowrap">Receipt No:</label>

              <Input className="h-10" />
            </Form.Item>
            <Form.Item className="col-span-1">
              <label  className="whitespace-nowrap">Invoice No:</label>
              <Input className="h-10" />
            </Form.Item>
            <Form.Item className="col-span-2">

              <label  className="whitespace-nowrap">Net Value:</label>
              <Input value={totalAmount - totalDiscount} className="h-10" />
            </Form.Item>
            {/* <Form.Item className="col-span-1">
              <label  className="whitespace-nowrap">Return:</label>
              <Input className="h-10" />
            </Form.Item> */}
            <Form.Item className="col-span-2">
              <label  className="whitespace-nowrap">Paid:</label>
              <Input value={totalPaid} className="h-10" />
            </Form.Item>
            <Form.Item className="col-span-2">
              <label className="whitespace-nowrap">Balance:</label>
              <Input value={balance} className="h-10" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-12 gap-4 mb-4">
            <Form.Item  className="col-span-2">
            <label className="font-bold text-md">Pay Mode</label>

              <Radio.Group
                onChange={(e) => setPayType(e.target.value)}
                value={payType}
                className="flex flex-col"
              >
                <Radio value="cash" className="font-semibold text-sm mt-2">
                  Cash
                </Radio>
                <Radio value="cheque" className="font-semibold text-sm mt-2">
                  Cheque
                </Radio>
                <Radio value="transfer" className="font-semibold text-sm mt-2">
                  Card/Transfer
                </Radio>
              </Radio.Group>
            </Form.Item>

            <div className="col-span-10">
              <div className="max-h-36 overflow-y-auto">
                <Table
                  columns={columns}
                  dataSource={paymentData}
                  pagination={false}
                  size="small"
                  rowKey="id"
                  className="text-xs"
                  scroll={{ x: "max-content", y: "100%" }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6 border-2 border-gray-300 relative p-4">
              <Button
                type="primary"
                htmlType="submit"
                className="absolute bottom-2 right-2"
              >
                View Update
              </Button>
            </div>

            <div className="col-span-3 border-2 border-gray-300 p-4">
              <label className="text-red-500 font-bold text-sm">
                Search Patient
              </label>
              <div className="flex items-center mt-2">
                <Input
                  placeholder="Search..."
                  className="rounded-full"
                  suffix={<SearchOutlined />}
                />
                <Button
                  type="text"
                  icon={
                    <i className="fas fa-notes-medical text-yellow-500 text-xl" />
                  }
                  className="ml-4"
                />
              </div>
            </div>

            <div className="col-span-3 border-2 border-gray-300 p-4">
              <label className="text-red-500 font-bold text-sm">
                Add Payment
              </label>
              <div className="flex items-center mt-2">
                <Input placeholder="Add Payment..." className="rounded-full" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-2 mt-3">
            <div className="col-span-12 text-end pt-3 gap-3">
              <div className="mb-3 flex justify-end space-x-5">
                <Button
                  type="primary"
                  className="bg-blue-600 text-white p-2 font-semibold w-32"
                >
                  Bill Print
                </Button>
                <Button
                  type="primary"
                  danger
                  className="text-white p-2 font-semibold w-32"
                >
                  Delete
                </Button>
                <Button
                  type="primary"
                  className="bg-yellow-500 text-white p-2 font-semibold w-32"
                  onClick={() => form.resetFields()}
                >
                  Clear
                </Button>
                <Button
                  className="bg-black text-white p-2 font-semibold w-32"
                  //   onClick={()=> navigate('/dashboard')}
                  onClick={() => navigate(-1)}
                >
                  Exit
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default BalanceBill;
