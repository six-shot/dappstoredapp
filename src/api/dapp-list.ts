import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";

type SocialLinks = {
  twitter?: string;
  github?: string;
  discord?: string;
};

type NativeCurrency = {
  name: string;
  symbol: string;
  decimals: number;
};

type ChainData = {
  _id: string;
  name: string;
  chainId: number;
  network: string;
  description: string;
  rpcUrl: string;
  explorerUrl: string;
  nativeCurrency: NativeCurrency;
  imageUrl?: string;
};

type CategoryData = {
  _id: string;
  name: string;
  parentCategory: string | null;
};

export type TDappList = {
  _id: string;
  name: string;
  description: string;
  tagLine: string;
  category: string[];
  logoUrl: string;
  websiteUrl: string;
  chains: string[];
  status: string;
  socialLinks: SocialLinks;
  createdAt: string;
  __v: number;
  chainsData: ChainData[];
  categoryData: CategoryData[];
};

type Payload = {
  page: number;
  search: string;
  chainId: string[];
  categoryName: string[];
  limit: number;
};

type DappListResponse = {
  data: {
    dapps: TDappList[];
    totalPages: number;
    totalDapps: number;
  };
};

async function fetchDapps(payload: Payload) {
  const { categoryName, chainId, page, search, limit } = payload;

  return await axios.get<Payload, DappListResponse>(
    "https://api.dappbook.store/api/dapps/",
    {
      params: {
        search: search.length > 0 ? search : null,
        page: page > 0 ? page : null,
        chainId: chainId.length > 0 ? chainId : null,
        categoryName: categoryName.length > 0 ? categoryName : null,
        limit: limit || 12,
      },
    }
  );
}

export function useFetchDapps() {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const page = Number(searchParams.get("page")) ?? 1;

  // Parse multiple values for chainId and categoryName
  const chainId = searchParams.getAll("chainId");
  const categoryName = searchParams.getAll("categoryName");

  const payload: Payload = {
    page,
    search,
    chainId,
    categoryName,
    limit: 12,
  };

  return useQuery({
    queryKey: ["fetch-dapps", search, page, chainId, categoryName],
    queryFn: () => fetchDapps(payload),
  });
}
