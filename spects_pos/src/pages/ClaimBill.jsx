import React, { useEffect, useState } from "react";
import { Input, Button, Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const ClaimBill = () => {
  const [descriptionOne, setDescriptionOne] = useState("");
  const [descriptionTwo, setDescriptionTwo] = useState("");
  const [descriptionThree, setDescriptionThree] = useState("");
  const [qtyOne, setQtyOne] = useState("");
  const [qtyTwo, setQtyTwo] = useState("");
  const [qtyThree, setQtyThree] = useState("");
  const [amountOne, setAmountOne] = useState("");
  const [amountTwo, setAmountTwo] = useState("");
  const [amountThree, setAmountThree] = useState("");
  const [grossAmount, setGrossAmount] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [netAmount, setNetAmount] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    const one = JSON.parse(sessionStorage.getItem("itemOne"));
    const two = JSON.parse(sessionStorage.getItem("itemTwo"));
    const three = JSON.parse(sessionStorage.getItem("itemThree"));

    if (one) {
      setDescriptionOne(one.description);
      setQtyOne(one.maxStockQty);
      setAmountOne(one.salePrice);
    }
    if (two) {
      setDescriptionTwo(two.description);
      setQtyTwo(two.maxStockQty);
      setAmountTwo(two.salePrice);
    }
    if (three) {
      setDescriptionThree(three.description);
      setQtyThree(three.maxStockQty);
      setAmountThree(three.salePrice);
    }
  }, []);

  useEffect(() => {
    const totalAmount =
      parseFloat(amountOne) + parseFloat(amountTwo) + parseFloat(amountThree);
    setGrossAmount(totalAmount.toFixed(2));
  }, [amountOne, amountTwo, amountThree]);

  const handleDiscountChange = (e) => {
    const discount = parseFloat(e.target.value) || 0;
    setDiscountAmount(discount);
    const netAmountCalc = parseFloat(grossAmount) - discount;
    setNetAmount(netAmountCalc.toFixed(2));
  };

  const clearForm = () => {
    setDescriptionOne("");
    setDescriptionTwo("");
    setDescriptionThree("");
    setQtyOne("");
    setQtyTwo("");
    setQtyThree("");
    setAmountOne("");
    setAmountTwo("");
    setAmountThree("");
    setGrossAmount("");
    setDiscountAmount("");
    setNetAmount("");
    setNote("");
  };

  const exit = () => {
    window.location.href = "index.php";
  };

  return (
    <div className="p-4">
      <div className="col-span-10 flex items-center">
        <h1 className="text-3xl font-bold p-2 my-2">
          Claim <span className="text-purple-500">Bill</span>
        </h1>
      </div>

      {/* Icon */}
      <div className="col-span-2 flex items-center justify-center text-center p-2">
        <Link to="/dashboard">
          <FaHome className="text-3xl cursor-pointer" />
        </Link>
      </div>
      <Form layout="vertical" id="claimBillForm" className=" bg-gray-200">
        {/* 2nd Row */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3">
            <label className="form-label text-xs font-medium text-center mt-2">
              Description:
            </label>
            <Input
              value={descriptionOne}
              onChange={(e) => setDescriptionOne(e.target.value)}
            />
            <Input
              value={descriptionTwo}
              onChange={(e) => setDescriptionTwo(e.target.value)}
            />
            <Input
              value={descriptionThree}
              onChange={(e) => setDescriptionThree(e.target.value)}
            />
          </div>
          <div className="col-span-3">
            <label className="form-label text-xs font-medium text-center mt-2">
              Search Item:
            </label>
            <div className="flex items-center">
              <Input
                className="rounded-full shadow-xl"
                onChange={(e) => setDescriptionOne(e.target.value)}
                placeholder=""
              />
              <Button
                icon={<SearchOutlined />}
                className="text-yellow-500 text-xl ml-4 hover:text-blue-700"
              />
            </div>
            <div className="flex items-center">
              <Input
                className="rounded-full shadow-xl"
                onChange={(e) => setDescriptionTwo(e.target.value)}
                placeholder=""
              />
              <Button
                icon={<SearchOutlined />}
                className="text-yellow-500 text-xl ml-4 hover:text-blue-700"
              />
            </div>
            <div className="flex items-center">
              <Input
                className="rounded-full shadow-xl"
                onChange={(e) => setDescriptionThree(e.target.value)}
                placeholder=""
              />
              <Button
                icon={<SearchOutlined />}
                className="text-yellow-500 text-xl ml-4 hover:text-blue-700"
              />
            </div>
          </div>
          <div className="col-span-3">
            <label className="form-label text-xs font-medium text-center mt-2">
              Qty:
            </label>
            <Input value={qtyOne} onChange={(e) => setQtyOne(e.target.value)} />
            <Input value={qtyTwo} onChange={(e) => setQtyTwo(e.target.value)} />
            <Input
              value={qtyThree}
              onChange={(e) => setQtyThree(e.target.value)}
            />
          </div>
          <div className="col-span-3">
            <label className="form-label text-xs font-medium text-center mt-2">
              Amount:
            </label>
            <Input
              value={amountOne}
              onChange={(e) => setAmountOne(e.target.value)}
            />
            <Input
              value={amountTwo}
              onChange={(e) => setAmountTwo(e.target.value)}
            />
            <Input
              value={amountThree}
              onChange={(e) => setAmountThree(e.target.value)}
            />
          </div>
        </div>

        {/* 3rd Row */}
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-7"></div>
          <div className="col-span-5">
            <div className="flex mt-1">
              <label className="font-semibold text-black text-xs">
                Gross Amount:
              </label>
              <Input value={grossAmount} className="ml-2" readOnly />
            </div>
            <div className="flex mt-1">
              <label className="font-semibold text-black text-xs">
                Discount Amount:
              </label>
              <Input
                type="number"
                onChange={handleDiscountChange}
                className="ml-2"
              />
            </div>
            <div className="flex mt-1">
              <label className="font-semibold text-black text-xs">
                Net Amount:
              </label>
              <Input value={netAmount} className="ml-2" readOnly />
            </div>
          </div>
        </div>

        {/* 4th Row */}
        <div className="grid grid-cols-12 p-1 mt-4">
          <div className="col-span-12">
            <label className="font-semibold text-black text-xs">
              Notes [Max Length 4000]:
            </label>
            <Input.TextArea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="h-14 w-full"
              maxLength={4000}
            />
          </div>
        </div>

        {/* 5th Row */}
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-6">
            <label className="form-label text-xs text-red-600 font-bold text-center mt-2">
              Invoice Search:
            </label>
            <div className="flex items-center">
              <Input
                className="rounded-full shadow-xl h-8"
                placeholder="Search"
              />
              <Button
                icon={<SearchOutlined />}
                className="text-yellow-500 text-xl ml-4 hover:text-blue-700"
              />
            </div>
          </div>
          <div className="col-span-6">
            <label className="form-label text-xs text-red-600 font-bold text-center mt-2">
              Customer Search:
            </label>
            <div className="flex items-center">
              <Input
                className="rounded-full shadow-xl h-8"
                placeholder="Search"
              />
              <Button
                icon={<SearchOutlined />}
                className="text-yellow-500 text-xl ml-4 hover:text-blue-700"
              />
            </div>
          </div>
        </div>

        {/* Button Row */}
        <div className="mt-2">
          <div className="flex justify-end gap-3">
            <Button
              className="border-2 border-black text-black bg-white w-32"
              type="button"
              onClick={() => alert("SMS Sent")}
            >
              SMS
            </Button>
            <Button
              className="bg-blue-600 text-white w-32"
              type="button"
              onClick={() => alert("Saved")}
            >
              Save
            </Button>
            <Button
              className="bg-green-600 text-white w-32"
              type="button"
              onClick={() => alert("Bill Printed")}
            >
              Bill Print
            </Button>
            <Button
              className="bg-yellow-500 text-white w-32"
              type="button"
              onClick={clearForm}
            >
              Clear
            </Button>
            <Button
              className="bg-red-500 text-white w-32"
              type="button"
              onClick={() => alert("Deleted")}
            >
              Delete
            </Button>
            <Button
              className="bg-black text-white w-32"
              type="button"
              onClick={exit}
            >
              Exit
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ClaimBill;
