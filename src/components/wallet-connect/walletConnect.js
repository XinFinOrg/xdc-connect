import React from "react";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import Keystore from "./Keystore";
import PrivateKey from "./PrivateKey";
import { initXdc3 } from "../../wallets/xinpay";
import { initDcent } from "../../wallets/dcentInAppBrowser";

import XinpayLogo from "../../assets/img/wallets/xinpay-logo.png";
import PrivateKeyLogo from "../../assets/img/wallets/privatekey-logo.png";
import KeystoreLogo from "../../assets/img/wallets/keystore-logo.png";
import DcentLogo from "../../assets/img/wallets/dcent-logo.png";

import { DEFAULT_CHAIN_ID, CHAIN_DATA } from "../../helpers/constant";
import * as actions from "../../actions";

const Provider = {
  menu: "menu",
  keystore: "keystore",
  privateKey: "privatekey",
};

class WalletConnect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      providerSelected: Provider.menu,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.wallet.connected !== this.props.wallet.connected &&
      this.props.wallet.connected
    ) {
      this.setState({ showModal: false });
      this.props.onConnect && this.props.onConnect(this.props.wallet);
    }

    if (
      prevProps.wallet.connected !== this.props.wallet.connected &&
      this.props.wallet.connected !== prevProps.wallet.connected
    ) {
      this.props.onDisconnect && this.props.onDisconnect(this.props.wallet);
    }

    if (
      prevProps.wallet.address !== this.props.wallet.address &&
      this.props.wallet.address
    ) {
      this.props.onAddressChange &&
        this.props.onAddressChange(this.props.wallet);
    }
  }

  accountCallback = (loader) => (account) => {
    if (account === null)
      toast("error while loading wallet", { autoClose: 2000, type: "error" });
    else {
      this.props.WalletConnected({
        account,
        chain_id: DEFAULT_CHAIN_ID,
        address: account.address,
        loader,
        explorer: CHAIN_DATA[DEFAULT_CHAIN_ID],
      });
      this.setState({ showModal: false, providerSelected: Provider.menu });
    }
  };

  RenderWalletProvider() {
    if (this.state.providerSelected === Provider.menu)
      return (
        <div className="modal-content">
          <div className="modal-header border-bottom-0">
            <h5 className="modal-title" id="exampleModalLabel">
              Connect to a wallet
            </h5>
            <button
              type="button"
              className="close"
              onClick={() => this.setState({ showModal: false })}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="wallet-connect-block">
              {/*<button onClick={initXdc3} className="wallect-connect-btn">*/}
              {/*  <div className="wallet-name">*/}
              {/*    <h4>XinPay</h4>*/}
              {/*  </div>*/}
              {/*  <div className="wallet-icon">*/}
              {/*    <img src={XinpayLogo} alt="Icon" />*/}
              {/*  </div>*/}
              {/*</button>*/}
              {/*<button*/}
              {/*  className="wallect-connect-btn"*/}
              {/*  onClick={() =>*/}
              {/*    this.setState({ providerSelected: Provider.privateKey })*/}
              {/*  }*/}
              {/*>*/}
              {/*  <div className="wallet-name">*/}
              {/*    <h4>Private Key</h4>*/}
              {/*  </div>*/}
              {/*  <div className="wallet-icon">*/}
              {/*    <img src={PrivateKeyLogo} alt="Icon" />*/}
              {/*  </div>*/}
              {/*</button>*/}
              {/*<button*/}
              {/*  className="wallect-connect-btn"*/}
              {/*  onClick={() =>*/}
              {/*    this.setState({ providerSelected: Provider.keystore })*/}
              {/*  }*/}
              {/*>*/}
              {/*  <div className="wallet-name">*/}
              {/*    <h4>Key Store</h4>*/}
              {/*  </div>*/}
              {/*  <div className="wallet-icon">*/}
              {/*    <img src={KeystoreLogo} alt="Icon" />*/}
              {/*  </div>*/}
              {/*</button>*/}
              {/*<button className="wallect-connect-btn" onClick={initDcent}>*/}
              {/*  <div className="wallet-name">*/}
              {/*    <h4>D'CENT</h4>*/}
              {/*  </div>*/}
              {/*  <div className="wallet-icon">*/}
              {/*    <img src={DcentLogo} alt="Icon" />*/}
              {/*  </div>*/}
              {/*</button>*/}
            </div>
          </div>
        </div>
      );

    if (this.state.providerSelected === Provider.keystore)
      return (
        <Keystore
          back={() => this.setState({ providerSelected: Provider.menu })}
          cb={this.accountCallback(Provider.keystore)}
        />
      );

    if (this.state.providerSelected === Provider.privateKey)
      return (
        <PrivateKey
          back={() => this.setState({ providerSelected: Provider.menu })}
          cb={this.accountCallback(Provider.privateKey)}
        />
      );
  }

  render() {
    const BTN_MSG = this.props.btnName || "CONNECT";
    const BTN_CLASS = this.props.btnClass || "btn btn-rounded btn-info";
    const disabled = this.props.disabled || false;
    let parentClass = "xdc-connect";
    parentClass += " darkTheme";

    if (this.props.darkTheme) {
      parentClass += " darkTheme";
    }

    return (
      <div className={parentClass}>
        <Button
          className={BTN_CLASS}
          onClick={() => this.setState({ showModal: true })}
          disabled={disabled}
        >
          {BTN_MSG}
        </Button>
        <Modal
          className={parentClass}
          centered={true}
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
        >
          {this.RenderWalletProvider()}
        </Modal>
      </div>
    );
  }
}

function mapStateToProps({ wallet }) {
  return { wallet };
}

export default connect(mapStateToProps, actions)(WalletConnect);
