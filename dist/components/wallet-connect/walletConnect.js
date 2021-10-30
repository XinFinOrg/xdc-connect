"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _reactBootstrap = require("react-bootstrap");

var _reactToastify = require("react-toastify");

var _Keystore = _interopRequireDefault(require("./Keystore"));

var _PrivateKey = _interopRequireDefault(require("./PrivateKey"));

var _xinpay = require("../../wallets/xinpay");

var _dcentInAppBrowser = require("../../wallets/dcentInAppBrowser");

var _xinpayLogo = _interopRequireDefault(require("../../assets/img/wallets/xinpay-logo.png"));

var _privatekeyLogo = _interopRequireDefault(require("../../assets/img/wallets/privatekey-logo.png"));

var _keystoreLogo = _interopRequireDefault(require("../../assets/img/wallets/keystore-logo.png"));

var _dcentLogo = _interopRequireDefault(require("../../assets/img/wallets/dcent-logo.png"));

var _constant = require("../../helpers/constant");

var actions = _interopRequireWildcard(require("../../actions"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Provider = {
  menu: "menu",
  keystore: "keystore",
  privateKey: "privatekey"
};

var WalletConnect = /*#__PURE__*/function (_React$Component) {
  _inherits(WalletConnect, _React$Component);

  var _super = _createSuper(WalletConnect);

  function WalletConnect(props) {
    var _this;

    _classCallCheck(this, WalletConnect);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "accountCallback", function (loader) {
      return function (account) {
        if (account === null) (0, _reactToastify.toast)("error while loading wallet", {
          autoClose: 2000,
          type: "error"
        });else {
          _this.props.WalletConnected({
            account: account,
            chain_id: _this.defaultChainId,
            address: account.address,
            loader: loader,
            explorer: _constant.CHAIN_DATA[_this.defaultChainId]
          });

          _this.setState({
            showModal: false,
            providerSelected: Provider.menu
          });
        }
      };
    });

    _this.state = {
      showModal: false,
      providerSelected: Provider.menu
    };
    _this.defaultChainId = _this.props.defaultChainId && _constant.VALID_CHAINS.includes(_this.props.defaultChainId) || _constant.DEFAULT_CHAIN_ID;
    _this.enabledProviders = _this.props.enabledProviders || Object.keys(_constant.LOADERS).map(function (x) {
      return _constant.LOADERS[x];
    });
    return _this;
  }

  _createClass(WalletConnect, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.wallet.connected !== this.props.wallet.connected && this.props.wallet.connected) {
        this.setState({
          showModal: false
        });
        this.props.onConnect && this.props.onConnect(this.props.wallet);
      }

      if (prevProps.wallet.connected === this.props.wallet.connected && this.props.wallet.connected && prevProps.wallet.chain_id !== this.props.wallet.chain_id) {
        this.props.onNetworkChange && this.props.onNetworkChange(this.props.wallet);
      }

      if (prevProps.wallet.connected === true && this.props.wallet.connected === false) {
        this.props.onDisconnect && this.props.onDisconnect(this.props.wallet);
      }

      if (prevProps.wallet.address !== this.props.wallet.address && this.props.wallet.address) {
        this.props.onAddressChange && this.props.onAddressChange(this.props.wallet);
      }
    }
  }, {
    key: "RenderWalletProvider",
    value: function RenderWalletProvider() {
      var _this2 = this;

      if (this.state.providerSelected === Provider.menu) return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "modal-content",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "modal-header border-bottom-0",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h5", {
            className: "modal-title",
            id: "exampleModalLabel",
            children: "Connect to a wallet"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            type: "button",
            className: "close",
            onClick: function onClick() {
              return _this2.setState({
                showModal: false
              });
            },
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
              "aria-hidden": "true",
              children: "\xD7"
            })
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "modal-body",
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: "wallet-connect-block",
            children: [this.enabledProviders.includes(_constant.LOADERS.Xinpay) ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
              onClick: _xinpay.initXdc3,
              className: "wallect-connect-btn",
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                className: "wallet-name",
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h4", {
                  children: "XinPay"
                })
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                className: "wallet-icon",
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
                  src: _xinpayLogo.default,
                  alt: "Icon"
                })
              })]
            }) : "", this.enabledProviders.includes(_constant.LOADERS.Privatekey) ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
              className: "wallect-connect-btn",
              onClick: function onClick() {
                return _this2.setState({
                  providerSelected: Provider.privateKey
                });
              },
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                className: "wallet-name",
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h4", {
                  children: "Private Key"
                })
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                className: "wallet-icon",
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
                  src: _privatekeyLogo.default,
                  alt: "Icon"
                })
              })]
            }) : "", this.enabledProviders.includes(_constant.LOADERS.Keystore) ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
              className: "wallect-connect-btn",
              onClick: function onClick() {
                return _this2.setState({
                  providerSelected: Provider.keystore
                });
              },
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                className: "wallet-name",
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h4", {
                  children: "Key Store"
                })
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                className: "wallet-icon",
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
                  src: _keystoreLogo.default,
                  alt: "Icon"
                })
              })]
            }) : "", this.enabledProviders.includes(_constant.LOADERS.DcentInApp) ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
              className: "wallect-connect-btn",
              onClick: _dcentInAppBrowser.initDcent,
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                className: "wallet-name",
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h4", {
                  children: "D'CENT"
                })
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
                className: "wallet-icon",
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
                  src: _dcentLogo.default,
                  alt: "Icon"
                })
              })]
            }) : ""]
          })
        })]
      });
      if (this.state.providerSelected === Provider.keystore) return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Keystore.default, {
        back: function back() {
          return _this2.setState({
            providerSelected: Provider.menu
          });
        },
        cb: this.accountCallback(Provider.keystore)
      });
      if (this.state.providerSelected === Provider.privateKey) return /*#__PURE__*/(0, _jsxRuntime.jsx)(_PrivateKey.default, {
        back: function back() {
          return _this2.setState({
            providerSelected: Provider.menu
          });
        },
        cb: this.accountCallback(Provider.privateKey)
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var BTN_MSG = this.props.btnName || "CONNECT";
      var BTN_CLASS = this.props.btnClass || "btn btn-rounded btn-info";
      var disabled = this.props.disabled || false;
      var parentClass = "xdc-connect";

      if (this.props.theme === "dark") {
        parentClass += " darkTheme";
      }

      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: parentClass,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactBootstrap.Button, {
          className: BTN_CLASS,
          onClick: function onClick() {
            return _this3.setState({
              showModal: true
            });
          },
          disabled: disabled,
          children: BTN_MSG
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactBootstrap.Modal, {
          backdrop: this.props.modalBackdrop,
          className: parentClass,
          centered: true,
          show: this.state.showModal,
          onHide: function onHide() {
            return _this3.setState({
              showModal: false
            });
          },
          children: this.RenderWalletProvider()
        })]
      });
    }
  }]);

  return WalletConnect;
}(_react.default.Component);

function mapStateToProps(_ref) {
  var wallet = _ref.wallet;
  return {
    wallet: wallet
  };
}

var _default = (0, _reactRedux.connect)(mapStateToProps, actions)(WalletConnect);

exports.default = _default;