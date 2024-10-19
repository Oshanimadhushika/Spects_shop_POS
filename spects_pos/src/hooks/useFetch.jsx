import { useState } from "react";
import axios from "axios";
import useNotification from "./useNotification"; // Assuming you have a notification hook

const useFetch = () => {
  const [fetchData, setFetchData] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const { notifyError } = useNotification();

  // const baseUrl = import.meta.env.VITE_API_URL;
  
  const baseUrl ="http://localhost:9000/"

  // Simplified error handling
  const serverErrorHandle = (err) => {
    if (err.code === "ERR_NETWORK") {
      notifyError("Network error!");
    } else if (err.code === "ERR_CONNECTION_TIMED_OUT") {
      notifyError("Connection Timed Out!");
    } else {
      notifyError("An error occurred.");
    }
  };

  // Create an axios instance with a base URL
  const axiosInstance = axios.create({
    baseURL: baseUrl,
  });


   // Add interceptors for debugging
   axiosInstance.interceptors.request.use(
    (config) => {
      // console.log("Starting Request", config);
      return config;
    },
    (error) => {
      console.error("Request Error", error);
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      // console.log("Response:", response);
      return response;
    },
    (error) => {
      console.error("Response Error", error);
      return Promise.reject(error);
    }
  );

  // Generic API fetch function
  const fetchAction = async ({ query, body, method = "post", params }) => {
    setFetchLoading(true);
    setFetchError(null);
    setFetchData(null);

    try {
      const response = await axiosInstance[method](`${query}`, {
        params,
        ...body,
      });
      setFetchData(response?.data); 
      // console.log("response",response?.data);

      // console.log("response-dta",response?.data);
      
      return response?.data;
    } catch (err) {
      serverErrorHandle(err);
      setFetchError(err.response?.data || "An error occurred");
      throw err;
    } finally {
      setFetchLoading(false);
    }
  };

  return { fetchData, fetchAction, fetchLoading, fetchError };
};

export default useFetch;
