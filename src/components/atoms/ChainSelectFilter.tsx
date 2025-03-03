import { useFetchChains } from "@/api/get-chains";
import { chainIdToLogo } from "@/lib/utils";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import * as React from "react";

interface Chain {
  chainId: number;
  name: string;
}

interface ChainSelectFilterProps {
  selectedChains: Chain[];
  handleCheckboxChange: (chainName: string, chainId: number) => void;
}

export function ChainSelectFilter({
  selectedChains,
  handleCheckboxChange,
}: ChainSelectFilterProps) {
  const [isChatSelectDropdownOpen, setIsChatSelectDropdownOpen] =
    React.useState(false);

  const { data, isLoading } = useFetchChains();

  const toggleChatSelectDropdown = () => {
    setIsChatSelectDropdownOpen((prev) => !prev);
  };

  return (
    <div className="w-full text-white">
      <button
        onClick={toggleChatSelectDropdown}
        className="w-full flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-[#313131]"
      >
        <span className="text-[14px] font-semibold">Chains</span>

        <ChevronDownIcon className="ml-auto h-4 w-4 text-gray-400" />
      </button>
      <ul className={`mb-6 mt-2 ${isChatSelectDropdownOpen ? "" : "hidden"}`}>
        {isLoading ? (
          <div>Loading chains...</div>
        ) : !data || data.length === 0 ? (
          <div>No chains...</div>
        ) : (
          data.map((chain: Chain) => (
            <li key={chain.name}>
              <label className="flex cursor-pointer items-center rounded p-2 hover:bg-[#313131]">
                <div
                  data-testid="option-filter"
                  className="relative w-fit cursor-pointer"
                >
                  <div className="flex w-fit flex-col gap-1.5">
                    <div className="group flex w-fit items-center justify-start">
                      <input
                        className="custom-checkbox w-4 h-4"
                        type="checkbox"
                        checked={selectedChains.some(
                          (selectedChain) =>
                            selectedChain.chainId === chain.chainId
                        )}
                        onChange={() =>
                          handleCheckboxChange(chain.name, chain.chainId)
                        }
                      />
                    </div>
                  </div>
                </div>
                <Image
                  alt={`${chain.name} Logo`}
                  loading="lazy"
                  width="24"
                  height="24"
                  decoding="async"
                  className="h-6 w-6 ml-[16px]"
                  src={
                    chainIdToLogo[
                      Number(chain.chainId) as keyof typeof chainIdToLogo
                    ]
                  }
                />
                <span className="text-[14px] cursor-pointer text-white ml-[6px]">
                  {chain.name}
                </span>
              </label>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
