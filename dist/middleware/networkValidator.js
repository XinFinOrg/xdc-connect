"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetworkValidation = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var types = _interopRequireWildcard(require("../actions/types"));

var actions = _interopRequireWildcard(require("../actions"));

var _constant = require("../helpers/constant");

var _math = require("../helpers/math");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NetworkValidation = function NetworkValidation(store) {
  return function (next) {
    return function (action) {
      next(action);
      console.log("action.type", action.type);

      if ([types.WALLET_CONNECTED, types.WALLET_CHAIN_CHANGED, types.WALLET_ADDRESS_CHANGED].includes(action.type)) {
        var address = action.payload.address;
        if (_lodash.default.isUndefined(address)) store.dispatch(actions.WalletDisconnected());else {
          var chain_id = action.payload.chain_id;

          if (!_lodash.default.isUndefined(chain_id)) {
            if (String(chain_id).startsWith("0x") && (0, _math.IsHex)(chain_id)) chain_id = parseInt(chain_id, 16);

            if (_constant.VALID_CHAINS.includes(chain_id)) {
              store.dispatch(actions.NetworkValid());
            } else {
              store.dispatch(actions.NetworkInValid());
            }
          }
        }
      }
    };
  };
};

exports.NetworkValidation = NetworkValidation;