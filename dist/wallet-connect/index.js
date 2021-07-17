"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetNativeBalance = exports.Disconnect = exports.CallTransaction = exports.SendTransaction = exports.GetWallet = exports.XdcConnect = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _reactToastify = require("react-toastify");

var _walletConnect = _interopRequireDefault(require("./walletConnect"));

var _store = _interopRequireDefault(require("../../redux/store"));

var Wallet = _interopRequireWildcard(require("../../wallets"));

var actions = _interopRequireWildcard(require("../../actions/index"));

require("../../assets/scss/main.scss");

require("react-toastify/dist/ReactToastify.css");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var XdcConnect = function XdcConnect(props) {
  return /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
    store: _store.default
  }, /*#__PURE__*/_react.default.createElement(_reactToastify.ToastContainer, {
    className: "xdc-connect"
  }), /*#__PURE__*/_react.default.createElement(_walletConnect.default, props));
};

exports.XdcConnect = XdcConnect;
XdcConnect.propTypes = {
  onConnect: _propTypes.default.func,
  onDisconnect: _propTypes.default.func,
  onAddressChange: _propTypes.default.func,
  btnName: _propTypes.default.string,
  btnClass: _propTypes.default.string,
  disabled: _propTypes.default.bool
};
XdcConnect.defaultProps = {
  btnName: "CONNECT",
  btnClass: "btn btn-rounded btn-info",
  disabled: false
};

var GetWallet = function GetWallet() {
  return _store.default.getState();
};

exports.GetWallet = GetWallet;

var SendTransaction = function SendTransaction(tx) {
  return Wallet.SendTransaction(tx);
};

exports.SendTransaction = SendTransaction;

var CallTransaction = function CallTransaction(tx) {
  return Wallet.CallTransaction(tx);
};

exports.CallTransaction = CallTransaction;

var Disconnect = function Disconnect() {
  _store.default.dispatch(actions.WalletDisconnected());
};

exports.Disconnect = Disconnect;

var GetNativeBalance = function GetNativeBalance() {
  return Wallet.GetNativeBalance();
};

exports.GetNativeBalance = GetNativeBalance;