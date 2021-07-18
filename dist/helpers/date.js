"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormatSecondsTwo = exports.FormatSeconds = exports.GetTimerData = exports.TIMER_FORMAT = exports.DateStringFormat = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var DateStringFormat = function DateStringFormat(date) {
  date = new Date(date);
  if (_.isDate(date)) return "".concat(date.getDate(), "-").concat(date.getMonth() + 1, "-").concat(date.getFullYear(), " ").concat(date.getHours(), ":").concat(date.getMinutes());
  return date;
};

exports.DateStringFormat = DateStringFormat;
var TIMER_FORMAT = "DD:HH:MM::SS";
exports.TIMER_FORMAT = TIMER_FORMAT;

var GetTimerData = function GetTimerData(seconds) {
  var days = Math.floor(seconds / 86400);
  var hours = Math.floor(seconds % 86400 / 3600);
  var minutes = Math.floor(seconds % 86400 % 3600 / 60);
  var sec = Math.floor(seconds % 86400 % 3600 % 60);
  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: sec
  };
};

exports.GetTimerData = GetTimerData;

var FormatSeconds = function FormatSeconds(seconds) {
  var _GetTimerData = GetTimerData(seconds),
      days = _GetTimerData.days,
      hours = _GetTimerData.hours,
      minutes = _GetTimerData.minutes,
      sec = _GetTimerData.seconds;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
    className: "timer",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: "days",
      children: days
    }), ":", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: "hours",
      children: hours
    }), ":", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: "minutes",
      children: minutes
    }), "::", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: "seconds",
      children: sec
    })]
  });
};

exports.FormatSeconds = FormatSeconds;

var FormatSecondsTwo = function FormatSecondsTwo(seconds) {
  var _GetTimerData2 = GetTimerData(seconds),
      days = _GetTimerData2.days,
      hours = _GetTimerData2.hours,
      minutes = _GetTimerData2.minutes,
      sec = _GetTimerData2.seconds;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
    className: "timer",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      className: "days",
      children: ["D:\xA0", days]
    }), "\xA0\xA0", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: "hours",
      children: ToDoubleDigit(hours)
    }), ":", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: "minutes",
      children: ToDoubleDigit(minutes)
    }), ":", /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: "seconds",
      children: ToDoubleDigit(sec)
    })]
  });
};

exports.FormatSecondsTwo = FormatSecondsTwo;