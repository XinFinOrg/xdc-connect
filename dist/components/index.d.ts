import { Transaction as Transaction_, TransactionReceipt } from "xdc3-core"

export interface Account {
  address: string;
  privateKet: string;
}

export type Transaction = Transaction_

export interface Wallet {
  connected: Boolean;
  address: string;
  chain_id: number;
  valid_network: Boolean;
  explorer: string;
  rpc_provider: string;
  ws_provider: string;
  loader: string;
  account: null;
}

export function GetWallet(): Wallet;
export function SendTransaction(): Promise<TransactionReceipt>;
export function CallTransaction(): Promise<any>;
export function Disconnect(): void;
export function GetNativeBalance(): Promise<number | string>;