"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IsJson = exports.FilterStructResp = exports.ObjToArr = void 0;

var ObjToArr = function ObjToArr(obj) {
  return Object.keys(obj).map(function (key) {
    return obj[key];
  });
};

exports.ObjToArr = ObjToArr;

var FilterStructResp = function FilterStructResp(obj) {
  return Object.keys(obj).filter(function (e, i) {
    if (i < Object.keys(obj).length / 2) return false;
    return true;
  }).reduce(function (acc, key) {
    acc[key] = obj[key];
    return acc;
  }, {});
};

exports.FilterStructResp = FilterStructResp;

var IsJson = function IsJson(abi) {
  try {
    JSON.parse(abi);
  } catch (e) {
    return false;
  }

  return true;
};

exports.IsJson = IsJson;
Object.defineProperty(Object.prototype, "partialMatch", {
  value: function value(fields) {
    for (var _i = 0, _Object$keys = Object.keys(fields); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];

      if (Object.keys(this).includes(key)) {
        if (this[key] === fields[key]) continue;
        return false;
      } else {
        return false;
      }
    }

    return true;
  }
});
Object.defineProperty(Array.prototype, "includesPartial", {
  value: function value(fields) {
    for (var i = 0; i < this.length; i++) {
      var obj = this[i];
      console.log("objobj", obj);

      if (obj.partialMatch(fields)) {
        return i;
      }
    }

    return null;
  }
});