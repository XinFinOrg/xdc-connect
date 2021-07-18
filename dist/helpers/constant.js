"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EXPLORER = exports.DEFAULT_PROVIDER = exports.DEFAULT_CHAIN_ID = exports.HTTP_PROVIDER = exports.CHAIN_DATA = exports.NETWORK_NAME = exports.VALID_CHAINS = exports.LOADERS = void 0;
var LOADERS = {
  Xinpay: "xinpay",
  Keystore: "keystore",
  Privatekey: "privatekey",
  MetaMask: "metamask",
  DcentInApp: "dcent-inapp"
};
exports.LOADERS = LOADERS;
var VALID_CHAINS = [50, 51];
exports.VALID_CHAINS = VALID_CHAINS;
var NETWORK_NAME = {
  50: "XinFin",
  51: "Apothem"
};
exports.NETWORK_NAME = NETWORK_NAME;
var CHAIN_DATA = {
  "0x32": "https://explorer.xinfin.network",
  "0x33": "https://explorer.apothem.network",
  50: "https://explorer.xinfin.network",
  51: "https://explorer.apothem.network"
};
exports.CHAIN_DATA = CHAIN_DATA;
var HTTP_PROVIDER = {
  50: "https://rpc.xinfin.network",
  51: "https://rpc.apothem.network"
};
exports.HTTP_PROVIDER = HTTP_PROVIDER;
var DEFAULT_CHAIN_ID = 50;
exports.DEFAULT_CHAIN_ID = DEFAULT_CHAIN_ID;
var DEFAULT_PROVIDER = HTTP_PROVIDER[VALID_CHAINS[0]];
exports.DEFAULT_PROVIDER = DEFAULT_PROVIDER;
var EXPLORER = CHAIN_DATA[DEFAULT_CHAIN_ID];
exports.EXPLORER = EXPLORER;