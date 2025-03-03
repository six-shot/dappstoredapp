"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { useFetchCategories } from "@/api/get-categories";
import { ChevronDownIcon } from "@radix-ui/react-icons";

type Checked = DropdownMenuCheckboxItemProps["checked"];

interface Category {
  categoryId: number;
  name: string;
}

interface ChainSelectFilterProps {
  selectedCategories: Category[];
  handleCategoryCheckboxChange: (
    categoryName: string,
    categoryId: number
  ) => void;
}

export function CategorySelectFilter({
  selectedCategories,
  handleCategoryCheckboxChange,
}: ChainSelectFilterProps) {
  const [isChatSelectDropdownOpen, setIsChatSelectDropdownOpen] =
    React.useState(false);
  const { data, isLoading } = useFetchCategories();

  const toggleChatSelectDropdown = () => {
    setIsChatSelectDropdownOpen((prev) => !prev);
  };

  return (
    <div className="w-full text-white">
      <button
        onClick={toggleChatSelectDropdown}
        className="w-full flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-[#313131]"
      >
        <span className="text-[14px] font-semibold">Category</span>
        <ChevronDownIcon className="ml-auto h-4 w-4 text-gray-400" />
      </button>
      <ul className={`mb-6 mt-2 ${isChatSelectDropdownOpen ? "" : "hidden"}`}>
        {isLoading ? (
          <div>Loading chains...</div>
        ) : !data || data.length == 0 ? (
          <div>No categories found</div>
        ) : (
          data.map((category: any) => (
            <li key={category.name}>
              <label className="flex cursor-pointer items-center gap-[16px] rounded p-2 hover:bg-[#313131] text-white">
                <div
                  data-testid="option-filter"
                  className="relative w-fit cursor-pointer"
                >
                  <div className="flex w-fit flex-col gap-1.5">
                    <div className="group flex w-fit items-center justify-start">
                      <input
                        className="custom-checkbox w-4 h-4"
                        type="checkbox"
                        checked={selectedCategories.some(
                          (selectedCategory) =>
                            selectedCategory.categoryId === category.categoryId
                        )}
                        onChange={() =>
                          handleCategoryCheckboxChange(
                            category.name,
                            category.categoryId
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
                <span className="text-[14px] cursor-pointer text-white">
                  {category.name}
                </span>
              </label>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
