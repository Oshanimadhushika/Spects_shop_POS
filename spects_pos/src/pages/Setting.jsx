import React, { useState } from 'react';
import { Radio, Card } from 'antd';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is imported
import Department from './Department';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import Supplier from './Supplier';
import Category from './Category';

const Settings = () => {
  const [selectedValue, setSelectedValue] = useState('supplier');

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const renderContent = () => {
    switch (selectedValue) {
      case 'supplier':
        return  <Supplier />;
      case 'department':
        return  <Department />;
      case 'category':
        return  <Category />;
      default:
        return '';
    }
  };

  return (
    <div className=" bg-white p-4 w-full shadow-lg">
      

      <div className="grid grid-cols-12 gap-4  w-full">
          {/* Header Title */}
          <div className="col-span-10 flex items-center">
            <h1 className="text-3xl font-bold p-2 my-2">
            Setting <span className="text-purple-500">Page</span>
            </h1>
          </div>

          {/* Icon */}
          <div className="col-span-2 flex items-center justify-center text-center p-2">
            <Link to="/dashboard">
              <FaHome className="text-3xl cursor-pointer" />
            </Link>
          </div>
        </div>

      <Card className="mt-3">
        <Radio.Group onChange={handleChange} defaultValue={selectedValue} className="flex justify-between">
          <Radio value="supplier" className="font-semibold text-lg">
            Supplier
          </Radio>
          <Radio value="department" className="font-semibold text-lg">
            Department
          </Radio>
          <Radio value="category" className="font-semibold text-lg">
            Category
          </Radio>
        </Radio.Group>

        {/* <div className="mt-3 w-full h-[560px]">
          <iframe
            id="contentFrame"
            src={iframeSrc()}
            className="w-full h-full"
            title="Content Frame"
          />
        </div> */}
          <div className="col-span-12 p-4 contentFrameCol w-full">
        <div className="w-full  h-auto">{renderContent()}</div>
      </div>
      </Card>
    </div>
  );
};

export default Settings;
