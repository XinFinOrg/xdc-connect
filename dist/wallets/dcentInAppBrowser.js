"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallTransaction = CallTransaction;
exports.GetChainId = exports.DcentSupported = void 0;
exports.GetProvider = GetProvider;
exports.SendTransaction = SendTransaction;
exports._initListerner = _initListerner;
exports.initDcent = void 0;

var _xdc = _interopRequireDefault(require("xdc3"));

var _detectProvider = _interopRequireDefault(require("@metamask/detect-provider"));

var _reactToastify = require("react-toastify");

var _constant = require("../helpers/constant");

var _crypto = require("../helpers/crypto");

var actions = _interopRequireWildcard(require("../actions"));

var _store = _interopRequireDefault(require("../redux/store"));

var _miscellaneous = require("../helpers/miscellaneous");

var _math = require("../helpers/math");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var xdc3;

var DcentSupported = function DcentSupported() {
  return window.ethereum && window.ethereum.isDcentWallet === true;
};

exports.DcentSupported = DcentSupported;

var GetChainId = function GetChainId() {
  return window.ethereum.request({
    method: "net_version"
  });
};

exports.GetChainId = GetChainId;

function GetProvider() {
  return _GetProvider.apply(this, arguments);
}

function _GetProvider() {
  _GetProvider = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var provider;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _detectProvider.default)();

          case 2:
            provider = _context5.sent;
            return _context5.abrupt("return", provider);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _GetProvider.apply(this, arguments);
}

var initDcent = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var isSupported, chain_id, accounts;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            isSupported = DcentSupported();

            if (isSupported) {
              _context.next = 5;
              break;
            }

            (0, _reactToastify.toast)("Browser doesn't support DCent wallet, please open in In-App Browser of DCent");
            return _context.abrupt("return", _store.default.dispatch(actions.WalletDisconnected()));

          case 5:
            _context.next = 7;
            return window.ethereum.request({
              method: "eth_requestAccounts"
            });

          case 7:
            _context.t0 = _xdc.default;
            _context.next = 10;
            return GetProvider();

          case 10:
            _context.t1 = _context.sent;
            xdc3 = new _context.t0(_context.t1);

            _initListerner();

            _context.next = 15;
            return xdc3.eth.getChainId();

          case 15:
            chain_id = _context.sent;
            _context.next = 18;
            return xdc3.eth.getAccounts();

          case 18:
            accounts = _context.sent;
            console.log("chain_id", chain_id, accounts);
            return _context.abrupt("return", _store.default.dispatch(actions.WalletConnected({
              address: accounts[0],
              chain_id: chain_id,
              loader: _constant.LOADERS.DcentInApp,
              explorer: _constant.CHAIN_DATA[chain_id]
            })));

          case 23:
            _context.prev = 23;
            _context.t2 = _context["catch"](0);
            console.log(_context.t2);

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 23]]);
  }));

  return function initDcent() {
    return _ref.apply(this, arguments);
  };
}();

exports.initDcent = initDcent;

function _initListerner() {
  window.ethereum.removeAllListeners();
  window.ethereum.on("accountsChanged", /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(data) {
      var accounts;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return xdc3.eth.getAccounts();

            case 2:
              accounts = _context2.sent;

              _store.default.dispatch(actions.AccountChanged(accounts[0]));

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());
  window.ethereum.on("chainChanged", /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
      var chain_id;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return xdc3.eth.getChainId();

            case 2:
              chain_id = _context3.sent;

              _store.default.dispatch(actions.NetworkChanged(chain_id));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x2) {
      return _ref3.apply(this, arguments);
    };
  }());
  window.ethereum.on("connect", /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(data) {
      var accounts, chain_id;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.t0 = _xdc.default;
              _context4.next = 3;
              return GetProvider();

            case 3:
              _context4.t1 = _context4.sent;
              xdc3 = new _context4.t0(_context4.t1);
              _context4.next = 7;
              return xdc3.eth.getAccounts();

            case 7:
              accounts = _context4.sent;
              _context4.next = 10;
              return xdc3.eth.getChainId();

            case 10:
              chain_id = _context4.sent;
              return _context4.abrupt("return", _store.default.dispatch(actions.WalletConnected({
                address: accounts[0],
                chain_id: chain_id,
                loader: _constant.LOADERS.DcentInApp,
                explorer: _constant.CHAIN_DATA[chain_id]
              })));

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x3) {
      return _ref4.apply(this, arguments);
    };
  }());
  window.ethereum.on("disconnect", function (data) {
    console.log("disconnect", data);
    return _store.default.dispatch(actions.WalletDisconnected());
  });
  window.ethereum.on("message", function (data) {
    console.log("message", data);
  });
}

function SendTransaction(_x4) {
  return _SendTransaction.apply(this, arguments);
}

function _SendTransaction() {
  _SendTransaction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(tx) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(resolve, reject) {
                var xdc3, data, _data$wallet$gasMulti, gasMultiplier, gasLimit, gasPrice, reason;

                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.t0 = _xdc.default;
                        _context6.next = 3;
                        return GetProvider();

                      case 3:
                        _context6.t1 = _context6.sent;
                        xdc3 = new _context6.t0(_context6.t1);
                        data = _store.default.getState();
                        _data$wallet$gasMulti = data.wallet.gasMultiplier, gasMultiplier = _data$wallet$gasMulti === void 0 ? 1 : _data$wallet$gasMulti;
                        _context6.prev = 7;
                        _context6.next = 10;
                        return (0, _miscellaneous.WithTimeout)(function () {
                          return xdc3.eth.estimateGas(tx);
                        }, {
                          timeout: 4999,
                          onTimeout: 5000000
                        });

                      case 10:
                        gasLimit = _context6.sent;
                        _context6.next = 20;
                        break;

                      case 13:
                        _context6.prev = 13;
                        _context6.t2 = _context6["catch"](7);
                        _context6.next = 17;
                        return (0, _crypto.GetRevertReason)(tx);

                      case 17:
                        reason = _context6.sent;
                        reject({
                          message: reason
                        });
                        return _context6.abrupt("return");

                      case 20:
                        _context6.prev = 20;
                        _context6.next = 23;
                        return xdc3.eth.getGasPrice();

                      case 23:
                        gasPrice = _context6.sent;
                        gasPrice = (0, _math.RemoveExpo)(parseFloat(gasMultiplier) * parseFloat(gasPrice));
                        _context6.next = 30;
                        break;

                      case 27:
                        _context6.prev = 27;
                        _context6.t3 = _context6["catch"](20);
                        console.log(_context6.t3);

                      case 30:
                        if (gasPrice && !isNaN(parseFloat(gasPrice)) && parseFloat(gasPrice) > 0) tx["gasPrice"] = gasPrice;
                        tx["gas"] = gasLimit;
                        xdc3.eth.sendTransaction(tx).once("receipt", function (receipt) {
                          if (receipt !== null) {
                            if (receipt.status) {
                              resolve(receipt);
                            } else {
                              // reject(receipt);
                              xdc3.eth.getTransaction(receipt.transactionHash).then(function (tx) {
                                tx = _objectSpread({}, tx);
                                xdc3.eth.call(tx).then(function (x) {
                                  var other = x.replace("0x", "").slice(8);
                                  var buf = Buffer.from(other, "hex");
                                  reject({
                                    message: buf.toString()
                                  });
                                }).catch(function () {
                                  return reject({
                                    message: "Transaction Failed"
                                  });
                                });
                              });
                            }
                          }
                        }).on("error", function () {
                          reject({
                            message: "Transaction Failed"
                          });
                        });

                      case 33:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6, null, [[7, 13], [20, 27]]);
              }));

              return function (_x6, _x7) {
                return _ref5.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _SendTransaction.apply(this, arguments);
}

function CallTransaction(_x5) {
  return _CallTransaction.apply(this, arguments);
}

function _CallTransaction() {
  _CallTransaction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(tx) {
    var _arguments = arguments;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            return _context9.abrupt("return", new Promise(function (resolve, reject) {
              GetProvider().then( /*#__PURE__*/function () {
                var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(provider) {
                  var xdc3, gasLimit, reason;
                  return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                      switch (_context8.prev = _context8.next) {
                        case 0:
                          xdc3 = new _xdc.default(provider);
                          _context8.prev = 1;
                          _context8.next = 4;
                          return (0, _miscellaneous.WithTimeout)(function () {
                            return xdc3.eth.estimateGas(tx);
                          }, {
                            timeout: 4999,
                            onTimeout: 5000000
                          });

                        case 4:
                          gasLimit = _context8.sent;
                          _context8.next = 14;
                          break;

                        case 7:
                          _context8.prev = 7;
                          _context8.t0 = _context8["catch"](1);
                          _context8.next = 11;
                          return (0, _crypto.GetRevertReason)(tx);

                        case 11:
                          reason = _context8.sent;
                          reject({
                            message: reason
                          });
                          return _context8.abrupt("return");

                        case 14:
                          tx["gas"] = gasLimit;
                          xdc3.eth.call(tx).then(function (date) {
                            resolve(date);
                          }).catch(function (e) {
                            return reject(e);
                          });

                        case 16:
                        case "end":
                          return _context8.stop();
                      }
                    }
                  }, _callee8, null, [[1, 7]]);
                }));

                return function (_x8) {
                  return _ref6.apply(this, arguments);
                };
              }()).catch(function (e) {
                console.log(_arguments, e);
                console.log("resp", (0, _crypto.IsJsonRpcError)(e));
                console.log("resp", e);
                reject(e);
              });
            }));

          case 1:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _CallTransaction.apply(this, arguments);
}