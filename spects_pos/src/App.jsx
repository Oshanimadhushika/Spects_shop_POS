import React from "react";
import RouterSet from "./routerSet/RouterSet";
import { DataProvider } from "./context/DataContext";
import { ItemContextProvider } from "./context/ItemContext";
import { SettingContextProvider } from "./context/SettingContext";

function App() {
  return (
    <DataProvider>
      <ItemContextProvider>
        <SettingContextProvider>
          <RouterSet />
        </SettingContextProvider>
      </ItemContextProvider>
    </DataProvider>
  );
}

export default App;
