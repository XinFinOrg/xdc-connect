"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormatSecondsTwo = exports.FormatSeconds = exports.GetTimerData = exports.TIMER_FORMAT = exports.DateStringFormat = void 0;

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

  return /*#__PURE__*/React.createElement("span", {
    className: "timer"
  }, /*#__PURE__*/React.createElement("span", {
    className: "days"
  }, days), ":", /*#__PURE__*/React.createElement("span", {
    className: "hours"
  }, hours), ":", /*#__PURE__*/React.createElement("span", {
    className: "minutes"
  }, minutes), "::", /*#__PURE__*/React.createElement("span", {
    className: "seconds"
  }, sec));
};

exports.FormatSeconds = FormatSeconds;

var FormatSecondsTwo = function FormatSecondsTwo(seconds) {
  var _GetTimerData2 = GetTimerData(seconds),
      days = _GetTimerData2.days,
      hours = _GetTimerData2.hours,
      minutes = _GetTimerData2.minutes,
      sec = _GetTimerData2.seconds;

  return /*#__PURE__*/React.createElement("span", {
    className: "timer"
  }, /*#__PURE__*/React.createElement("span", {
    className: "days"
  }, "D:\xA0", days), "\xA0\xA0", /*#__PURE__*/React.createElement("span", {
    className: "hours"
  }, ToDoubleDigit(hours)), ":", /*#__PURE__*/React.createElement("span", {
    className: "minutes"
  }, ToDoubleDigit(minutes)), ":", /*#__PURE__*/React.createElement("span", {
    className: "seconds"
  }, ToDoubleDigit(sec)));
};

exports.FormatSecondsTwo = FormatSecondsTwo;