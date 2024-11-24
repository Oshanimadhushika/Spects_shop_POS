
import React, { createContext, useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import useNotification from '../hooks/useNotification';

// Create the BranchContext
export const UsersInLoggedBranchContext = createContext();

const UsersInLoggedBranchContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [branchId, setBranchId] = useState(null);
  const {
    fetchData,
    fetchAction,
    fetchError,
  } = useFetch();
  const { notifyError } = useNotification();


  useEffect(() => {

    const loggedData = JSON.parse(localStorage.getItem('loggedData'));
    // console.log("logged data",loggedData);
    // console.log("logged branch",loggedData.branchId);


    if (loggedData && loggedData.branchId) {
      const loggedBranchId = loggedData.branchId; 
      setBranchId(loggedBranchId); 
      fetchUsers(loggedBranchId); 
    }
  }, []);

  const fetchUsers =() => {
   
      fetchAction({
        query: 'v1.0/user/',
        method: 'get', 
      });

   
  };


  useEffect(() => {
    if (fetchData) {
      if (fetchData.success === true) {
        const filteredUsers = fetchData.list
        .filter(user => user.branches.some(branch => branch.id === branchId)) 
        .map(user => ({
          id: user.id,
          userName: user.userName,
          // userRole: user.userRole,
          // mobileNo: user.mobileNo,
          // branches: user.branches,
        }));
        // console.log("filterd user",filteredUsers);

      setUsers(filteredUsers);
    //   console.log("users in logged branch",users);

      } else {
        notifyError("Error fetchig Users..!!");
      }
    }
  }, [fetchData, fetchError]);


  

  return (
    <UsersInLoggedBranchContext.Provider value={{ users, branchId }}>
      {children}
    </UsersInLoggedBranchContext.Provider>
  );
};

export default UsersInLoggedBranchContextProvider;

