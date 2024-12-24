import { type Chain } from "viem";

export const lensSepolia: Chain = {
  id: 37111,
  name: "Lens Network Sepolia Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Grass",
    symbol: "GRASS",
  },
  rpcUrls: {
    default: { http: ["https://rpc.testnet.lens.dev"] },
  },
  blockExplorers: {
    default: { name: "Block Explorer", url: "https://block-explorer.testnet.lens.dev" },
  },
  testnet: true,
};