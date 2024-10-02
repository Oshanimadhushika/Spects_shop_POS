import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import NotificationSuccessIcon from "../assets/images/common/NotificationSuccessIcon";
// import NotificationWarningIcon from "../assets/images/common/NotificationWarningIcon";
// import NotificationErrorIcon from "../assets/images/common/NotificationErrorIcon";

const useNotification = () => {
  const notifySuccess = (message, options = {}) => {
    toast.success(message, {
      // icon: <NotificationSuccessIcon className="w-[24px] h-[24px]" />,
      toastId: "success1",
      position: "bottom-center",
      ...options,
    });
  };

  const notifyError = (message, options = {}) => {
    toast.error(message, {
      // icon: <NotificationErrorIcon className="w-[24px] h-[24px]" />,
      toastId: "error",
      position: "bottom-center",
      ...options,
    });
  };

  
  const notifyInfo = (message, options = {}) => {
    toast.info(message, {
      // icon: <NotificationWarningIcon className="w-[24px] h-[24px]" />,
      toastId: "info",
      position: "bottom-center",
      ...options,
    });
  };

  const notifyWarning = (message, options = {}) => {
    toast.warning(message, {
      // icon: <NotificationSuccessIcon className="w-[24px] h-[24px]" />,
      toastId: "warning",
      position: "bottom-center",
      ...options,
    });
  };

  return {
    notifySuccess,
    notifyError,
    notifyInfo,
    notifyWarning,
  };
};

export default useNotification;
