import React, { createContext, useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';

export const SettingContext = createContext();

export const SettingContextProvider = ({ children }) => {
  // States for settings
  const [brands, setBrands] = useState([]);
  const [coatings, setCoatings] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [lensTypes, setLensTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch hooks
  const {
    fetchData: fetchBrandData,
    fetchAction: fetchBrandAction,
    fetchError: fetchBrandError,
  } = useFetch();

  const {
    fetchData: fetchCoatingData,
    fetchAction: fetchCoatingAction,
    fetchError: fetchCoatingError,
  } = useFetch();

  const {
    fetchData: fetchDesignData,
    fetchAction: fetchDesignAction,
    fetchError: fetchDesignError,
  } = useFetch();

  const {
    fetchData: fetchLensTypeData,
    fetchAction: fetchLensTypeAction,
    fetchError: fetchLensTypeError,
  } = useFetch();

  // Fetch data on component mount
  useEffect(() => {
    getBrands();
    getCoatings();
    getDesigns();
    getLensTypes();
  }, []);

  const getBrands = () => {
    setLoading(true);
    fetchBrandAction({ query: `v1.0/settings/brand`, method: "get" });
    setLoading(false);
  };

  const getCoatings = () => {
    setLoading(true);
    fetchCoatingAction({ query: `v1.0/settings/coating`, method: "get" });
    setLoading(false);
  };

  const getDesigns = () => {
    setLoading(true);
    fetchDesignAction({ query: `v1.0/settings/design`, method: "get" });
    setLoading(false);
  };

  const getLensTypes = () => {
    setLoading(true);
    fetchLensTypeAction({ query: `v1.0/settings/lens-type`, method: "get" });
    setLoading(false);
  };

  console.log(brands);
  console.log(coatings);
  console.log(designs);
  console.log(lensTypes);

  // Set state when data is successfully fetched
  useEffect(() => {
    if (fetchBrandData?.success) setBrands(fetchBrandData.list);
    if (fetchCoatingData?.success) setCoatings(fetchCoatingData.list);
    if (fetchDesignData?.success) setDesigns(fetchDesignData.list);
    if (fetchLensTypeData?.success) setLensTypes(fetchLensTypeData.list);
  }, [
    fetchBrandData,
    fetchCoatingData,
    fetchDesignData,
    fetchLensTypeData,
  ]);

  const contextValue = {
    brands,
    coatings,
    designs,
    lensTypes,
    loading,
    errors: {
      fetchBrandError,
      fetchCoatingError,
      fetchDesignError,
      fetchLensTypeError,
    },
  };

  return <SettingContext.Provider value={contextValue}>{children}</SettingContext.Provider>;
};
