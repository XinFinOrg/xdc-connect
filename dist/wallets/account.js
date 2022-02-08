"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallTransaction = CallTransaction;
exports.SendTransaction = SendTransaction;

var _xdc = _interopRequireDefault(require("xdc3"));

var _lodash = _interopRequireDefault(require("lodash"));

var _store = _interopRequireDefault(require("../redux/store"));

var _crypto = require("../helpers/crypto");

var _constant = require("../helpers/constant");

var _miscellaneous = require("../helpers/miscellaneous");

var _math = require("../helpers/math");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 *
 * directly deals with an account represented in an object from Xdc3 / Web3
 *
 */
function SendTransaction(_x) {
  return _SendTransaction.apply(this, arguments);
}

function _SendTransaction() {
  _SendTransaction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(tx) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
                var data, _data$wallet, account, rpc_provider, _data$wallet$gasMulti, gasMultiplier, privateKey, provider, xdc3, gasLimit, gasPrice, reason, signed;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        data = _store.default.getState();
                        _data$wallet = data.wallet, account = _data$wallet.account, rpc_provider = _data$wallet.rpc_provider, _data$wallet$gasMulti = _data$wallet.gasMultiplier, gasMultiplier = _data$wallet$gasMulti === void 0 ? 1 : _data$wallet$gasMulti;
                        if (!account) reject("Account not loaded");
                        privateKey = account.privateKey;
                        if (_lodash.default.isEmpty(privateKey)) reject("Account not loaded");
                        provider = _constant.DEFAULT_PROVIDER;

                        if (rpc_provider) {
                          provider = rpc_provider;
                        }

                        xdc3 = new _xdc.default(new _xdc.default.providers.HttpProvider(provider));
                        _context.prev = 8;
                        _context.next = 11;
                        return (0, _miscellaneous.WithTimeout)(function () {
                          return xdc3.eth.estimateGas(tx);
                        }, {
                          timeout: 4999,
                          onTimeout: 5000000
                        });

                      case 11:
                        gasLimit = _context.sent;
                        _context.next = 21;
                        break;

                      case 14:
                        _context.prev = 14;
                        _context.t0 = _context["catch"](8);
                        _context.next = 18;
                        return (0, _crypto.GetRevertReason)(tx);

                      case 18:
                        reason = _context.sent;
                        reject({
                          message: reason
                        });
                        return _context.abrupt("return");

                      case 21:
                        _context.prev = 21;
                        _context.next = 24;
                        return xdc3.eth.getGasPrice();

                      case 24:
                        gasPrice = _context.sent;
                        gasPrice = (0, _math.RemoveExpo)(parseFloat(gasMultiplier) * parseFloat(gasPrice));
                        _context.next = 31;
                        break;

                      case 28:
                        _context.prev = 28;
                        _context.t1 = _context["catch"](21);
                        console.log(_context.t1);

                      case 31:
                        if (gasPrice && !isNaN(parseFloat(gasPrice)) && parseFloat(gasPrice) > 0) tx["gasPrice"] = gasPrice;
                        tx["gas"] = gasLimit;
                        _context.next = 35;
                        return xdc3.eth.accounts.signTransaction(tx, privateKey);

                      case 35:
                        signed = _context.sent;
                        xdc3.eth.sendSignedTransaction(signed.rawTransaction).once("receipt", function (receipt) {
                          if (receipt !== null) {
                            if (receipt.status) {
                              resolve(receipt);
                            } else {
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
                        });

                      case 37:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[8, 14], [21, 28]]);
              }));

              return function (_x3, _x4) {
                return _ref.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _SendTransaction.apply(this, arguments);
}

function CallTransaction(_x2) {
  return _CallTransaction.apply(this, arguments);
}

function _CallTransaction() {
  _CallTransaction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(tx) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", new Promise( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve, reject) {
                var data, _data$wallet2, account, rpc_provider, privateKey, provider, xdc3, gasLimit, reason;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        data = _store.default.getState();
                        _data$wallet2 = data.wallet, account = _data$wallet2.account, rpc_provider = _data$wallet2.rpc_provider;
                        if (!account) reject("Account not loaded");
                        privateKey = account.privateKey;
                        if (_lodash.default.isEmpty(privateKey)) reject("Account not loaded");
                        provider = _constant.DEFAULT_PROVIDER;

                        if (rpc_provider) {
                          provider = rpc_provider;
                        }

                        xdc3 = new _xdc.default(new _xdc.default.providers.HttpProvider(provider));
                        _context3.prev = 8;
                        _context3.next = 11;
                        return (0, _miscellaneous.WithTimeout)(function () {
                          return xdc3.eth.estimateGas(tx);
                        }, {
                          timeout: 4999,
                          onTimeout: 5000000
                        });

                      case 11:
                        gasLimit = _context3.sent;
                        _context3.next = 21;
                        break;

                      case 14:
                        _context3.prev = 14;
                        _context3.t0 = _context3["catch"](8);
                        _context3.next = 18;
                        return (0, _crypto.GetRevertReason)(tx);

                      case 18:
                        reason = _context3.sent;
                        reject({
                          message: reason
                        });
                        return _context3.abrupt("return");

                      case 21:
                        tx["gas"] = gasLimit;
                        xdc3.eth.call(tx).then(function (date) {
                          resolve(date);
                        }).catch(function (e) {
                          return reject(e);
                        });

                      case 23:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, null, [[8, 14]]);
              }));

              return function (_x5, _x6) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _CallTransaction.apply(this, arguments);
}