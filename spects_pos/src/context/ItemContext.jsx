import React, { createContext, useState, useEffect } from "react";
import { Modal, Table } from "antd";
import useFetch from "../hooks/useFetch";
import useNotification from "../hooks/useNotification";

export const ItemContext = createContext();

export const ItemContextProvider = ({ children }) => {
  const { notifyError, notifySuccess } = useNotification();
  const [itemData, setItemData] = useState(null);
  const [isItemTableVisible, setIsItemTableVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const {
    fetchData: fetchSearchData,
    fetchAction: fetchSearch,
    fetchError: fetchSearchError,
  } = useFetch();

  useEffect(() => {
    handleSearchItem({ keyword: "" });
  }, []);

  // search item
  const handleSearchItem = async (values) => {
    const searchKey = values.keyword ? values.keyword : "";

    const data = {
      searchKey,
    };

    fetchSearch({
      query: `v1.0/item`,
      params: data,
      method: "get",
    });

    // if (!searchKey) {
    //   form.resetFields();
    // }
  };

  useEffect(() => {
    if (fetchSearchData) {
      if (fetchSearchData.success === true) {
        setItemData(fetchSearchData.itemList);
        // setIsItemTableVisible(true); 
      } else {
        notifyError(fetchSearchData.data);
      }
    }
  }, [fetchSearchData, fetchSearchError]);

  const handleRowClick = (record) => {
    setIsItemTableVisible(false); 
    setSelectedItem(record);
  };

  const columns = [
    { title: "Code", dataIndex: "itemCode", key: "itemCode" },
    { title: "BarCode", dataIndex: "barcode", key: "barcode" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Department", dataIndex: ["department", "departmentName"], key: "department" }, 
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Supplier", dataIndex: ["supplierList",  "supName"], key: "supplier" },
    { title: "Cost", dataIndex: "cost", key: "cost" },
    { title: "Profit", dataIndex: "profit", key: "profit" },
    { title: "Sales Price", dataIndex: "salePrice", key: "salesPrice" }, 
    { title: "Discount Rs", dataIndex: "discount", key: "discount" },
    { title: "Wholesale", dataIndex: "wholesalePrice", key: "wholesale" }, 
    { title: "Location", dataIndex: "location", key: "location" },
  
  ];
  

  const contextValue = {
    itemData,
    setItemData,
    handleSearchItem,
    isItemTableVisible,
   setIsItemTableVisible,
   selectedItem,
   setSelectedItem
  };

  return (
    <ItemContext.Provider value={contextValue}>
      {children}
      <Modal
        title="Item List"
        open={isItemTableVisible}
        onCancel={() => setIsItemTableVisible(false)}
        footer={null}
        width={1000}
      >
        <Table
          columns={columns}
          dataSource={itemData}
          rowKey="id"
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          pagination={false}
          scroll={{ x: 1200 }}
        />
      </Modal>
    </ItemContext.Provider>
  );
};
