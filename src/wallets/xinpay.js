import Xdc3 from "xdc3";
import detectEthereumProvider from "@metamask/detect-provider";
import _ from "lodash";

import { GetRevertReason, IsJsonRpcError } from "../helpers/crypto";
import { HTTP_PROVIDER, LOADERS } from "../helpers/constant";

import * as actions from "../actions";
import store from "../redux/store";
import { toast } from "react-toastify";

let addresses, xdc3, addressChangeIntervalRef;

export function IsXdc3Supported() {
  return Boolean(window.ethereum);
}

export async function GetProvider() {
  const provider = await detectEthereumProvider();
  return provider;
}

export const MainnetProvider = () => {
  return new Xdc3.providers.HttpProvider(HTTP_PROVIDER[50]);
};

export const ApothemProvider = () => {
  return new Xdc3.providers.HttpProvider(HTTP_PROVIDER[50]);
};

export async function GetChainId() {
  let xdc3 = new Xdc3(await GetProvider());
  return await xdc3.eth.net.getId();
}

export async function initXdc3() {
  try {
    const isLocked = await IsLocked();
    if (isLocked === true) {
      toast("Please unlock XinPay wallet to continue", { autoClose: 2000 });
      return store.dispatch(actions.WalletDisconnected());
    }
    const isXdc3Supported = IsXdc3Supported();
    if (!isXdc3Supported) {
      toast(
        <div>
          XinPay not available in the browser. Please refer <a href="/">here</a>
        </div>,
        {
          autoClose: 2000,
        }
      );

      return store.dispatch(actions.WalletDisconnected());
    }
    if ((await GetCurrentProvider()) !== "xinpay") {
      toast(
        <div>
          XinPay not available in the browser. Please refer <a href="/">here</a>
        </div>,
        {
          autoClose: 2000,
        }
      );
      return store.dispatch(actions.WalletDisconnected());
    }
    // const isConnected = await window.ethereum.isConnected();
    await window.ethereum.enable();
    _initListerner();
    const provider = await GetProvider();
    xdc3 = new Xdc3(provider);
    const accounts = await xdc3.eth.getAccounts();
    addresses = accounts;
    const chain_id = await xdc3.eth.getChainId();
    return store.dispatch(
      actions.WalletConnected({
        address: accounts[0],
        chain_id,
        loader: LOADERS.Xinpay,
      })
    );
  } catch (e) {
    console.log(e);
  }
}

export function _initListerner() {
  window.ethereum.removeAllListeners();

  if (addressChangeIntervalRef) clearInterval(addressChangeIntervalRef);

  addressChangeIntervalRef = setInterval(async () => {
    const accounts = await xdc3.eth.getAccounts();
    if (_.isEqual(accounts, addresses)) return;
    console.log("accounts", accounts);
    addresses = accounts;
    store.dispatch(actions.AccountChanged(accounts[0]));
  }, 1000);

  window.ethereum.on("accountsChanged", async (data) => {
    const accounts = await xdc3.eth.getAccounts();
    console.log("accounts", accounts);
    addresses = accounts;
    store.dispatch(actions.AccountChanged(accounts[0]));
  });

  window.ethereum.on("chainChanged", async (data) => {
    const chain_id = await xdc3.eth.getChainId();
    store.dispatch(actions.NetworkChanged(chain_id));
  });

  window.ethereum.on("connect", async (data) => {
    xdc3 = new Xdc3(await GetProvider());
    const accounts = await xdc3.eth.getAccounts();
    const chain_id = await xdc3.eth.getChainId();
    addresses = accounts;
    return store.dispatch(
      actions.WalletConnected({
        address: accounts[0],
        chain_id,
        loader: LOADERS.Xinpay,
      })
    );
  });

  window.ethereum.on("disconnect", (data) => {
    console.log("disconnect", data);
    return store.dispatch(actions.WalletDisconnected());
  });

  window.ethereum.on("message", (data) => {
    console.log("message", data);
  });
}

export async function GetCurrentProvider() {
  if (IsXdc3Supported() !== true) return null;

  if (window.web3.currentProvider.isMetaMask) {
    const chainId = await GetChainId();
    if ([50, 51].includes(chainId)) return "xinpay";
    return "metamask";
  }

  if (window.web3.currentProvider.isTrust) return "trust";

  if (window.web3.currentProvider.isStatus) return "status";

  if (typeof window.SOFA !== "undefined") return "coinbase";

  if (typeof window.__CIPHER__ !== "undefined") return "cipher";

  if (window.web3.currentProvider.constructor.name === "EthereumProvider")
    return "mist";

  if (window.web3.currentProvider.constructor.name === "Xdc3FrameProvider")
    return "parity";

  if (
    window.web3.currentProvider.host &&
    window.web3.currentProvider.host.indexOf("infura") !== -1
  )
    return "infura";

  if (
    window.web3.currentProvider.host &&
    window.web3.currentProvider.host.indexOf("localhost") !== -1
  )
    return "localhost";

  return "unknown";
}

export const GetNativeBalance = (address) => {
  const xdc3 = new Xdc3(window.web3.currentProvider);
  return xdc3.eth.getBalance(address);
};

export async function SendTransaction(tx) {
  return new Promise((resolve, reject) => {
    GetProvider()
      .then(async (provider) => {
        const xdc3 = new Xdc3(provider);
        let gasLimit;

        try {
          gasLimit = await xdc3.eth.estimateGas(tx);
        } catch (e) {
          const reason = await GetRevertReason(tx);
          reject({ message: reason });
          return;
        }

        tx["gas"] = gasLimit;

        xdc3.eth.sendTransaction(tx).once("receipt", (receipt) => {
          if (receipt !== null) {
            if (receipt.status) {
              resolve(receipt);
            } else {
              reject(receipt);
            }
          }
        });
      })
      .catch((e) => {
        console.log(arguments, e);
        console.log("resp", IsJsonRpcError(e));
        console.log("resp", e);
        reject(e);
      });
  });
}

export async function CallTransaction(tx) {
  return new Promise((resolve, reject) => {
    GetProvider()
      .then(async (provider) => {
        const xdc3 = new Xdc3(provider);
        let gasLimit;

        try {
          gasLimit = await xdc3.eth.estimateGas(tx);
        } catch (e) {
          const reason = await GetRevertReason(tx);
          reject({ message: reason });
          return;
        }

        tx["gas"] = gasLimit;

        xdc3.eth
          .call(tx)
          .then((date) => {
            resolve(date);
          })
          .catch((e) => reject(e));
      })
      .catch((e) => {
        console.log(arguments, e);
        console.log("resp", IsJsonRpcError(e));
        console.log("resp", e);
        reject(e);
      });
  });
}

export async function IsLocked() {
  let xdc3 = new Xdc3(await GetProvider());
  const accounts = await xdc3.eth.getAccounts();
  return _.isEmpty(accounts);
}
