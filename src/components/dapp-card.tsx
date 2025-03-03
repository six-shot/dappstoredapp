import { TDappList } from "@/api/dapp-list";
import { chainIdToLogo } from "@/lib/utils";
import Image from "next/image";
import React from "react";
export function DappCard(dapp: TDappList) {
  return (
    <li key={dapp._id}>
      <a href={`/dapps/${encodeURIComponent(dapp.name)}`} className="">
        <div className="features-card-square group relative cursor-pointer">
          <div className="card-inner absolute w-full h-full px-[22px] py-[21px] flex flex-col justify-between">
            <div className="flex flex-col">
              <div className="mb-[13px] flex items-center gap-[18px]">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  {dapp.logoUrl && dapp.logoUrl.startsWith("http") ? (
                    <img
                      src={dapp.logoUrl}
                      alt={`${dapp.name} Logo`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.parentElement!.innerHTML = `<div class="w-full h-full bg-black text-[20px] rounded-full flex items-center justify-center text-white font-bold">
                          ${dapp.name.slice(0, 1).toUpperCase()}
                        </div>`;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-black flex items-center justify-center text-white font-bold">
                      {dapp.name.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                </div>
                <span className="text-[18px] font-bold text-white">
                  {dapp.name}
                </span>
              </div>
              <div className="mb-[26px] flex flex-wrap gap-[7px] text-[#CBF947]">
                {dapp.categoryData.map((category: any, i: number) => (
                  <span
                    className={`inline-flex items-center px-[9px] py-[5px] font-family-public-sans text-[12px] font-medium rounded-[8px] leading-3 ${
                      i === 0
                        ? "border-[1px] border-[#CBF947] border-opacity-[10%] bg-transparent bg-clip-text"
                        : "bg-[#CBF947] bg-opacity-[5%]"
                    }`}
                  >
                    {category.name}
                  </span>
                ))}
              </div>
              <span className="font-paragraph-size-300 xl:font-paragraph-size-200 line-clamp-2 text-[12px] leading-5 tracking-tighter text-white opacity-[70%]">
                {dapp.description}
              </span>
              <div className="mt-auto flex items-center justify-between pt-2">
                <div className="flex ml-1 items-center">
                  {dapp?.chainsData
                    .slice(0, 3)
                    .map((chain: any, index: number) => {
                      return (
                        <Image
                          key={chain.chainId}
                          alt={`${chain.name} Logo`}
                          loading="lazy"
                          width={24}
                          height={24}
                          decoding="async"
                          className={`h-6 w-6 border-[3px] border-[#323F47] rounded-full ${
                            dapp?.chainsData.length > 1 ? "ml-[-6px]" : ""
                          }`}
                          src={
                            chainIdToLogo[
                              Number(
                                chain.chainId
                              ) as keyof typeof chainIdToLogo
                            ]
                          }
                          style={{ zIndex: 3 - index }}
                        />
                      );
                    })}
                  {dapp?.chainsData.length > 3 && (
                    <div
                      className="ml-[-6px] h-6 w-6 flex justify-center items-center border-[1px] border-[#323F47] rounded-full bg-transparent"
                      style={{ zIndex: 0 }}
                    >
                      <span className="text-white text-[10px]">
                        +{dapp.chainsData.length - 3}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </li>
  );
}
