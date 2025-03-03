import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CategorySelectFilter } from "./atoms/CategorySelectFilter";
import { ChainSelectFilter } from "./atoms/ChainSelectFilter";
import { Button } from "./ui/button";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleClearAllFilters: () => void;

  selectedChains: {
    chainId: number;
    name: string;
  }[];
  handleCheckboxChange: (chainName: string, chainId: number) => void;
  selectedCategories: {
    categoryId: number;
    name: string;
  }[];
  handleCategoryCheckboxChange: (categoryName: string, categoryId: any) => void;

  // selectedStatus: string[];
  // handleStatusCheckboxChange: (status: string) => void;
};

export function FilterMenu({
  handleClearAllFilters,
  onOpenChange,
  open,
  selectedChains,
  handleCheckboxChange,
  selectedCategories,
  handleCategoryCheckboxChange,
}: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={"right"}
        className="bg-black max-w-xl w-[90vw] sm:w-[70vw]"
      >
        <SheetHeader className="flex flex-row items-center mb-10 mt-5 justify-between">
          <SheetTitle>Filter</SheetTitle>
          <SheetDescription className="hidden"></SheetDescription>
          <Button
            onClick={handleClearAllFilters}
            variant="outline"
            className=" text-white w-fit !text-[12px] rounded-[10px] bg-[#2A2E32] !border-none !p-[7px] !h-fit"
          >
            Clear
          </Button>
        </SheetHeader>

        <ScrollArea className="h-[80vh] w-full">
          <aside className=" h-fit flex-col gap-4 rounded-lg bg-[#1B1E20] p-3 text-white">
            <div className="flex flex-col gap-[16px]">
              <ChainSelectFilter
                selectedChains={selectedChains}
                handleCheckboxChange={handleCheckboxChange}
              />
              <CategorySelectFilter
                selectedCategories={selectedCategories}
                handleCategoryCheckboxChange={handleCategoryCheckboxChange}
              />
              {/* <StatusSelectFilter
                selectedStatus={selectedStatus}
                handleStatusCheckboxChange={handleStatusCheckboxChange}
              /> */}
            </div>
          </aside>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
