// DataContext.js
import React, { createContext, useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
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

  useEffect(() => {
    getBranches();
    getDepartments();
    getCategories();
    getSuppliers();
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

  // console.log(branches);
  // console.log(departments);
  // console.log(categories);
  // console.log(suppliers);

  

  useEffect(() => {
    if (fetchBranchData?.success) setBranches(fetchBranchData.branchList);
    if (fetchDepartmentData?.success) setDepartments(fetchDepartmentData.list);
    if (fetchCategoryData?.success) setCategories(fetchCategoryData.list);
    if (fetchSupplierData?.success) setSuppliers(fetchSupplierData.supplierlist);
  }, [fetchBranchData, fetchDepartmentData, fetchCategoryData, fetchSupplierData]);

  const contextValue = {
    branches,
    departments,
    categories,
    suppliers,
    loading,
    errors: { fetchBranchError, fetchDepartmentError, fetchCategoryError, fetchSupplierError },
  };

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};
