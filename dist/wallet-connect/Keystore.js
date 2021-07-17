"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _crypto = require("../../helpers/crypto");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ImportFromFilerBodyComponent = function ImportFromFilerBodyComponent(_ref) {
  var cb = _ref.cb,
      defaultPath = _ref.defaultPath;
  var fileReader;
  (0, _react.useEffect)(function () {
    if (defaultPath) {
      handleFileChosen(defaultPath);
    }
  });

  var handleFileRead = function handleFileRead() {
    var content = fileReader.result;
    cb(content);
  };

  var handleFileChosen = function handleFileChosen(file) {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("input", {
    className: "form-file-input form-control",
    type: "file",
    id: "input-file",
    accept: ".json",
    onChange: function onChange(e) {
      return handleFileChosen(e.target.files[0]);
    }
  }));
};

var Keystore = function Keystore(_ref2) {
  var cb = _ref2.cb,
      back = _ref2.back;

  var _useState = (0, _react.useState)(""),
      _useState2 = _slicedToArray(_useState, 2),
      keystore = _useState2[0],
      setKeystore = _useState2[1];

  var _useState3 = (0, _react.useState)(""),
      _useState4 = _slicedToArray(_useState3, 2),
      pwd = _useState4[0],
      setPwd = _useState4[1];

  var _useState5 = (0, _react.useState)(""),
      _useState6 = _slicedToArray(_useState5, 2),
      statusMessage = _useState6[0],
      setStatusMessage = _useState6[1];

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-header border-bottom-0"
  }, /*#__PURE__*/_react.default.createElement("h5", {
    className: "modal-title",
    id: "exampleModalLabel"
  }, "Connect with Key Store")), /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-body"
  }, /*#__PURE__*/_react.default.createElement("form", {
    className: ""
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement(ImportFromFilerBodyComponent, {
    cb: setKeystore
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: ""
  }, statusMessage), /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement("label", null, "Password"), /*#__PURE__*/_react.default.createElement("input", {
    type: "password",
    className: "form-control",
    placeholder: "Enter Password",
    value: pwd,
    onChange: function onChange(x) {
      return setPwd(x.target.value);
    }
  })), /*#__PURE__*/_react.default.createElement("button", {
    className: "btn btn-rounded btn-info mb-2",
    onClick: function onClick(e) {
      e.preventDefault();
      var account = (0, _crypto.GetAccountFromKeystore)(keystore, pwd);

      if (account === null) {
        setStatusMessage("Invalid Password / Keystore");
      } else {
        setStatusMessage("Successfully got the account");
      }

      cb(account);
    }
  }, "Submit"), /*#__PURE__*/_react.default.createElement("div", null))), /*#__PURE__*/_react.default.createElement("div", {
    className: "modal-footer border-top-0 d-flex justify-content-center"
  }, /*#__PURE__*/_react.default.createElement("button", {
    onClick: back,
    type: "button",
    className: "back",
    "data-dismiss": "modal"
  }, "Back")));
};

var _default = Keystore;
exports.default = _default;