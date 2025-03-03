import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Response = {
  chains: {
    nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
    _id: string;
    name: string;
    chainId: number;
    network: number;
    description: string;
    rpcUrl: string;
    explorerUrl: string;
  }[];
};

async function fetchChains() {
  return await axios.get<Response>("https://api.dappbook.store/api/chains");
}

export function useFetchChains() {
  const { data, isLoading } = useQuery({
    queryKey: ["chains"],
    queryFn: fetchChains,
    staleTime: 60 * 60 * 1000,
    // cacheTime: 24 * 60 * 60 * 1000,
  });

  const mappedChains = data?.data.chains
    .map((chain) => ({
      chainId: chain.chainId,
      name: chain.name,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return { data: mappedChains, isLoading };
}
