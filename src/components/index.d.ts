import React from "react";
import {
  TransactionConfig,
  TransactionReceipt,
  Transaction as Transaction_,
} from "xdc3-core";

export interface Account {
  address: string;
  privateKey: string;
}

export interface Wallet {
  connected: boolean;
  address: string;
  chain_id: number;
  valid_network: boolean;
  explorer: string;
  rpc_provider: string;
  ws_provider: string;
  loader: string;
  account: null;
}

export type themes = "light" | "dark";

export type validChainId = 50 | 51 | 551;

export type ValidProvider =
  | "xinpay"
  | "keystore"
  | "privatekey"
  | "dcent-inapp";

export type DisplayType = "grid" | "row";

export interface WalletConnectProps {
  onDisconnect?: (wallet: Wallet) => any;
  onConnect?: (wallet: Wallet) => any;
  onAddressChange?: (wallet: Wallet) => any;
  onNetworkChange?: (wallet: Wallet) => any;
  modalBackdrop?: boolean;
  showButton?: boolean;
  btnClass?: string;
  btnName?: string;
  theme?: themes;
  disabled?: boolean;
  defaultChainId?: validChainId;
  enabledProviders?: ValidProvider[];
  displayType?: DisplayType;
  addToastContainer?: boolean;
  toastContainer?: any;
  rpcProvider?: string;
  wsProvider?: string;
  gasMultiplier: ?number;
}

export class XdcConnect extends React.Component<WalletConnectProps, any> {}

export type Transaction = Transaction_;

/**
 *
 * Returns current instance of the wallet
 * @return wallet
 *
 */
export function GetWallet(): Wallet;
/**
 *
 * Send a PAYABLE / NONPAYBLE transaction
 * @param tx - standard xdc3 / web3 transaction object
 * @returns transaction receipt
 *
 */
export function SendTransaction(
  tx: TransactionConfig
): Promise<TransactionReceipt>;

/**
 * @param tx - standard xdc3 / web3 transaction object
 * @returns HEX encoded response
 */
export function CallTransaction(tx: TransactionConfig): Promise<string>;

/**
 *
 * Disconnects wallet with the current provider
 *
 */
export function Disconnect(): void;

/**
 *
 * Will return native chain balance
 *
 */
export function GetNativeBalance(): Promise<number | string>;

/**
 * API to open connection modal
 *
 */
export function ForceShowModal(): void;

/**
 * API to close connection modal
 *
 */
export function ForceCloseModal(): void;

/**
 * API to update gas multiplier
 *
 */
export function SetGasMultiplier(gasMultiplier: number): void;
