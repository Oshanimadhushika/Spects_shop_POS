import React, { useState } from "react";
import { Radio } from "antd";
// import 'antd/dist/antd.css';
// import 'tailwindcss/tailwind.css';
import { Link, useNavigate } from "react-router-dom";
import RegisterUser from "./RegisterUser";
import Branch from "./Branch";
import { FaHome } from "react-icons/fa";

const Admin = () => {
  const [selectedValue, setSelectedValue] = useState("user-register");
  const navigate = useNavigate();

  const handleRadioChange = (e) => {
    // const value = e.target.value;
    setSelectedValue(e.target.value);
    // navigate(`/${value}`);
  };

  const renderContent = () => {
    switch (selectedValue) {
      case "user-register":
        return <RegisterUser />;
      case "branch":
        return <Branch />;
      default:
        return null;
    }
  };

  return (
    <div className=" bg-gray-200  p-4 w-full max-h-full ">
      

      <div className="grid grid-cols-12 gap-4  w-full">
        {/* Header Title */}
        <div className="col-span-10 flex items-center">
          <h1 className="text-3xl font-bold p-2 my-2">
            Admin <span className="text-purple-500">Master</span>
          </h1>
        </div>

        {/* Icon */}
        <div className="col-span-2 flex items-center justify-center text-center p-2">
        <Link to="/dashboard">
          <FaHome className="text-3xl cursor-pointer" />
        </Link>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3 mt-4 w-full">
        {/* Radio Buttons */}
        <div className="col-span-6 pt-3 pl-3">
          <Radio.Group
            onChange={handleRadioChange}
            defaultValue={selectedValue}
            className="flex space-x-4"
          >
            <Radio value="user-register" className="font-semibold text-lg">
              Add User
            </Radio>
            <Radio value="branch" className="font-semibold text-lg">
              Add Branch
            </Radio>
          </Radio.Group>
        </div>

        {/* Placeholder for other content */}
        <div className="col-span-12 p-4 contentFrameCol w-full">
          <div className="w-full  h-auto">
            {renderContent()}
            {/* This area can be used to show some additional info if needed */}
            {/* The actual content will be rendered by routing */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
