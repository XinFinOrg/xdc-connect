"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendTransaction = SendTransaction;
exports.CallTransaction = CallTransaction;

var _xdc = _interopRequireDefault(require("xdc3"));

var _lodash = _interopRequireDefault(require("lodash"));

var _store = _interopRequireDefault(require("../redux/store"));

var _crypto = require("../helpers/crypto");

var _constant = require("../helpers/constant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
                var data, account, privateKey, xdc3, gasLimit, reason, signed;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        data = _store.default.getState();
                        account = data.wallet.account;
                        if (!account) reject("Account not loaded");
                        privateKey = account.privateKey;
                        if (_lodash.default.isEmpty(privateKey)) reject("Account not loaded");
                        xdc3 = new _xdc.default(new _xdc.default.providers.HttpProvider(_constant.DEFAULT_PROVIDER));
                        _context.prev = 6;
                        _context.next = 9;
                        return xdc3.eth.estimateGas(tx);

                      case 9:
                        gasLimit = _context.sent;
                        _context.next = 19;
                        break;

                      case 12:
                        _context.prev = 12;
                        _context.t0 = _context["catch"](6);
                        _context.next = 16;
                        return (0, _crypto.GetRevertReason)(tx);

                      case 16:
                        reason = _context.sent;
                        reject({
                          message: reason
                        });
                        return _context.abrupt("return");

                      case 19:
                        tx["gas"] = gasLimit;
                        _context.next = 22;
                        return xdc3.eth.accounts.signTransaction(tx, privateKey);

                      case 22:
                        signed = _context.sent;
                        xdc3.eth.sendSignedTransaction(signed.rawTransaction).once("receipt", function (receipt) {
                          if (receipt !== null) {
                            if (receipt.status) {
                              resolve(receipt);
                            } else {
                              reject(receipt);
                            }
                          }
                        });

                      case 24:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[6, 12]]);
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
                var data, account, privateKey, xdc3, gasLimit, reason;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        data = _store.default.getState();
                        account = data.wallet.account;
                        if (!account) reject("Account not loaded");
                        privateKey = account.privateKey;
                        if (_lodash.default.isEmpty(privateKey)) reject("Account not loaded");
                        xdc3 = new _xdc.default(new _xdc.default.providers.HttpProvider(_constant.DEFAULT_PROVIDER));
                        _context3.prev = 6;
                        _context3.next = 9;
                        return xdc3.eth.estimateGas(tx);

                      case 9:
                        gasLimit = _context3.sent;
                        _context3.next = 19;
                        break;

                      case 12:
                        _context3.prev = 12;
                        _context3.t0 = _context3["catch"](6);
                        _context3.next = 16;
                        return (0, _crypto.GetRevertReason)(tx);

                      case 16:
                        reason = _context3.sent;
                        reject({
                          message: reason
                        });
                        return _context3.abrupt("return");

                      case 19:
                        tx["gas"] = gasLimit;
                        xdc3.eth.call(tx).then(function (date) {
                          resolve(date);
                        }).catch(function (e) {
                          return reject(e);
                        });

                      case 21:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, null, [[6, 12]]);
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