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
  const toastContainer = props.addToastContainer ? (
    props.toastContainer ? (
      props.toastContainer
    ) : (
      <ToastContainer className="xdc-connect" />
    )
  ) : (
    ""
  );

  return (
    <Provider store={store}>
      {toastContainer}
      <WalletConnect {...props} />
    </Provider>
  );
};

XdcConnect.propTypes = {
  onConnect: PropTypes.func,
  onDisconnect: PropTypes.func,
  onAddressChange: PropTypes.func,
  onNetworkChange: PropTypes.func,
  showButton: PropTypes.bool,
  btnName: PropTypes.string,
  btnClass: PropTypes.string,
  disabled: PropTypes.bool,
  theme: PropTypes.oneOf(["light", "dark"]),
  defaultChainId: PropTypes.oneOf([50, 51, 551]),
  enabledProviders: PropTypes.arrayOf(PropTypes.string),
  addToastContainer: PropTypes.bool,
  rpcProvider: PropTypes.string,
  wsProvider: PropTypes.string,
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

export const ForceShowModal = () => {
  store.dispatch(actions.ForceShowModal());
};

export const ForceCloseModal = () => {
  store.dispatch(actions.ForceCloseModal());
};

export const GetNativeBalance = () => {
  return Wallet.GetNativeBalance();
};
