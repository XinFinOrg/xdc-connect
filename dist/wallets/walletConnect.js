// import WalletConnectClient from "@walletconnect/client";
// import { CLIENT_EVENTS } from "@walletconnect/client";
// const client = await WalletConnectClient.init({
//   relayProvider: "wss://relay.walletconnect.com",
//   metadata: {
//     name: "Example Dapp",
//     description: "Example Dapp",
//     url: "#",
//     icons: ["https://walletconnect.com/walletconnect-logo.png"],
//   },
// });
// // client.on(
// //   CLIENT_EVENTS.pairing.proposal,
// //   async (proposal) => {
// //     // uri should be shared with the Wallet either through QR Code scanning or mobile deep linking
// //     const { uri } = proposal.signal.params;
// //   }
// // );
// const session = await client.connect({
//     permissions: {
//       blockchain: {
//         chains: ["eip155:1"],
//       },
//       jsonrpc: {
//         methods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData"],
//       },
//     },
//   });
//   const result = await client.request({
//     topic: session.topic,
//     chainId: "eip155:1",
//     request: {
//       id: 1,
//       jsonrpc: "2.0",
//       method: "personal_sign",
//       params: [
//         "0x1d85568eEAbad713fBB5293B45ea066e552A90De",
//         "0x7468697320697320612074657374206d65737361676520746f206265207369676e6564",
//       ],
//     },
//   });
"use strict";