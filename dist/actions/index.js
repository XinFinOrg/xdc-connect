"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WalletOpened = exports.WalletDisconnected = exports.WalletConnected = exports.SetWsProvider = exports.SetRpcProvider = exports.SetChainData = exports.NetworkValid = exports.NetworkInValid = exports.NetworkChanged = exports.AccountChanged = void 0;

var _constant = require("../helpers/constant");

var Types = _interopRequireWildcard(require("./types"));

var _excluded = ["address", "chain_id", "loader"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var WalletConnected = function WalletConnected(_ref) {
  var address = _ref.address,
      chain_id = _ref.chain_id,
      loader = _ref.loader,
      rst = _objectWithoutProperties(_ref, _excluded);

  return {
    type: Types.WALLET_CONNECTED,
    payload: _objectSpread({
      address: address,
      chain_id: chain_id,
      loader: loader
    }, rst)
  };
};

exports.WalletConnected = WalletConnected;

var WalletOpened = function WalletOpened() {
  return {
    type: Types.WALLET_OPENED
  };
};

exports.WalletOpened = WalletOpened;

var NetworkChanged = function NetworkChanged(chain_id) {
  return {
    type: Types.WALLET_CHAIN_CHANGED,
    payload: {
      chain_id: chain_id
    }
  };
};

exports.NetworkChanged = NetworkChanged;

var AccountChanged = function AccountChanged(address) {
  return {
    type: Types.WALLET_ADDRESS_CHANGED,
    payload: {
      address: address
    }
  };
};

exports.AccountChanged = AccountChanged;

var WalletDisconnected = function WalletDisconnected() {
  return {
    type: Types.WALLET_DISCONNECTED
  };
};

exports.WalletDisconnected = WalletDisconnected;

var NetworkValid = function NetworkValid() {
  return {
    type: Types.NETWORK_VALID
  };
};

exports.NetworkValid = NetworkValid;

var SetChainData = function SetChainData(chain_id) {
  return {
    type: Types.SET_CHAIN_DATA,
    payload: _constant.CHAIN_DATA["".concat(chain_id)]
  };
};

exports.SetChainData = SetChainData;

var NetworkInValid = function NetworkInValid() {
  return {
    type: Types.NETWORK_INVALID
  };
};

exports.NetworkInValid = NetworkInValid;

var SetRpcProvider = function SetRpcProvider(rpc_provider) {
  return {
    type: Types.SET_RPC_PROVIDER,
    payload: rpc_provider
  };
};

exports.SetRpcProvider = SetRpcProvider;

var SetWsProvider = function SetWsProvider(ws_provider) {
  return {
    type: Types.SET_WS_PROVIDER,
    payload: ws_provider
  };
};

exports.SetWsProvider = SetWsProvider;