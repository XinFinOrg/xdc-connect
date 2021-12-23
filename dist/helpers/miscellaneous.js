"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithTimeout = exports.ObjToArr = exports.IsJson = exports.FilterStructResp = void 0;

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

var WithTimeout = function WithTimeout(cb) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    timeout: 4999,
    onTimeout: undefined
  },
      _ref$timeout = _ref.timeout,
      timeout = _ref$timeout === void 0 ? 5000 : _ref$timeout,
      _ref$onTimeout = _ref.onTimeout,
      onTimeout = _ref$onTimeout === void 0 ? undefined : _ref$onTimeout;

  return new Promise(function (resolve, reject) {
    var int = setTimeout(function () {
      if (onTimeout) return resolve(onTimeout);
      reject("timeout");
    }, timeout);
    cb().then(function (resp) {
      clearTimeout(int);
      resolve(resp);
    }).catch(reject);
  });
};

exports.WithTimeout = WithTimeout;
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