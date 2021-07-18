"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IsJsonRpcError = exports.BUILD_BLOCK_LINK = exports.ADDR_LINK = exports.BUILD_TX_LINK = exports.GetRevertReason = exports.IsValidAddress = exports.GetAccountFromKeystore = exports.GetAccountFromPK = exports.VerifyPrivateKey = exports.Sign = exports.Computehash = void 0;
var _excluded = ["nonce", "transferType"];

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Xdc3 = require("xdc3");

var Accounts = require("xdc3-eth-accounts");

var utils = Xdc3.utils;

var _require = require("./constant"),
    TransferType = _require.TransferType,
    DEFAULT_PROVIDER = _require.DEFAULT_PROVIDER;

var generateStub = function generateStub(type, params) {
  switch (type) {
    case TransferType.token:
      return {
        params: [params.to, params.amount, params.token]
      };

    case TransferType.native:
    default:
      return {
        params: [params.to, params.amount]
      };
  }
};

var Computehash = function Computehash(_ref) {
  var nonce = _ref.nonce,
      _ref$transferType = _ref.transferType,
      transferType = _ref$transferType === void 0 ? TransferType.native : _ref$transferType,
      params = _objectWithoutProperties(_ref, _excluded);

  var stub = generateStub(transferType, params);
  var hash = utils.soliditySha3.apply(utils, _toConsumableArray(stub.params).concat([nonce])).toString("hex");
  return hash;
};

exports.Computehash = Computehash;

var Sign = function Sign(privateKey, msg) {
  try {
    return new Accounts().sign(msg, privateKey);
  } catch (e) {
    return null;
  }
};

exports.Sign = Sign;

var VerifyPrivateKey = function VerifyPrivateKey(privateKey) {
  if (privateKey.startsWith("0x")) privateKey = privateKey.replace("0x", "");
  return /^[0-9a-fA-F]{64}$/.test(privateKey);
};

exports.VerifyPrivateKey = VerifyPrivateKey;

var GetAccountFromPK = function GetAccountFromPK(privateKey) {
  try {
    if (!privateKey.startsWith("0x")) privateKey = "0x" + privateKey;
    return new Accounts().privateKeyToAccount(privateKey);
  } catch (e) {
    return null;
  }
};

exports.GetAccountFromPK = GetAccountFromPK;

var GetAccountFromKeystore = function GetAccountFromKeystore(keystore, pwd) {
  try {
    if (typeof keystore !== "string") keystore = keystore.toString();
    return new Accounts().decrypt(keystore, pwd);
  } catch (e) {
    console.log(e);
    return null;
  }
};

exports.GetAccountFromKeystore = GetAccountFromKeystore;

var IsValidAddress = function IsValidAddress(address) {
  return utils.isAddress(address);
};

exports.IsValidAddress = IsValidAddress;

var GetRevertReason = function GetRevertReason(tx) {
  return new Promise(function (resolve, reject) {
    var xdc3 = new Xdc3(new Xdc3.providers.HttpProvider(DEFAULT_PROVIDER));
    xdc3.eth.call(tx).then(function (x) {
      console.log("x", x, utils.toAscii(x));
      var other = x.replace("0x", "").slice(8);
      var buf = Buffer.from(other, "hex");
      var reason = buf.toString().split("").filter(function (x) {
        return /^[a-zA-Z\d\s:]+$/i.test(x);
      }).join("");
      console.log(reason);
      resolve(reason);
    }).catch(reject);
  });
};

exports.GetRevertReason = GetRevertReason;

var BUILD_TX_LINK = function BUILD_TX_LINK(explorer, hash) {
  var retLink = "".concat(explorer);
  if (!retLink.endsWith("/")) retLink += "/";
  retLink += "tx/".concat(hash);
  return retLink;
};

exports.BUILD_TX_LINK = BUILD_TX_LINK;

var ADDR_LINK = function ADDR_LINK(explorer, addr) {
  var retLink = "".concat(explorer);
  if (!retLink.endsWith("/")) retLink += "/";
  retLink += "addr/".concat(addr);
  return retLink;
};

exports.ADDR_LINK = ADDR_LINK;

var BUILD_BLOCK_LINK = function BUILD_BLOCK_LINK(explorer, hash) {
  var retLink = "".concat(explorer);
  if (!retLink.endsWith("/")) retLink += "/";
  retLink += "block/".concat(hash);
  return retLink;
};

exports.BUILD_BLOCK_LINK = BUILD_BLOCK_LINK;

var IsJsonRpcError = function IsJsonRpcError(err) {
  return err.message.split("\n")[0] === "Internal JSON-RPC error.";
};

exports.IsJsonRpcError = IsJsonRpcError;