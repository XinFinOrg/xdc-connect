"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Listeners = exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _components = require("../components");

require("./style.css");

var _listener = _interopRequireDefault(require("./docs/listener.mdx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _default = {
  title: "XdcConnect/Functionality",
  component: _components.XdcConnect,
  parameters: {
    docs: {
      page: _listener.default
    }
  }
};
exports.default = _default;

function RenderWallet(wallet) {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("table", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, "address"), /*#__PURE__*/_react.default.createElement("td", null, wallet.address)), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, "connected"), /*#__PURE__*/_react.default.createElement("td", null, "".concat(wallet.connected))), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, "chain_id"), /*#__PURE__*/_react.default.createElement("td", null, wallet.chain_id)), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, "valid_network"), /*#__PURE__*/_react.default.createElement("td", null, "".concat(wallet.valid_network))), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, "explorer"), /*#__PURE__*/_react.default.createElement("td", null, wallet.explorer)), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, "rpc_provider"), /*#__PURE__*/_react.default.createElement("td", null, wallet.rpc_provider)), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, "loader"), /*#__PURE__*/_react.default.createElement("td", null, wallet.loader)), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, "account"), /*#__PURE__*/_react.default.createElement("td", null, wallet.account))));
}

var Template = function Template(events) {
  var _useState = (0, _react.useState)("Connect"),
      _useState2 = _slicedToArray(_useState, 2),
      btnText = _useState2[0],
      setbtnText = _useState2[1];

  var _useState3 = (0, _react.useState)("btn btn-warning"),
      _useState4 = _slicedToArray(_useState3, 2),
      btnClass = _useState4[0],
      setbtnClass = _useState4[1];

  var _useState5 = (0, _react.useState)((0, _components.GetWallet)()),
      _useState6 = _slicedToArray(_useState5, 2),
      wallet = _useState6[0],
      setWallet = _useState6[1];

  (0, _react.useEffect)(function () {
    (0, _components.Disconnect)();
  });
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_components.XdcConnect, {
    onConnect: function onConnect(wallet) {
      setbtnText("conneected !");
      setbtnClass("btn btn-success");
      setWallet(wallet);
      events.onConnect && events.onConnect(wallet);
    },
    btnName: btnText,
    btnClass: btnClass
  }), wallet.connected ? RenderWallet(wallet) : "");
};

var Listeners = Template.bind({});
exports.Listeners = Listeners;
Listeners.args = {
  onConnect: function onConnect(wallet) {
    return console.log("connected", wallet);
  }
};