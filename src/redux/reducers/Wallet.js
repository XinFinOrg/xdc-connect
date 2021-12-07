import * as types from "../../actions/types";
import { VALID_CHAINS } from "../../helpers/constant";
import { IsHex } from "../../helpers/math";

const initialState = {
  connected: false,
  address: "",
  chain_id: null,
  valid_network: false,
  explorer: "",
  rpc_provider: "",
  ws_provider: "",
  loader: "",
  account: null,
  showModal: false,
};

const WalletReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case types.WALLET_CONNECTED: {
      let { address, chain_id, loader, ...rst } = payload.payload;
      let valid_network = false;
      if (String(chain_id).startsWith("0x") && IsHex(chain_id))
        chain_id = parseInt(chain_id, 16);

      if (VALID_CHAINS.includes(chain_id)) {
        valid_network = true;
      }

      return {
        ...state,
        connected: true,
        address: address,
        chain_id: chain_id,
        loader,
        valid_network,
        ...rst,
      };
    }

    case types.SET_RPC_PROVIDER: {
      return {
        ...state,
        rpc_provider: payload.payload,
      };
    }

    case types.SET_WS_PROVIDER: {
      return {
        ...state,
        ws_provider: payload.payload,
      };
    }

    case types.WALLET_DISCONNECTED: {
      return { ...state, connected: false };
    }

    case types.FORCE_SHOW_MODAL: {
      return { ...state, showModal: true };
    }

    case types.FORCE_CLOSE_MDOAL: {
      return { ...state, showModal: false };
    }

    case types.WALLET_ADDRESS_CHANGED: {
      const { address } = payload.payload;
      return {
        ...state,
        address: address,
      };
    }

    case types.WALLET_CHAIN_CHANGED: {
      const { chain_id } = payload.payload;

      return {
        ...state,
        chain_id: chain_id,
      };
    }

    case types.NETWORK_VALID: {
      return {
        ...state,
        valid_network: true,
      };
    }

    case types.NETWORK_INVALID: {
      return {
        ...state,
        valid_network: false,
      };
    }

    default:
      return state;
  }
};

export default WalletReducer;
