import React, { useContext, useEffect } from "react";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import { RiArrowRightDoubleFill } from "react-icons/ri";
const { Text } = Typography;
// import ArrowRightOutline from "../../assets/images/svg/settings/ArrowRightOutline";
// import { ArrowDownOutlined } from "@ant-design/icons";

const DashboardOption = ({ color, icon, title, url }) => {
  return (
    <>
      <Link
        className="flex w-full p-2 flex-row gap-2 border border-secondarySix rounded-lg items-center justify-start hover:border-secondaryThree cursor-pointer hover:shadow-md hover:shadow-secondarySix"
        to={url}
      >
        <div className="flex flex-1 w-full flex-row gap-2 items-center">
          <div className={`flex p-1 rounded-full w-8 h-8 ${color}`}>{icon}</div>
          <div className="flex flex-col">
            <Text className="card-title text-black font-bold text-lg">{title}</Text>
            {/* <Text className="page-subtitle text-colorLightGray">
              {description}
            </Text> */}
          </div>
        </div>
        <div className="flex p-1 bg-gray-300 rounded-full h-5 w-5 items-center justify-center">
          {/* <IoArrowForward className="flex w-2 " /> */}
          <RiArrowRightDoubleFill />
        </div>
      </Link>
    </>
  );
};
export default DashboardOption;
