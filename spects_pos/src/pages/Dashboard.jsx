import React from "react";
import { Typography } from "antd";
// import SettingsOptionsPage from "../../components/setting/SettingsOptionPage";
import AdminIcon from "../assets/images/dashboard/admin.png";
import CustomersIcon from "../assets/images/dashboard/customer.png";
import ItemIcon from "../assets/images/dashboard/item.png";
import DashboardOption from "./DashBoardOption";


const { Title } = Typography;



const Dashboard = () => {
    const dashboardOptions = [
        { color: "bg-[#F6C6C6]", icon: <img src={AdminIcon} alt="Admin" className="w-full h-full" />, title: "Admin Panel", url: "/admin" },
        { color: "bg-[#F5B8C6]", icon: <img src={ItemIcon} alt="Item Master" className="w-full h-full" />, title: "Item Master", url: "/item-master" },
        { color: "bg-[#C5E1A5]", icon: <img src={CustomersIcon} alt="Custom Register" className="w-full h-full" />, title: "Custom Register", url: "/custom-register" },
        { color: "bg-[#FFE082]", icon: <img src={CustomersIcon} alt="Good Receive Notes" className="w-full h-full" />, title: "Good Receive Notes", url: "/good-receive-notes" },
        { color: "bg-[#F8BBD0]", icon: <img src={CustomersIcon} alt="Prescription Invoice" className="w-full h-full" />, title: "Prescription Invoice", url: "/prescription-invoice" },
        { color: "bg-[#A5D6A7]", icon: <img src={CustomersIcon} alt="Balance Bill" className="w-full h-full" />, title: "Balance Bill", url: "/balance-bill" },
        { color: "bg-[#F0B4B2]", icon: <img src={CustomersIcon} alt="Other Sales" className="w-full h-full" />, title: "Other Sales", url: "/other-sales" },
        { color: "bg-[#D1C4E9]", icon: <img src={CustomersIcon} alt="Visitors" className="w-full h-full" />, title: "Visitors", url: "/visitors" },
        { color: "bg-[#B2EBF2]", icon: <img src={CustomersIcon} alt="Job Status" className="w-full h-full" />, title: "Job Status", url: "/job-status" },
        { color: "bg-[#B3E5FC]", icon: <img src={CustomersIcon} alt="Stock Adjust" className="w-full h-full" />, title: "Stock Adjust", url: "/stock-adjust" },
        { color: "bg-[#D6A4A4]", icon: <img src={CustomersIcon} alt="Claim Bills" className="w-full h-full" />, title: "Claim Bills", url: "/claim-bills" },
        { color: "bg-[#B0BEC5]", icon: <img src={CustomersIcon} alt="Expenses" className="w-full h-full" />, title: "Expenses", url: "/expenses" },
        { color: "bg-[#B9FBC0]", icon: <img src={CustomersIcon} alt="Return" className="w-full h-full" />, title: "Return", url: "/return" },
        { color: "bg-[#B3E5F1]", icon: <img src={CustomersIcon} alt="Setting" className="w-full h-full" />, title: "Setting", url: "/settings" },
        { color: "bg-[#A5D6A7]", icon: <img src={CustomersIcon} alt="Reports" className="w-full h-full" />, title: "Reports", url: "/reports" },
        { color: "bg-[#F8BBD0]", icon: <img src={CustomersIcon} alt="Bar Code" className="w-full h-full" />, title: "Bar Code", url: "/bar-code" },
        { color: "bg-[#C8E6C9]", icon: <img src={CustomersIcon} alt="Lesson Training" className="w-full h-full" />, title: "Lesson Training", url: "/lesson-training" },
        { color: "bg-[#F2B5D4]", icon: <img src={CustomersIcon} alt="Pen Backup" className="w-full h-full" />, title: "Pen Backup", url: "/pen-backup" },
        { color: "bg-[#B0E57C]", icon: <img src={CustomersIcon} alt="Exit" className="w-full h-full" />, title: "Exit", url: "/exit" },
      ];
      

  return (
    <div className="justify-center w-full h-full mx-auto p-5 md:p-10 lg:p-10 xl:p-10 xl:pt-2 lg:pt-2 md:pt-2 sm:p-5">
      <div className="flex justify-start pl-3 pt-2">
        <Title level={1} className="flex page-title gap-1 items-center">
          Dashboard
        </Title>
      </div>

      <div className="flex flex-col gap-9 p-5 mx-auto sm:p-5 max-w-[1440px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {dashboardOptions.map((option, index) => (
            <DashboardOption
              key={index}
              color={option.color}
              icon={option.icon}
              title={option.title}
              url={option.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
