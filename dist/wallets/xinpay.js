"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IsXdc3Supported = IsXdc3Supported;
exports.GetProvider = GetProvider;
exports.GetChainId = GetChainId;
exports.initXdc3 = initXdc3;
exports._initListerner = _initListerner;
exports.GetCurrentProvider = GetCurrentProvider;
exports.SendTransaction = SendTransaction;
exports.CallTransaction = CallTransaction;
exports.IsLocked = IsLocked;
exports.GetNativeBalance = exports.ApothemProvider = exports.MainnetProvider = void 0;

var _xdc = _interopRequireDefault(require("xdc3"));

var _detectProvider = _interopRequireDefault(require("@metamask/detect-provider"));

var _lodash = _interopRequireDefault(require("lodash"));

var _crypto = require("../helpers/crypto");

var _constant = require("../helpers/constant");

var actions = _interopRequireWildcard(require("../actions"));

var _store = _interopRequireDefault(require("../redux/store"));

var _reactToastify = require("react-toastify");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var addresses, xdc3, addressChangeIntervalRef;

function IsXdc3Supported() {
  return Boolean(window.ethereum);
}

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

var MainnetProvider = function MainnetProvider() {
  return new _xdc.default.providers.HttpProvider(_constant.HTTP_PROVIDER[50]);
};

exports.MainnetProvider = MainnetProvider;

var ApothemProvider = function ApothemProvider() {
  return new _xdc.default.providers.HttpProvider(_constant.HTTP_PROVIDER[50]);
};

exports.ApothemProvider = ApothemProvider;

function GetChainId() {
  return _GetChainId.apply(this, arguments);
}

function _GetChainId() {
  _GetChainId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var xdc3;
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
            _context6.next = 7;
            return xdc3.eth.net.getId();

          case 7:
            return _context6.abrupt("return", _context6.sent);

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _GetChainId.apply(this, arguments);
}

function initXdc3() {
  return _initXdc.apply(this, arguments);
}

function _initXdc() {
  _initXdc = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    var isLocked, isXdc3Supported, provider, accounts, chain_id;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return IsLocked();

          case 3:
            isLocked = _context7.sent;

            if (!(isLocked === true)) {
              _context7.next = 7;
              break;
            }

            (0, _reactToastify.toast)("Please unlock XinPay wallet to continue", {
              autoClose: 2000
            });
            return _context7.abrupt("return", _store.default.dispatch(actions.WalletDisconnected()));

          case 7:
            isXdc3Supported = IsXdc3Supported();

            if (isXdc3Supported) {
              _context7.next = 11;
              break;
            }

            (0, _reactToastify.toast)( /*#__PURE__*/React.createElement("div", null, "XinPay not available in the browser. Please refer ", /*#__PURE__*/React.createElement("a", {
              href: "/"
            }, "here")), {
              autoClose: 2000
            });
            return _context7.abrupt("return", _store.default.dispatch(actions.WalletDisconnected()));

          case 11:
            _context7.next = 13;
            return GetCurrentProvider();

          case 13:
            _context7.t0 = _context7.sent;

            if (!(_context7.t0 !== "xinpay")) {
              _context7.next = 17;
              break;
            }

            (0, _reactToastify.toast)( /*#__PURE__*/React.createElement("div", null, "XinPay not available in the browser. Please refer ", /*#__PURE__*/React.createElement("a", {
              href: "/"
            }, "here")), {
              autoClose: 2000
            });
            return _context7.abrupt("return", _store.default.dispatch(actions.WalletDisconnected()));

          case 17:
            _context7.next = 19;
            return window.ethereum.enable();

          case 19:
            _initListerner();

            _context7.next = 22;
            return GetProvider();

          case 22:
            provider = _context7.sent;
            xdc3 = new _xdc.default(provider);
            _context7.next = 26;
            return xdc3.eth.getAccounts();

          case 26:
            accounts = _context7.sent;
            addresses = accounts;
            _context7.next = 30;
            return xdc3.eth.getChainId();

          case 30:
            chain_id = _context7.sent;
            return _context7.abrupt("return", _store.default.dispatch(actions.WalletConnected({
              address: accounts[0],
              chain_id: chain_id,
              loader: _constant.LOADERS.Xinpay,
              explorer: _constant.CHAIN_DATA[chain_id]
            })));

          case 34:
            _context7.prev = 34;
            _context7.t1 = _context7["catch"](0);
            console.log(_context7.t1);

          case 37:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 34]]);
  }));
  return _initXdc.apply(this, arguments);
}

function _initListerner() {
  window.ethereum.removeAllListeners();
  if (addressChangeIntervalRef) clearInterval(addressChangeIntervalRef);
  addressChangeIntervalRef = setInterval( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var accounts;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return xdc3.eth.getAccounts();

          case 2:
            accounts = _context.sent;

            if (!_lodash.default.isEqual(accounts, addresses)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return");

          case 5:
            console.log("accounts", accounts);
            addresses = accounts;

            _store.default.dispatch(actions.AccountChanged(accounts[0]));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), 1000);
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
              console.log("accounts", accounts);
              addresses = accounts;

              _store.default.dispatch(actions.AccountChanged(accounts[0]));

            case 6:
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
              addresses = accounts;
              return _context4.abrupt("return", _store.default.dispatch(actions.WalletConnected({
                address: accounts[0],
                chain_id: chain_id,
                loader: _constant.LOADERS.Xinpay,
                explorer: _constant.CHAIN_DATA[chain_id]
              })));

            case 13:
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

function GetCurrentProvider() {
  return _GetCurrentProvider.apply(this, arguments);
}

function _GetCurrentProvider() {
  _GetCurrentProvider = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    var chainId;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            if (!(IsXdc3Supported() !== true)) {
              _context8.next = 2;
              break;
            }

            return _context8.abrupt("return", null);

          case 2:
            if (!window.web3.currentProvider.isMetaMask) {
              _context8.next = 9;
              break;
            }

            _context8.next = 5;
            return GetChainId();

          case 5:
            chainId = _context8.sent;

            if (![50, 51].includes(chainId)) {
              _context8.next = 8;
              break;
            }

            return _context8.abrupt("return", "xinpay");

          case 8:
            return _context8.abrupt("return", "metamask");

          case 9:
            if (!window.web3.currentProvider.isTrust) {
              _context8.next = 11;
              break;
            }

            return _context8.abrupt("return", "trust");

          case 11:
            if (!window.web3.currentProvider.isStatus) {
              _context8.next = 13;
              break;
            }

            return _context8.abrupt("return", "status");

          case 13:
            if (!(typeof window.SOFA !== "undefined")) {
              _context8.next = 15;
              break;
            }

            return _context8.abrupt("return", "coinbase");

          case 15:
            if (!(typeof window.__CIPHER__ !== "undefined")) {
              _context8.next = 17;
              break;
            }

            return _context8.abrupt("return", "cipher");

          case 17:
            if (!(window.web3.currentProvider.constructor.name === "EthereumProvider")) {
              _context8.next = 19;
              break;
            }

            return _context8.abrupt("return", "mist");

          case 19:
            if (!(window.web3.currentProvider.constructor.name === "Xdc3FrameProvider")) {
              _context8.next = 21;
              break;
            }

            return _context8.abrupt("return", "parity");

          case 21:
            if (!(window.web3.currentProvider.host && window.web3.currentProvider.host.indexOf("infura") !== -1)) {
              _context8.next = 23;
              break;
            }

            return _context8.abrupt("return", "infura");

          case 23:
            if (!(window.web3.currentProvider.host && window.web3.currentProvider.host.indexOf("localhost") !== -1)) {
              _context8.next = 25;
              break;
            }

            return _context8.abrupt("return", "localhost");

          case 25:
            return _context8.abrupt("return", "unknown");

          case 26:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _GetCurrentProvider.apply(this, arguments);
}

var GetNativeBalance = function GetNativeBalance(address) {
  var xdc3 = new _xdc.default(window.web3.currentProvider);
  return xdc3.eth.getBalance(address);
};

exports.GetNativeBalance = GetNativeBalance;

function SendTransaction(_x4) {
  return _SendTransaction.apply(this, arguments);
}

function _SendTransaction() {
  _SendTransaction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(tx) {
    var _arguments = arguments;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            return _context11.abrupt("return", new Promise(function (resolve, reject) {
              GetProvider().then( /*#__PURE__*/function () {
                var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(provider) {
                  var xdc3, gasLimit, reason;
                  return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                      switch (_context10.prev = _context10.next) {
                        case 0:
                          xdc3 = new _xdc.default(provider);
                          _context10.prev = 1;
                          _context10.next = 4;
                          return xdc3.eth.estimateGas(tx);

                        case 4:
                          gasLimit = _context10.sent;
                          _context10.next = 14;
                          break;

                        case 7:
                          _context10.prev = 7;
                          _context10.t0 = _context10["catch"](1);
                          _context10.next = 11;
                          return (0, _crypto.GetRevertReason)(tx);

                        case 11:
                          reason = _context10.sent;
                          reject({
                            message: reason
                          });
                          return _context10.abrupt("return");

                        case 14:
                          tx["gas"] = gasLimit;
                          xdc3.eth.sendTransaction(tx, function (err, hash) {
                            if (err) reject(err);
                            var interval = setInterval( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                              var receipt;
                              return regeneratorRuntime.wrap(function _callee9$(_context9) {
                                while (1) {
                                  switch (_context9.prev = _context9.next) {
                                    case 0:
                                      _context9.prev = 0;
                                      _context9.next = 3;
                                      return xdc3.eth.getTransactionReceipt(hash);

                                    case 3:
                                      receipt = _context9.sent;

                                      if (receipt !== null) {
                                        if (receipt.status) {
                                          clearInterval(interval);
                                          resolve(receipt);
                                        } else {
                                          clearInterval(interval);
                                          reject(receipt);
                                        }
                                      }

                                      _context9.next = 11;
                                      break;

                                    case 7:
                                      _context9.prev = 7;
                                      _context9.t0 = _context9["catch"](0);
                                      clearInterval(interval);
                                      reject(_context9.t0);

                                    case 11:
                                    case "end":
                                      return _context9.stop();
                                  }
                                }
                              }, _callee9, null, [[0, 7]]);
                            })), 2000);
                          });

                        case 16:
                        case "end":
                          return _context10.stop();
                      }
                    }
                  }, _callee10, null, [[1, 7]]);
                }));

                return function (_x6) {
                  return _ref5.apply(this, arguments);
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
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return _SendTransaction.apply(this, arguments);
}

function CallTransaction(_x5) {
  return _CallTransaction.apply(this, arguments);
}

function _CallTransaction() {
  _CallTransaction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(tx) {
    var _arguments2 = arguments;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            return _context13.abrupt("return", new Promise(function (resolve, reject) {
              GetProvider().then( /*#__PURE__*/function () {
                var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(provider) {
                  var xdc3, gasLimit, reason;
                  return regeneratorRuntime.wrap(function _callee12$(_context12) {
                    while (1) {
                      switch (_context12.prev = _context12.next) {
                        case 0:
                          xdc3 = new _xdc.default(provider);
                          _context12.prev = 1;
                          _context12.next = 4;
                          return xdc3.eth.estimateGas(tx);

                        case 4:
                          gasLimit = _context12.sent;
                          _context12.next = 14;
                          break;

                        case 7:
                          _context12.prev = 7;
                          _context12.t0 = _context12["catch"](1);
                          _context12.next = 11;
                          return (0, _crypto.GetRevertReason)(tx);

                        case 11:
                          reason = _context12.sent;
                          reject({
                            message: reason
                          });
                          return _context12.abrupt("return");

                        case 14:
                          tx["gas"] = gasLimit;
                          xdc3.eth.call(tx).then(function (date) {
                            resolve(date);
                          }).catch(function (e) {
                            return reject(e);
                          });

                        case 16:
                        case "end":
                          return _context12.stop();
                      }
                    }
                  }, _callee12, null, [[1, 7]]);
                }));

                return function (_x7) {
                  return _ref7.apply(this, arguments);
                };
              }()).catch(function (e) {
                console.log(_arguments2, e);
                console.log("resp", (0, _crypto.IsJsonRpcError)(e));
                console.log("resp", e);
                reject(e);
              });
            }));

          case 1:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));
  return _CallTransaction.apply(this, arguments);
}

function IsLocked() {
  return _IsLocked.apply(this, arguments);
}

function _IsLocked() {
  _IsLocked = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
    var xdc3, accounts;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.t0 = _xdc.default;
            _context14.next = 3;
            return GetProvider();

          case 3:
            _context14.t1 = _context14.sent;
            xdc3 = new _context14.t0(_context14.t1);
            _context14.next = 7;
            return xdc3.eth.getAccounts();

          case 7:
            accounts = _context14.sent;
            return _context14.abrupt("return", _lodash.default.isEmpty(accounts));

          case 9:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));
  return _IsLocked.apply(this, arguments);
}