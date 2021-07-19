import React, { useState, useEffect } from "react";
import { toXdcAddress } from "xdc3-utils";

import { XdcConnect, GetWallet, Disconnect } from "../components";

import "./style.css";

import docsPage from "./docs/listener.mdx";

export default {
  title: "XdcConnect/Functionality",
  component: XdcConnect,
  parameters: {
    docs: {
      page: docsPage,
      source: {
        type: 'code',
      }
    },
  },
};

function RenderWallet(wallet) {
  return (
    <div>
      <table>
        <tr>
          <td>address</td>
          <td>{toXdcAddress(wallet.address)}</td>
        </tr>
        <tr>
          <td>connected</td>
          <td>{`${wallet.connected}`}</td>
        </tr>
        <tr>
          <td>chain_id</td>
          <td>{wallet.chain_id}</td>
        </tr>
        <tr>
          <td>valid_network</td>
          <td>{`${wallet.valid_network}`}</td>
        </tr>
        <tr>
          <td>explorer</td>
          <td>{wallet.explorer}</td>
        </tr>
        <tr>
          <td>rpc_provider</td>
          <td>{wallet.rpc_provider}</td>
        </tr>
        <tr>
          <td>loader</td>
          <td>{wallet.loader}</td>
        </tr>
        <tr>
          <td>account</td>
          <td>{wallet.account}</td>
        </tr>
      </table>
    </div>
  );
}

const Template = (events) => {
  const [btnText, setbtnText] = useState("Connect");
  const [btnClass, setbtnClass] = useState("btn btn-warning");
  const [wallet, setWallet] = useState(GetWallet());

  useEffect(() => {
    Disconnect();
  });

  return (
    <div>
      <XdcConnect
        onConnect={(wallet) => {
          setbtnText("conneected !");
          setbtnClass("btn btn-success");
          setWallet(wallet);

          events.onConnect && events.onConnect(wallet);
        }}
        btnName={btnText}
        btnClass={btnClass}
      />

      {wallet.connected ? RenderWallet(wallet) : ""}
    </div>
  );
};

export const Listeners = Template.bind({});
Listeners.args = {
  onConnect: (wallet) => console.log("connected", wallet),
};

const Template2 = () => {
  const [wallet, setwallet] = useState({});

  console.log("wallet", wallet);

  return (
    <div className="App">
      <XdcConnect
        btnClass={
          wallet.connected
            ? "btn btn-rounded btn-success"
            : "btn btn-rounded btn-warning"
        }
        btnName={wallet.connected ? "CONNECTED" : "CONNECT"}
        onConnect={(wallet) => {
          console.log("user connected wallet", wallet);
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
};

export const UsingAPI = Template2.bind({});
