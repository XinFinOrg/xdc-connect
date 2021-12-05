"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallTransaction = void 0;
exports.GetNativeBalance = GetNativeBalance;
exports.SendTransaction = void 0;

var _xdc = _interopRequireDefault(require("xdc3"));

var _reactToastify = require("react-toastify");

var xinpay = _interopRequireWildcard(require("./xinpay"));

var account = _interopRequireWildcard(require("./account"));

var dcentInApp = _interopRequireWildcard(require("./dcentInAppBrowser"));

var _store = _interopRequireDefault(require("../redux/store"));

var _constant = require("../helpers/constant");

var _crypto = require("../helpers/crypto");

var _jsxRuntime = require("react/jsx-runtime");

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
    var data = _store.default.getState();

    var rpc_provider = data.wallet.rpc_provider;
    var provider = _constant.DEFAULT_PROVIDER;

    if (rpc_provider) {
      provider = rpc_provider;
    }

    var xdc3 = new _xdc.default(new _xdc.default.providers.HttpProvider(provider));

    if (!address) {
      var wallet = _store.default.getState();

      address = wallet.wallet.address;
    }

    xdc3.eth.getBalance(address).then(resolve).catch(reject);
  });
}

var SendTransaction = function SendTransaction(tx) {
  return new Promise(function (resolve, reject) {
    var wallet = _store.default.getState().wallet;

    var toastId = (0, _reactToastify.toast)("Processing TX ...", {
      position: "bottom-right",
      type: "processing-tx",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      closeButton: false
    });
    return GetFuncFromLoader(wallet.loader).SendTransaction(tx).then(function (resp) {
      if (resp.transactionHash) {
        var transactionHash = resp.transactionHash;
        (0, _reactToastify.toast)( /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: ["Success\xA0", /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
            href: (0, _crypto.BUILD_TX_LINK)(wallet.explorer, transactionHash),
            rel: "noreferrer",
            target: "_blank",
            children: "HASH"
          })]
        }), {
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
      var message = e.message || /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
        children: "Failing Transaction"
      });
      (0, _reactToastify.toast)( /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("b", {
          children: "Error"
        }), ":", message]
      }), {
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