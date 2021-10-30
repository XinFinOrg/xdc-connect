"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var types = _interopRequireWildcard(require("../../actions/types"));

var _constant = require("../../helpers/constant");

var _math = require("../../helpers/math");

var _excluded = ["address", "chain_id", "loader"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }

var initialState = {
  connected: false,
  address: "",
  chain_id: null,
  valid_network: false,
  explorer: "",
  rpc_provider: "",
  ws_provider: "",
  loader: "",
  account: null
};

var WalletReducer = function WalletReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var payload = arguments.length > 1 ? arguments[1] : undefined;

  switch (payload.type) {
    case types.WALLET_CONNECTED:
      {
        var _payload$payload = payload.payload,
            address = _payload$payload.address,
            chain_id = _payload$payload.chain_id,
            loader = _payload$payload.loader,
            rst = _objectWithoutProperties(_payload$payload, _excluded);

        var valid_network = false;
        if (String(chain_id).startsWith("0x") && (0, _math.IsHex)(chain_id)) parseInt(chain_id, 16), _readOnlyError("chain_id");

        if (_constant.VALID_CHAINS.includes(chain_id)) {
          valid_network = true;
        }

        return _objectSpread(_objectSpread({}, state), {}, {
          connected: true,
          address: address,
          chain_id: chain_id,
          loader: loader,
          valid_network: valid_network
        }, rst);
      }

    case types.WALLET_DISCONNECTED:
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          connected: false
        });
      }

    case types.WALLET_ADDRESS_CHANGED:
      {
        var _address = payload.payload.address;
        return _objectSpread(_objectSpread({}, state), {}, {
          address: _address
        });
      }

    case types.WALLET_CHAIN_CHANGED:
      {
        var _chain_id = payload.payload.chain_id;
        return _objectSpread(_objectSpread({}, state), {}, {
          chain_id: _chain_id
        });
      }

    case types.NETWORK_VALID:
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          valid_network: true
        });
      }

    case types.NETWORK_INVALID:
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          valid_network: false
        });
      }

    default:
      return state;
  }
};

var _default = WalletReducer;
exports.default = _default;