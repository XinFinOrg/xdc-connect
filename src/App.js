import React from "react";

import { XdcConnect } from "./components/wallet-connect";

function App() {
  return (
    <XdcConnect
      onConnect={(x) => {
        console.log("connected :)", x);
      }}
      btnName="CONNECT"
      btnClass="btn btn-rounded btn-info"
    />
  );
}

export default App;
