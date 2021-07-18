"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetNativeBalance = GetNativeBalance;
exports.CallTransaction = exports.SendTransaction = void 0;

var _xdc = _interopRequireDefault(require("xdc3"));

var _reactToastify = require("react-toastify");

var xinpay = _interopRequireWildcard(require("./xinpay"));

var account = _interopRequireWildcard(require("./account"));

var dcentInApp = _interopRequireWildcard(require("./dcentInAppBrowser"));

var _store = _interopRequireDefault(require("../redux/store"));

var _constant = require("../helpers/constant");

var _crypto = require("../helpers/crypto");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GetFuncFromLoader(loader) {
  switch (loader) {
    case _constant.LOADERS.Xinpay:
      return xinpay;

    case _constant.LOADERS.Keystore:
      return account;

    case _constant.LOADERS.Privatekey:
      return account;

    case _constant.LOADERS.DcentInApp:
      return dcentInApp;

    default:
      return xinpay;
  }
}
/**
 *
 *
 * @note directly get from default provider
 *
 */


function GetNativeBalance(address) {
  return new Promise(function (resolve, reject) {
    var xdc3 = new _xdc.default(new _xdc.default.providers.HttpProvider(_constant.DEFAULT_PROVIDER));

    if (!address) {
      var wallet = _store.default.getState();

      address = wallet.wallet.address;
    }

    xdc3.eth.getBalance(address).then(resolve).catch(reject);
  });
}

var SendTransaction = function SendTransaction(tx) {
  return new Promise(function (resolve, reject) {
    var loader = _store.default.getState().wallet.loader;

    var toastId;
    return GetFuncFromLoader(loader).SendTransaction(tx).then(function (resp) {
      if (resp.transactionHash) {
        var transactionHash = resp.transactionHash;
        (0, _reactToastify.toast)( /*#__PURE__*/React.createElement("div", null, "Sucsess\xA0", /*#__PURE__*/React.createElement("a", {
          href: (0, _crypto.BUILD_TX_LINK)(_constant.EXPLORER, transactionHash),
          rel: "noreferrer",
          target: "_blank"
        }, "HASH")), {
          position: "bottom-right",
          type: "success-tx",
          autoClose: false,
          hideProgressBar: false,
          closeButton: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      }

      resolve(resp);
    }).catch(function (e) {
      console.log("resp", (0, _crypto.IsJsonRpcError)(e));
      console.log("resp", e, e.message);
      var message = e.message || /*#__PURE__*/React.createElement(React.Fragment, null, "Failing Transaction");
      (0, _reactToastify.toast)( /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Error"), ":", message), {
        position: "bottom-right",
        type: "error",
        autoClose: false,
        hideProgressBar: false,
        closeButton: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      reject(e);
    }).finally(function () {
      if (toastId) _reactToastify.toast.dismiss(toastId);
    });
  });
};

exports.SendTransaction = SendTransaction;

var CallTransaction = function CallTransaction(tx) {
  var loader = _store.default.getState().wallet.loader;

  return GetFuncFromLoader(loader).CallTransaction(tx);
};

exports.CallTransaction = CallTransaction;