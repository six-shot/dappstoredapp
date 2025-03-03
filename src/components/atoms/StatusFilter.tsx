import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as React from "react";

interface StatusSelectFilterProps {
  selectedStatus: string[];
  handleStatusCheckboxChange: (status: string) => void;
}

export function StatusSelectFilter({
  selectedStatus,
  handleStatusCheckboxChange,
}: StatusSelectFilterProps) {
  const [isChatSelectDropdownOpen, setIsChatSelectDropdownOpen] =
    React.useState(false);

  const toggleChatSelectDropdown = () => {
    setIsChatSelectDropdownOpen((prev) => !prev);
  };

  const allStatus = [
    "Free",
    "Paid",
    "Open-source",
    "Freemium",
    "Transaction Fees",
  ];

  return (
    <div className=" text-white w-full">
      <button
        onClick={toggleChatSelectDropdown}
        className="w-full flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-[#313131]"
      >
        <span className="text-[16px] font-semibold">Status</span>
        <ChevronDownIcon className="ml-auto h-4 w-4 text-gray-400" />
      </button>
      <ul className={`mb-6 mt-2 ${isChatSelectDropdownOpen ? "" : "hidden"}`}>
        {allStatus.map((status: string, i: number) => (
          <li key={i}>
            <label className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-[#313131]">
              <div
                data-testid="option-filter"
                className="relative w-fit cursor-pointer"
              >
                <div className="flex w-fit flex-col gap-1.5">
                  <div className="group flex w-fit items-center justify-start">
                    <input
                      className="w-4 h-4"
                      type="checkbox"
                      checked={selectedStatus.includes(status)} // Check if the status is selected
                      onChange={() => handleStatusCheckboxChange(status)} // Toggle the status in the selected list
                    />
                  </div>
                </div>
              </div>
              <span className="font-label-size-200 cursor-pointer text-white">
                {status}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
