import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type SocialLinks = {
  twitter: string;
  github: string;
  discord: string;
};

type Category = {
  parentCategory: string | null;
  _id: string;
  name: string;
};

type NativeCurrency = {
  name: string;
  symbol: string;
  decimals: number;
};

type Chain = {
  nativeCurrency: NativeCurrency;
  _id: string;
  name: string;
  chainId: number;
  network: string;
  description: string;
  rpcUrl: string;
  explorerUrl: string;
  imageUrl?: string; // Optional as not all chains have this
};

type DappResponse = {
  socialLinks: SocialLinks;
  _id: string;
  name: string;
  description: string;
  tagLine: string;
  category: Category[];
  logoUrl: string;
  websiteUrl: string;
  chains: Chain[];
  status: string[]; // Array of statuses like "Freemium", "Open-source", etc.
  createdAt: string; // ISO date string
  __v: number;
};

async function getDapp(dappName: string) {
  return await axios.get<any, { data: DappResponse }>(
    `https://api.dappbook.store/api/dapps/${dappName}`
  );
}

export function useGetDapp(dappName: string) {
  return useQuery({
    queryKey: ["dapp", dappName],
    queryFn: () => getDapp(dappName),
    enabled: !!dappName,
  });
}
