import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import aptosChainIcon from "@/assets/Aptos.svg";
import arbitrumChainIcon from "@/assets/arbitrumChainIcon.svg";
import avalancheChainIcon from "@/assets/avalancheChainIcon.svg";
import baseChainIcon from "@/assets/Base.svg";
import bitcoinIcon from "@/assets/bitcoin-btc-logo.svg";
import bnbChainIcon from "@/assets/bnbChainIcon.svg";
import celoIcon from "@/assets/celo-celo-logo.svg";
import cosmosIcon from "@/assets/cosmos-atom-logo.svg";
import cronosIcon from "@/assets/cronos-cro-logo.svg";
import ethChainIcon from "@/assets/ethChainIcon.svg";
import fantomChainIcon from "@/assets/fantomChainIcon.svg";
import harmonyIcon from "@/assets/harmony-one-logo.svg";
import immutableIcon from "@/assets/immutable-x-imx-logo.svg";
import lineaIcon from "@/assets/linea-seeklogo.svg";
import moonbeamIcon from "@/assets/moonbeam-glmr-logo.svg";
import multichainIcon from "@/assets/multichain-logo.svg";
import optimismChainIcon from "@/assets/optimismChainIcon.svg";
import polkadotIcon from "@/assets/polkadot-new-dot-logo.svg";
import polygonIcon from "@/assets/polygon-matic-logo.svg";
import polygonChainIcon from "@/assets/polygonChainIcon.svg";
import solanaChainIcon from "@/assets/solanaChainIcon.svg";
import starkNetIcon from "@/assets/starknet-token-strk-logo.svg";
import suiIcon from "@/assets/sui-sui-logo.svg";
import tronChainIcon from "@/assets/tron-trx-logo.svg";
import zetaChainIcon from "@/assets/zetachain.svg";
import zkSyncIcon from "@/assets/zksync.svg";

import {
  arbitrum,
  avalanche,
  base,
  bsc,
  celo,
  cronos,
  fantom,
  harmonyOne,
  mainnet,
  moonbeam,
  optimism,
  polygon,
  polygonZkEvm,
  sepolia,
  zksync,
} from "viem/chains";

const solanaChainId = 101;

export const chainIdToLogo = {
  /// Testnets
  [sepolia.id]: ethChainIcon,
  /// Mainnets
  [bsc.id]: bnbChainIcon,
  [base.id]: baseChainIcon,
  [mainnet.id]: ethChainIcon,
  [avalanche.id]: avalancheChainIcon,
  [polygon.id]: polygonChainIcon,
  [optimism.id]: optimismChainIcon,
  [fantom.id]: fantomChainIcon,
  [arbitrum.id]: arbitrumChainIcon,
  [solanaChainId]: solanaChainIcon,
  [11111]: tronChainIcon,
  [polygonZkEvm.id]: polygonIcon,
  [moonbeam.id]: moonbeamIcon,
  [59140]: lineaIcon,
  [8086]: bitcoinIcon,
  [celo.id]: celoIcon,
  [67588]: cosmosIcon,
  [cronos.id]: cronosIcon,
  [harmonyOne.id]: harmonyIcon,
  [500]: immutableIcon,
  [zksync.id]: zkSyncIcon,
  [7001]: zetaChainIcon,
  [7890]: suiIcon,
  [534353]: starkNetIcon,
  [996]: polkadotIcon,
  [1004]: multichainIcon,
  [1400]: aptosChainIcon,
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clearParams(removeItems: string[]) {
  if (typeof window === "undefined") return "";

  const parsedUrl = new URL(window.location.href);

  removeItems.forEach((item) => {
    parsedUrl.searchParams.delete(item);
  });

  return parsedUrl.toString();
}

export function updateUrl(
  params: Array<{ key: string; value: number | string }>,
  removeItems?: string[]
) {
  if (typeof window === "undefined") return "";

  const parsedUrl = new URL(window.location.href);

  // Update or add multiple query params
  params.forEach(({ key, value }) => {
    parsedUrl.searchParams.set(key, value.toString());
  });

  // Remove specified query params
  removeItems?.forEach((item) => {
    parsedUrl.searchParams.delete(item);
  });

  return parsedUrl.toString();
}
