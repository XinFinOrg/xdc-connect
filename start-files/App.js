import React, { useState } from "react";
import Xdc3 from "xdc3";
import { XdcConnect, Disconnect, CallTransaction } from "./components/";
// import "./App.css";

const address = "xdc50d366a72012dfddae856e5e4525e8d01b698560";
const ABI = [
  {
    constant: true,
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

function App() {
  const [wallet, setwallet] = useState({});

  return (
    <div className="App">
      <XdcConnect
        displayType="grid"
        btnClass={
          wallet.connected
            ? "btn btn-rounded btn-success"
            : "btn btn-rounded btn-warning"
        }
        btnName={wallet.connected ? "CONNECTED" : "CONNECT"}
        onConnect={(wallet) => {
          console.log("user connected wallet", wallet);
          const xdc3 = new Xdc3(
            new Xdc3.providers.HttpProvider("https://rpc.xinfin.network")
          );
          const contract = new xdc3.eth.Contract(ABI, address);
          const data = contract.methods.tokenURI(1).encodeABI();
          const tx = {
            to: address,
            data: data,
          };
          xdc3.eth.call(tx).then(console.log);
          CallTransaction(tx).then((x) => {
            console.log(xdc3.utils.hexToAscii(x));
            console.log(xdc3.eth.abi.decodeParameter("string", x));
          });
          setwallet(wallet);
        }}
        onDisconnect={(wallet) => {
          console.log("user connected disconnect", wallet);
          setwallet(wallet);
        }}
      />
      {wallet.connected ? <button onClick={Disconnect}>Logout</button> : ""}
    </div>
  );
}

export default App;
