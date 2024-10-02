import React from "react";
import { Typography } from "antd";
// import SettingsOptionsPage from "../../components/setting/SettingsOptionPage";
import AdminIcon from "../assets/images/dashboard/admin.png";
import CustomersIcon from "../assets/images/dashboard/customer.png";
import ItemIcon from "../assets/images/dashboard/item.png";
import DashboardOption from "./DashBoardOption";

import GoodRecieveIcon from "../assets/images/dashboard/goodRecieveNotes.png";
import Prescription from "../assets/images/dashboard/prescription.png";
import Bill from "../assets/images/dashboard/bill.png";
import Sale from "../assets/images/dashboard/sales.png";

import Job from "../assets/images/dashboard/jobStatus.png";
import Stock from "../assets/images/dashboard/stock.png";
import Return from "../assets/images/dashboard/return.png";
import Expense from "../assets/images/dashboard/expense.png";
import Setting from "../assets/images/dashboard/settings.png";
import Report from "../assets/images/dashboard/report.png";
import Barcode from "../assets/images/dashboard/barcode-scanner.png";
import Video from "../assets/images/dashboard/video.png";
import PenBackup from "../assets/images/dashboard/pendrive.png";
import Exit from "../assets/images/dashboard/exit.png";
import CartoonPerson from "../assets/images/dashboard/carttongirl.png";
import bgDash from "../assets/bgDash.png";
// import bgDash2 from "../assets/bg.jpg";



// import ItemIcon from "../assets/images/dashboard/item.png";

// import AdminIcon from "../assets/images/dashboard/admin.png";
// import CustomersIcon from "../assets/images/dashboard/customer.png";
// import ItemIcon from "../assets/images/dashboard/item.png";

const { Title } = Typography;

const Dashboard = () => {
  const dashboardOptions = [
    {
      color: "bg-[#F6C6C6]",
      icon: <img src={AdminIcon} alt="Admin" className="w-full h-full" />,
      title: "Admin Panel",
      url: "/admin",
    },
    {
      color: "bg-[#F5B8C6]",
      icon: <img src={ItemIcon} alt="Item Master" className="w-full h-full" />,
      title: "Item Master",
      url: "/item-master",
    },
    {
      color: "bg-[#C5E1A5]",
      icon: (
        <img
          src={CustomersIcon}
          alt="Custom Register"
          className="w-full h-full"
        />
      ),
      title: "Custom Register",
      url: "/custom-register",
    },
    {
      color: "bg-[#FFE082]",
      icon: (
        <img
          src={GoodRecieveIcon}
          alt="Good Receive Notes"
          className="w-full h-full"
        />
      ),
      title: "Good Receive Notes",
      url: "/good-receive-notes",
    },
    {
      color: "bg-[#F8BBD0]",
      icon: (
        <img
          src={Prescription}
          alt="Prescription Invoice"
          className="w-full h-full"
        />
      ),
      title: "Prescription Invoice",
      url: "/prescription-invoice",
    },
    {
      color: "bg-[#A5D6A7]",
      icon: (
        <img src={Bill} alt="Balance Bill" className="w-full h-full" />
      ),
      title: "Balance Bill",
      url: "/balance-bill",
    },
    {
      color: "bg-[#F0B4B2]",
      icon: (
        <img src={Sale} alt="Other Sales" className="w-full h-full" />
      ),
      title: "Other Sales",
      url: "/other-sales",
    },
    {
      color: "bg-[#D1C4E9]",
      icon: (
        <img src={CustomersIcon} alt="Visitors" className="w-full h-full" />
      ),
      title: "Visitors",
      url: "/visitors",
    },
    {
      color: "bg-[#B2EBF2]",
      icon: (
        <img src={Job} alt="Job Status" className="w-full h-full" />
      ),
      title: "Job Status",
      url: "/job-status",
    },
    {
      color: "bg-[#B3E5FC]",
      icon: (
        <img src={Stock} alt="Stock Adjust" className="w-full h-full" />
      ),
      title: "Stock Adjust",
      url: "/stock-adjust",
    },
    {
      color: "bg-[#D6A4A4]",
      icon: (
        <img src={Bill} alt="Claim Bills" className="w-full h-full" />
      ),
      title: "Claim Bills",
      url: "/claim-bil",
    },
    {
      color: "bg-[#B0BEC5]",
      icon: (
        <img src={Expense} alt="Expenses" className="w-full h-full" />
      ),
      title: "Expenses",
      url: "/expenses",
    },
    {
      color: "bg-[#B9FBC0]",
      icon: <img src={Return} alt="Return" className="w-full h-full" />,
      title: "Return",
      url: "/return",
    },
    {
      color: "bg-[#B3E5F1]",
      icon: <img src={Setting} alt="Setting" className="w-full h-full" />,
      title: "Setting",
      url: "/settings",
    },
    {
      color: "bg-[#A5D6A7]",
      icon: <img src={Report} alt="Reports" className="w-full h-full" />,
      title: "Reports",
      url: "/reports",
    },
    {
      color: "bg-[#F8BBD0]",
      icon: (
        <img src={Barcode} alt="Bar Code" className="w-full h-full" />
      ),
      title: "Bar Code",
      url: "/bar-code",
    },
    {
      color: "bg-[#C8E6C9]",
      icon: (
        <img
          src={Video}
          alt="Lesson Training"
          className="w-full h-full"
        />
      ),
      title: "Lesson Training",
      url: "/lesson-training",
    },
    {
      color: "bg-[#F2B5D4]",
      icon: (
        <img src={PenBackup} alt="Pen Backup" className="w-full h-full" />
      ),
      title: "Pen Backup",
      url: "/pen-backup",
    },
    {
      color: "bg-[#B0E57C]",
      icon: <img src={Exit} alt="Exit" className="w-full h-full" />,
      title: "Exit",
      url: "/",
    },
  ];

  return (
    <div className="justify-center w-full h-screen mx-auto p-5 md:p-10 lg:p-10 xl:p-10 xl:pt-2 lg:pt-2 md:pt-2 sm:p-5"
    // style={{ backgroundImage: `url(${BackgroundImg})`, backgroundSize: 'cover', backgroundPosition: 'center',height:'100%' }}
    >
       {/* <img
          src={bgDash}
          alt="Cartoon Person"
          className="absolute top-0 left-0 w-[300px] h-auto"
          style={{ zIndex: -1 }}
        /> */}


      <div className="flex justify-start pl-3 pt-2">
        <Title level={1} className="flex page-title gap-1 items-center font-bold whitespace-nowrap">
          {/* Vision<span className="text-purple-700 inline-block">Soft</span>    Da<span className="text-purple-700 inline-block">sh</span>board */}
          <span>
  Vi<span className="text-purple-700 inline-block">si</span>onSoft&nbsp;Da<span className="text-purple-700 inline-block">sh</span>board
</span>
        </Title>
      </div>

      <div className="flex flex-col gap-9 p-5 mx-auto sm:p-5 ">
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

      <img
          src={bgDash}
          alt="Cartoon Person"
          className="absolute bottom-4 right-16 w-[300px] h-auto"
          style={{ zIndex: -1 }}
        />

      <img
          src={bgDash}
          alt="Cartoon Person"
          className="absolute bottom-0 right-0 w-[400px] h-auto mt-3"
          style={{ zIndex: -1 }}
        />
    </div>
  );
};

export default Dashboard;
