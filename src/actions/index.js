import { CHAIN_DATA } from "../helpers/constant";

import * as Types from "./types";

export const WalletConnected = ({ address, chain_id, loader, ...rst }) => {
  return {
    type: Types.WALLET_CONNECTED,
    payload: { address, chain_id, loader, ...rst },
  };
};

export const WalletOpened = () => {
  return {
    type: Types.WALLET_OPENED,
  };
};

export const NetworkChanged = (chain_id) => {
  return {
    type: Types.WALLET_CHAIN_CHANGED,
    payload: { chain_id },
  };
};

export const AccountChanged = (address) => {
  return {
    type: Types.WALLET_ADDRESS_CHANGED,
    payload: { address },
  };
};

export const WalletDisconnected = () => {
  return {
    type: Types.WALLET_DISCONNECTED,
  };
};

export const NetworkValid = () => {
  return {
    type: Types.NETWORK_VALID,
  };
};

export const SetChainData = (chain_id) => {
  return {
    type: Types.SET_CHAIN_DATA,
    payload: CHAIN_DATA[`${chain_id}`],
  };
};

export const NetworkInValid = () => {
  return {
    type: Types.NETWORK_INVALID,
  };
};

export const SetRpcProvider = (rpc_provider) => {
  return {
    type: Types.SET_RPC_PROVIDER,
    payload: rpc_provider,
  };
};

export const SetWsProvider = (ws_provider) => {
  return {
    type: Types.SET_WS_PROVIDER,
    payload: ws_provider,
  };
};
