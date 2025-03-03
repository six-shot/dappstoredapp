import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Response = {
  categories: {
    _id: string;
    name: string;
    parentCategory: string | null;
  }[];
};

async function fetchCategories() {
  return await axios.get<Response>("https://api.dappbook.store/api/categories");
}

export function useFetchCategories() {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 60 * 60 * 1000,
  });

  const mappedCategories = data?.data.categories
    .map((cat) => ({
      categoryId: cat._id,
      name: cat.name,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return { data: mappedCategories, isLoading };
}
