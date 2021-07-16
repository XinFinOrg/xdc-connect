import Xdc3 from "xdc3";

import _ from "lodash";

import store from "../redux/store";
import { GetRevertReason } from "../helpers/crypto";
import { DEFAULT_PROVIDER } from "../helpers/constant";

/**
 *
 * directly deals with an account represented in an object from Xdc3 / Web3
 *
 */

export async function SendTransaction(tx) {
  return new Promise(async (resolve, reject) => {
    const data = store.getState();
    const { account } = data.wallet;
    if (!account) reject("Account not loaded");
    const { privateKey } = account;
    if (_.isEmpty(privateKey)) reject("Account not loaded");

    const xdc3 = new Xdc3(new Xdc3.providers.HttpProvider(DEFAULT_PROVIDER));

    let gasLimit;

    try {
      gasLimit = await xdc3.eth.estimateGas(tx);
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
            reject(receipt);
          }
        }
      });
  });
}

export async function CallTransaction(tx) {
  return new Promise(async (resolve, reject) => {
    const data = store.getState();
    const { account } = data.wallet;
    if (!account) reject("Account not loaded");
    const { privateKey } = account;
    if (_.isEmpty(privateKey)) reject("Account not loaded");

    const xdc3 = new Xdc3(new Xdc3.providers.HttpProvider(DEFAULT_PROVIDER));

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
  });
}
