import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

import { lensSepolia } from "./customChains";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [lensSepolia],
    transports: {
      // RPC URL for each chain
      [lensSepolia.id]: http("https://rpc.testnet.lens.dev"),
    },

    // Required API Keys
    walletConnectProjectId: "",

    // Required App Info
    appName: "Bloom Together",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://bloomtogether.netlify.app/", // your app's url
    appIcon: "https://bloomtogether.netlify.app/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
