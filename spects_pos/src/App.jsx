import React from "react";
import RouterSet from "./routerSet/RouterSet";
import { DataProvider } from "./context/DataContext";
import { ItemContextProvider } from "./context/ItemContext";
import { SettingContextProvider } from "./context/SettingContext";
import UsersInLoggedBranchContextProvider from "./context/UsersInLoggedBranchContext";

function App() {
  return (
    <DataProvider>
      <ItemContextProvider>
        <SettingContextProvider>
          <UsersInLoggedBranchContextProvider>
            <RouterSet />
          </UsersInLoggedBranchContextProvider>
        </SettingContextProvider>
      </ItemContextProvider>
    </DataProvider>
  );
}

export default App;
