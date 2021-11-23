"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _xdc = _interopRequireDefault(require("xdc3"));

var _components = require("./components/");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// import "./App.css";
var address = "xdc50d366a72012dfddae856e5e4525e8d01b698560";
var ABI = [{
  constant: true,
  inputs: [{
    name: "tokenId",
    type: "uint256"
  }],
  name: "tokenURI",
  outputs: [{
    name: "",
    type: "string"
  }],
  payable: false,
  stateMutability: "view",
  type: "function"
}];

function App() {
  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      wallet = _useState2[0],
      setwallet = _useState2[1];

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "App",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_components.XdcConnect, {
      displayType: "grid",
      btnClass: wallet.connected ? "btn btn-rounded btn-success" : "btn btn-rounded btn-warning",
      btnName: wallet.connected ? "CONNECTED" : "CONNECT",
      onConnect: function onConnect(wallet) {
        console.log("user connected wallet", wallet);
        var xdc3 = new _xdc.default(new _xdc.default.providers.HttpProvider("https://rpc.xinfin.network"));
        var contract = new xdc3.eth.Contract(ABI, address);
        var data = contract.methods.tokenURI(1).encodeABI();
        var tx = {
          to: address,
          data: data
        };
        xdc3.eth.call(tx).then(console.log);
        (0, _components.CallTransaction)(tx).then(function (x) {
          console.log(xdc3.utils.hexToAscii(x));
          console.log(xdc3.eth.abi.decodeParameter("string", x));
        });
        setwallet(wallet);
      },
      onDisconnect: function onDisconnect(wallet) {
        console.log("user connected disconnect", wallet);
        setwallet(wallet);
      }
    }), wallet.connected ? /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      onClick: _components.Disconnect,
      children: "Logout"
    }) : ""]
  });
}

var _default = App;
exports.default = _default;