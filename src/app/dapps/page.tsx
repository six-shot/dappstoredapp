"use client";

import { CategorySelectFilter } from "@/components/atoms/CategorySelectFilter";
import { ChainSelectFilter } from "@/components/atoms/ChainSelectFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounceSearch } from "@/hooks/useDebounceSearch";
import React, { useEffect, useState } from "react";

import { TDappList, useFetchDapps } from "@/api/dapp-list";
import { DappCard } from "@/components/dapp-card";
import { FilterMenu } from "@/components/filter-menu";
import { PaginationControls } from "@/components/pagination";
import { Icons } from "@/components/ui/icons";
import { updateUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { SkeletonDappCard } from "@/components/dapp-card-skeleton";
import { QueryResultInfo } from "@/components/query-result-info";
import { StatusSelectFilter } from "@/components/atoms/StatusFilter";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Chain {
  chainId: number;
  name: string;
}

interface Category {
  categoryId: number;
  name: string;
}

const DappList = ({
  searchParams,
}: {
  searchParams: Record<"search", string>;
}) => {
  const router = useRouter();

  const defaultSearchTerm = searchParams.search ?? "";

  const [searchTerm, setSearchTerm] = useState<string>(defaultSearchTerm);
  const [selectedChains, setSelectedChains] = useState<Chain[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]); // Change to array

  const [isFiltersMenuOpen, setIsFiltersMenuOpen] = useState(false);

  const [freshUrl, setFreshUrl] = useState<string>("");

  const debouncedSearchTerm = useDebounceSearch(searchTerm, 500);

  const { data, isLoading } = useFetchDapps();

  const [dapps, setDapps] = useState<TDappList[]>([]);

  // Handle search and pagination
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCheckboxChange = (chainName: string, chainId: number) => {
    const chain = { chainId, name: chainName };
    // Check by chainId
    if (
      selectedChains.some((selectedChain) => selectedChain.chainId === chainId)
    ) {
      setSelectedChains(
        selectedChains.filter(
          (selectedChain) => selectedChain.chainId !== chainId
        )
      );
    } else {
      setSelectedChains([...selectedChains, chain]);
    }
  };

  console.log(selectedChains, "Selected Chains");

  const handleClearAllFilters = () => {
    setSearchTerm("");
    setSelectedChains([]);
    setSelectedCategories([]);
    setSelectedStatus([]);
    setIsFiltersMenuOpen(false);

    const params = [
      { key: "search", value: "" },
      {
        key: "chainId",
        value: "",
      },
      {
        key: "page",
        value: 1,
      },
      {
        key: "categoryName",
        value: "",
      },
    ];

    const url = updateUrl(params, [
      "page",
      "search",
      "chainId",
      "categoryName",
    ]);

    setFreshUrl(url);
  };

  const handleCategoryCheckboxChange = (
    categoryName: string,
    categoryId: any
  ) => {
    console.log(categoryName, categoryId, "Category Name and ID");
    const category = { categoryId, name: categoryName };
    if (
      selectedCategories.some(
        (selectedCategory) => selectedCategory.categoryId === categoryId
      )
    ) {
      setSelectedCategories(
        selectedCategories.filter(
          (selectedCategory) => selectedCategory.categoryId !== categoryId
        )
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // console.log(selectedCategories, "Selected Categories");

  // const handleStatusCheckboxChange = (status: string) => {
  //   setSelectedStatus((prevSelectedStatus) => {
  //     if (prevSelectedStatus.includes(status)) {
  //       // Remove status if already selected
  //       return prevSelectedStatus.filter((s) => s !== status);
  //     } else {
  //       // Add status if not already selected
  //       return [...prevSelectedStatus, status];
  //     }
  //   });
  // };

  // console.log(selectedStatus, "Selected Status");

  useEffect(() => {
    const selectedChainIds = selectedChains.map((chain) => chain.chainId);
    const selectedCategoriesNames = selectedCategories.map(
      (category) => category.name
    );

    const params = [
      ...selectedChainIds.map((chainId) => ({
        key: "chainId",
        value: chainId,
      })),
      ...selectedCategoriesNames.map((categoryName) => ({
        key: "categoryName",
        value: categoryName,
      })),
    ];

    function updateParams(
      params: { key: string; value: string | number }[]
    ): string {
      const queryString = params
        .map(
          ({ key, value }) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&");

      return `?${queryString}`;
    }

    router.push(updateParams(params));
  }, [selectedChains, selectedCategories]);

  useEffect(() => {
    if (debouncedSearchTerm.length > 0) {
      router.push(
        updateUrl([
          { key: "search", value: debouncedSearchTerm },
          { key: "page", value: "1" },
        ])
      );
    } else {
      router.push(updateUrl([{ key: "search", value: " " }], ["search"]));
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (!data) return;

    const matchingDapps =
      selectedStatus.length === 0
        ? data.data.dapps
        : data.data.dapps.filter((dapp) =>
            selectedStatus.includes(dapp.status)
          );

    // console.log(matchingDapps, "Filtered Dapps");

    setDapps(matchingDapps);
  }, [data, selectedStatus]);

  useEffect(() => {
    router.push(freshUrl);
  }, [freshUrl]);

  return (
    <>
      <div id="outer-container" className="">
        <main id="page-wrap">
          <div className="bg-[#0C0D0E] h-full p-4 md:p-6 w-full">
            <div className="flex gap-[30px] max-w-[1245px] mx-auto w-full">
              <aside className="hidden h-fit flex-col gap-4 rounded-lg bg-[#1B1E20] bg-white-950 text-white sticky top-20 lg:flex">
                {/* <ScrollArea className="h-fit max-h-screen p-5 pb-6"> */}
                <div className="h-fit max-h-screen pb-6 overflow-y-scroll hide-scrollbar">
                  <div className="flex flex-col gap-[16px]">
                    <div className="py-5 px-5 sticky top-0 z-50 bg-[#1B1E20]">
                      <div className="flex justify-between items-center w-[250px] backdrop-blur-sm">
                        <span className="text-white text-[18px]">Filter</span>
                        <Button
                          onClick={handleClearAllFilters}
                          variant="outline"
                          className=" text-white w-fit !text-[12px] rounded-[10px] bg-[#2A2E32] !border-none !p-[7px] !h-fit"
                        >
                          Clear
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 px-5">
                      <ChainSelectFilter
                        selectedChains={selectedChains}
                        handleCheckboxChange={handleCheckboxChange}
                      />
                      <CategorySelectFilter
                        selectedCategories={selectedCategories}
                        handleCategoryCheckboxChange={
                          handleCategoryCheckboxChange
                        }
                      />
                      {/* <StatusSelectFilter
                        selectedStatus={selectedStatus}
                        handleStatusCheckboxChange={handleStatusCheckboxChange}
                      /> */}
                    </div>
                  </div>
                  {/* </ScrollArea> */}
                </div>
              </aside>

              <section className="flex flex-col gap-8 mt-[64px] sm:mt-0 w-full">
                <header className="flex justify-between gap-6">
                  <Input
                    type="search"
                    className="bg-[#2A2E32] h-[37px] w-full max-w-[500px]"
                    value={searchTerm}
                    onChange={handleSearch} // Search handler
                    placeholder="Search for dapps"
                  />
                  <Button
                    onClick={() => setIsFiltersMenuOpen(true)}
                    className="lg:hidden group relative bg-[#2A2E32]"
                  >
                    Filter
                    <Icons.filter />
                  </Button>
                </header>
                <div className="flex items-center gap-3">
                  {data?.data && data.data.dapps.length > 0 && (
                    <QueryResultInfo totalItems={data.data.totalDapps} />
                  )}
                </div>

                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 w-full">
                  {isLoading ? (
                    Array(12)
                      .fill(0)
                      .map((_, i) => <SkeletonDappCard key={i} />)
                  ) : !data?.data || data.data.dapps.length === 0 ? (
                    <div className="flex w-full items-center">
                      No Dapps Found
                    </div>
                  ) : dapps.length > 0 ? (
                    dapps.map((dapp) => <DappCard {...dapp} />)
                  ) : (
                    data.data.dapps.map((dapp) => <DappCard {...dapp} />)
                  )}
                </ul>

                <div className="flex justify-center gap-4 mt-4 flex-wrap">
                  {data && data?.data.totalPages > 1 ? (
                    <PaginationControls totalPages={data?.data.totalPages} />
                  ) : null}
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>

      <FilterMenu
        handleCategoryCheckboxChange={handleCategoryCheckboxChange}
        handleCheckboxChange={handleCheckboxChange}
        handleClearAllFilters={handleClearAllFilters}
        onOpenChange={setIsFiltersMenuOpen}
        open={isFiltersMenuOpen}
        selectedCategories={selectedCategories}
        selectedChains={selectedChains}
        // selectedStatus={selectedStatus}
        // handleStatusCheckboxChange={handleStatusCheckboxChange}
      />
    </>
  );
};

export default DappList;
