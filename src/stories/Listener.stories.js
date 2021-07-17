import React, { useState, useEffect } from "react";

import {
  XdcConnect,
  GetWallet,
  Disconnect,
} from "../components/wallet-connect";

import "./style.css";

import docsPage from "./docs/listener.mdx";

export default {
  title: "XdcConnect/Functionality",
  component: XdcConnect,
  parameters: {
    docs: {
      page: docsPage,
    },
  },
};

function RenderWallet(wallet) {
  return (
    <div>
      <table>
        <tr>
          <td>address</td>
          <td>{wallet.address}</td>
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
