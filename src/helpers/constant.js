export const LOADERS = {
  Xinpay: "xinpay",
  Keystore: "keystore",
  Privatekey: "privatekey",
  MetaMask: "metamask",
  DcentInApp: "dcent-inapp",
};

export const VALID_CHAINS = [50, 51, 551];

export const NETWORK_NAME = {
  50: "XinFin",
  51: "Apothem",
  551: "XDC Devnet",
};

export const CHAIN_DATA = {
  "0x32": "https://explorer.xinfin.network",
  "0x33": "https://explorer.apothem.network",
  "0x227": "https://devnetscan.apothem.network",
  50: "https://explorer.xinfin.network",
  51: "https://explorer.apothem.network",
  551: "https://devnetscan.apothem.network",
};

export const HTTP_PROVIDER = {
  50: "https://rpc.xinfin.network",
  51: "https://rpc.apothem.network",
  551: "https://devnetrpc.apothem.network",
};

export const DEFAULT_CHAIN_ID = 50;
export const DEFAULT_PROVIDER = HTTP_PROVIDER[VALID_CHAINS[0]];

export const EXPLORER = CHAIN_DATA[DEFAULT_CHAIN_ID];
