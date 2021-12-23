import Xdc3 from "xdc3";

import _ from "lodash";

import store from "../redux/store";
import { GetRevertReason } from "../helpers/crypto";
import { DEFAULT_PROVIDER } from "../helpers/constant";
import { WithTimeout } from "../helpers/miscellaneous";

/**
 *
 * directly deals with an account represented in an object from Xdc3 / Web3
 *
 */

export async function SendTransaction(tx) {
  return new Promise(async (resolve, reject) => {
    const data = store.getState();
    const { account, rpc_provider } = data.wallet;
    if (!account) reject("Account not loaded");
    const { privateKey } = account;
    if (_.isEmpty(privateKey)) reject("Account not loaded");

    let provider = DEFAULT_PROVIDER;

    if (rpc_provider) {
      provider = rpc_provider;
    }

    const xdc3 = new Xdc3(new Xdc3.providers.HttpProvider(provider));

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

    const signed = await xdc3.eth.accounts.signTransaction(tx, privateKey);

    xdc3.eth
      .sendSignedTransaction(signed.rawTransaction)
      .once("receipt", (receipt) => {
        if (receipt !== null) {
          if (receipt.status) {
            resolve(receipt);
          } else {
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
  return new Promise(async (resolve, reject) => {
    const data = store.getState();
    const { account, rpc_provider } = data.wallet;
    if (!account) reject("Account not loaded");
    const { privateKey } = account;
    if (_.isEmpty(privateKey)) reject("Account not loaded");

    let provider = DEFAULT_PROVIDER;

    if (rpc_provider) {
      provider = rpc_provider;
    }

    const xdc3 = new Xdc3(new Xdc3.providers.HttpProvider(provider));

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
  });
}
