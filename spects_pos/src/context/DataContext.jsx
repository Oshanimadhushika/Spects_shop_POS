// DataContext.js
import React, { createContext, useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { getLocalStoragedata } from '../helpers/StorageHelper';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [usersInBranch, setUsersInBranch] = useState([]);
  const [authData, setAuthData] = useState(
    getLocalStoragedata("authData") ? getLocalStoragedata("authData") : null
  );

  console.log("auth data in context",authData);
  

  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    fetchData: fetchBranchData,
    fetchAction: fetchBranchAction,
    fetchError: fetchBranchError,
  } = useFetch();

  const {
    fetchData: fetchDepartmentData,
    fetchAction: fetchDepartmentAction,
    fetchError: fetchDepartmentError,
  } = useFetch();

  const {
    fetchData: fetchCategoryData,
    fetchAction: fetchCategoryAction,
    fetchError: fetchCategoryError,
  } = useFetch();

  const {
    fetchData: fetchSupplierData,
    fetchAction: fetchSupplierAction,
    fetchError: fetchSupplierError,
  } = useFetch();

  const {
    fetchData: fetchUserData,
    fetchAction: fetchUserAction,
    fetchError: fetchUserError,
  } = useFetch();

  useEffect(() => {
    getBranches();
    getDepartments();
    getCategories();
    getSuppliers();
    getUserInBranch();

  
  }, []);

  const getBranches = () => {
    setLoading(true);
    fetchBranchAction({ query: `v1.0/branch`, method: "get" });
    setLoading(false);
  };

  const getDepartments = () => {
    setLoading(true);
    fetchDepartmentAction({ query: `v1.0/department`, method: "get" });
    setLoading(false);
  };

  const getCategories = () => {
    setLoading(true);
    fetchCategoryAction({ query: `v1.0/category`, method: "get" });
    setLoading(false);
  };

  const getSuppliers = () => {
    setLoading(true);
    fetchSupplierAction({ query: `v1.0/supplier`, method: "get" });
    setLoading(false);
  };

  const getUserInBranch= () => {
    setLoading(true);

    fetchUserAction({
      query: `v1.0/branch/all-withUsers`,
      method: "get",
    });

    setLoading(false);
  };

  

  useEffect(() => {
    if (fetchBranchData?.success=== true) setBranches(fetchBranchData.branchList);
    if (fetchDepartmentData?.success=== true) setDepartments(fetchDepartmentData.list);
    if (fetchCategoryData?.success=== true) setCategories(fetchCategoryData.list);
    if (fetchSupplierData?.success=== true) setSuppliers(fetchSupplierData.supplierlist);
    if (fetchUserData?.success=== true) setUsersInBranch(fetchUserData.responses);

  }, [fetchBranchData, fetchDepartmentData, fetchCategoryData, fetchSupplierData]);


  // console.log("branch",branches);
  // console.log("de",departments);
  // console.log("cat",categories);
  // console.log("sup",suppliers);
  console.log("branch in context ",usersInBranch);


  const contextValue = {
    branches,
    departments,
    categories,
    suppliers,
    usersInBranch,
    authData,
     setAuthData,
    loading,
    errors: { fetchBranchError, fetchDepartmentError, fetchCategoryError, fetchSupplierError,fetchUserError },
  };

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};
