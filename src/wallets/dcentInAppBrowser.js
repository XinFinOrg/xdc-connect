import Xdc3 from "xdc3";
import detectEthereumProvider from "@metamask/detect-provider";
import { toast } from "react-toastify";

import { CHAIN_DATA, LOADERS } from "../helpers/constant";

import { GetRevertReason, IsJsonRpcError } from "../helpers/crypto";
import * as actions from "../actions";
import store from "../redux/store";
import { WithTimeout } from "../helpers/miscellaneous";

let xdc3;

export const DcentSupported = () => {
  return window.ethereum && window.ethereum.isDcentWallet === true;
};

export const GetChainId = () => {
  return window.ethereum.request({ method: "net_version" });
};

export async function GetProvider() {
  const provider = await detectEthereumProvider();
  return provider;
}

export const initDcent = async () => {
  try {
    const isSupported = DcentSupported();
    if (!isSupported) {
      toast(
        "Browser doesn't support DCent wallet, please open in In-App Browser of DCent"
      );
      return store.dispatch(actions.WalletDisconnected());
    }
    await window.ethereum.request({ method: "eth_requestAccounts" });
    xdc3 = new Xdc3(await GetProvider());
    _initListerner();
    const chain_id = await xdc3.eth.getChainId();
    const accounts = await xdc3.eth.getAccounts();
    console.log("chain_id", chain_id, accounts);
    return store.dispatch(
      actions.WalletConnected({
        address: accounts[0],
        chain_id,
        loader: LOADERS.DcentInApp,
        explorer: CHAIN_DATA[chain_id],
      })
    );
  } catch (e) {
    console.log(e);
  }
};

export function _initListerner() {
  window.ethereum.removeAllListeners();

  window.ethereum.on("accountsChanged", async (data) => {
    const accounts = await xdc3.eth.getAccounts();
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
    return store.dispatch(
      actions.WalletConnected({
        address: accounts[0],
        chain_id,
        loader: LOADERS.DcentInApp,
        explorer: CHAIN_DATA[chain_id],
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

export async function SendTransaction(tx) {
  return new Promise(async (resolve, reject) => {
    const xdc3 = new Xdc3(await GetProvider());

    let gasLimit;

    try {
      gasLimit = await WithTimeout(() => xdc3.eth.estimateGas(tx), {
        timeout: 4999,
        onTimeout: 500000,
      });
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
          // reject(receipt);
          xdc3.eth.getTransaction(receipt.transactionHash).then((tx) => {
            tx = { ...tx };
            xdc3.eth
              .call(tx)
              .then((x) => {
                const other = x.replace("0x", "").slice(8);
                const buf = Buffer.from(other, "hex");
                reject({ message: buf.toString() });
              })
              .catch(() => reject({ message: "Transaction Failed" }));
          });
        }
      }
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
          gasLimit = await WithTimeout(() => xdc3.eth.estimateGas(tx), {
            timeout: 4999,
            onTimeout: 500000,
          });
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
