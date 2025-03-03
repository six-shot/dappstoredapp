import React from "react";

export function SkeletonDappCard() {
  return (
    <li>
      <div className="features-card-square group relative cursor-pointer animate-pulse">
        <div className="card-inner absolute w-full h-full px-[22px] py-[21px] flex flex-col justify-between">
          <div className="flex flex-col">
            <div className="mb-[13px] flex items-center gap-[18px]">
              {/* Skeleton for Logo */}
              <div className="w-10 h-10 rounded-full bg-gray-700"></div>
              {/* Skeleton for Name */}
              <div className="w-24 h-5 rounded bg-gray-700"></div>
            </div>

            {/* Skeleton for Categories */}
            <div className="mb-[26px] flex flex-wrap gap-[7px]">
              <div className="w-16 h-4 rounded bg-gray-700"></div>
              <div className="w-12 h-4 rounded bg-gray-700"></div>
            </div>

            {/* Skeleton for Description */}
            <div className="w-full h-10 rounded bg-gray-700"></div>

            <div className="mt-auto flex items-center justify-between pt-2">
              <div className="flex ml-1 items-center">
                {/* Skeleton for Chain Logos */}
                <div className="h-6 w-6 rounded-full bg-gray-700"></div>
                <div className="ml-[-6px] h-6 w-6 rounded-full bg-gray-700"></div>
                <div className="ml-[-6px] h-6 w-6 rounded-full bg-gray-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
