import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import WalletConnect from "./wallet-connect/walletConnect";

import store from "../redux/store";
import * as Wallet from "../wallets";
import * as actions from "../actions/index";

import "../assets/scss/main.scss";
import "react-toastify/dist/ReactToastify.css";

export const XdcConnect = (props) => {
  return (
    <Provider store={store}>
      <ToastContainer className="xdc-connect" />
      <WalletConnect {...props} />
    </Provider>
  );
};

XdcConnect.propTypes = {
  onConnect: PropTypes.func,
  onDisconnect: PropTypes.func,
  onAddressChange: PropTypes.func,
  btnName: PropTypes.string,
  btnClass: PropTypes.string,
  disabled: PropTypes.bool,
  theme: PropTypes.oneOf(["light", "dark"]),
  defaultChainId: PropTypes.oneOf([50, 51, 551]),
  enabledProviders: PropTypes.arrayOf(PropTypes.string)
};

XdcConnect.defaultProps = {
  btnName: "CONNECT",
  btnClass: "btn btn-rounded btn-info",
  disabled: false,
  theme: "light",
};

export const GetWallet = () => {
  return store.getState();
};

export const SendTransaction = (tx) => {
  return Wallet.SendTransaction(tx);
};

export const CallTransaction = (tx) => {
  return Wallet.CallTransaction(tx);
};

export const Disconnect = () => {
  store.dispatch(actions.WalletDisconnected());
};

export const GetNativeBalance = () => {
  return Wallet.GetNativeBalance();
};
