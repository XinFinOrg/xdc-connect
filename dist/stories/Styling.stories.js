"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomizeButton = exports.Default = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _components = require("../components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  title: "XdcConnect/Styling",
  component: _components.XdcConnect
};
exports.default = _default;

var Template = function Template(args) {
  return /*#__PURE__*/_react.default.createElement(_components.XdcConnect, args);
};

var Default = Template.bind({});
exports.Default = Default;
Default.args = {};
var CustomizeButton = Template.bind({});
exports.CustomizeButton = CustomizeButton;
CustomizeButton.args = {
  btnName: "Click To Connect",
  btnClass: "btn btn-warning"
};