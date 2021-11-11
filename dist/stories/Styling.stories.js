"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Default = exports.CustomizeButton = exports.CustomModalTheme = void 0;

var _react = _interopRequireDefault(require("react"));

var _components = require("../components");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  title: "XdcConnect/Styling",
  component: _components.XdcConnect
};
exports.default = _default;

var Template = function Template(args) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.XdcConnect, _objectSpread({}, args));
};

var Default = Template.bind({});
exports.Default = Default;
Default.args = {};
var CustomizeButton = Template.bind({});
exports.CustomizeButton = CustomizeButton;
CustomizeButton.args = {
  btnName: "Click To Connect",
  btnClass: "btn btn-warning",
  disabled: false
};
var CustomModalTheme = Template.bind({});
exports.CustomModalTheme = CustomModalTheme;
CustomModalTheme.args = {
  theme: "dark",
  btnClass: "btn btn-warning"
};