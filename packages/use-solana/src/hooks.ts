import { useConnection as useWalletAdapterConnection } from "@solana/wallet-adapter-react";
import type { Connection } from "@solana/web3.js";

import type { DefaultWalletType, UnknownWalletType, WalletTypeEnum } from ".";
import type { ConnectedWallet } from "./adapters/types";
import type { UseSolana } from "./context";
import { useSolana } from "./context";
import type { ConnectionConfigContext } from "./utils/SolanaConnectionProvider";

/**
 * Gets the current Solana wallet.
 */
export function useWallet<
  WalletType extends WalletTypeEnum<WalletType> = typeof DefaultWalletType
>(): UseSolana<WalletType> {
  const context = useSolana<WalletType>();
  if (!context) {
    throw new Error("wallet not loaded");
  }
  return context;
}

/**
 * Gets the current Solana wallet, returning null if it is not connected.
 */
export const useConnectedWallet = (): ConnectedWallet | null => {
  const { wallet, connected } = useWallet<UnknownWalletType>();
  if (!wallet?.connected || !connected || !wallet.publicKey) {
    return null;
  }
  return wallet as ConnectedWallet;
};

/**
 * Loads the connection context
 * @returns
 */
export function useConnectionContext(): ConnectionConfigContext & {
  connection: Connection;
  sendConnection: Connection;
} {
  const context = useSolana<UnknownWalletType>();
  if (!context) {
    throw new Error("Not in context");
  }
  return context;
}

/**
 * Gets the read connection
 * @returns
 */
export function useConnection(): Connection {
  return useWalletAdapterConnection().connection;
}

/**
 * Gets the send connection
 * @returns
 */
export function useSendConnection(): Connection {
  return useConnection();
}
