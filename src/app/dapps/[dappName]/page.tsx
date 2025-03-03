"use client";

import { useGetDapp } from "@/api/get-dapp";
import Breadcrumb from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Define the type for the props
interface PageProps {
  params: {
    dappName: string; // Define dappName as a string
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const { dappName } = params;

  const { data, isLoading, error } = useGetDapp(dappName);

  const dappData = data?.data;

  if (isLoading || !dappData) {
    return (
      <span className="loader absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="max-w-[1245px] mx-auto px-6  my-[128px] sm:my-16 space-y-10 md:space-y-12">
      <Breadcrumb
        path={decodeURIComponent(dappData.name)}
        categories={dappData.category}
      />

      <div className=" h-full mx-auto text-white flex  justify-center w-full">
        <div className="flex gap-[46px] w-full">
          <img
            alt="Alchemy Rollups"
            loading="eager"
            width="240"
            height="240"
            decoding="async"
            data-nimg="1"
            className="hidden md:flex rounded-lg md:h-60 md:w-60"
            src={dappData.logoUrl}
          />
          <div className="flex flex-col gap-[77px] md:gap-[30px] max-w-[1170px] mx-auto">
            <div className="flex w-full flex-col justify-between gap-y-10 xl:flex-row">
              <div className="flex w-full flex-col gap-x-10 gap-y-6 md:flex-row md:items-center">
                <div className="flex w-full flex-col gap-x-18 self-stretch lg:flex-row">
                  <div className="flex w-full flex-col">
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <h1 className="text-[24px] mb-[19px] md:mb-[15px] font-extrabold">
                          {dappData.name}
                        </h1>
                        <div className="mb-[37px] flex flex-wrap gap-1 ">
                          {dappData.category?.map((category, i) => (
                            <span
                              className={`inline-flex items-center px-[9px] py-[5px] font-family-public-sans text-[12px] font-medium rounded-[8px] text-[#CBF947] leading-3 ${
                                i === 0
                                  ? "border-[1px] border-[#CBF947] border-opacity-[10%] bg-transparent bg-clip-text"
                                  : "bg-[#CBF947] bg-opacity-[5%]"
                              }`}
                              key={category._id}
                            >
                              {category.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      <img
                        alt="Alchemy Rollups"
                        loading="eager"
                        width="240"
                        height="240"
                        decoding="async"
                        data-nimg="1"
                        className="flex md:hidden rounded-lg h-[60px] w-[60px] md:h-60 md:w-60"
                        src={dappData.logoUrl}
                      />
                    </div>

                    <p className="text-[16px] mb-[19px] md:mb-6 ">
                      {dappData.tagLine}
                    </p>
                    <div className="mb-[24px] md:[41px] flex items-center">
                      <TooltipProvider>
                        {dappData.chains.map((chain) =>
                          chain.imageUrl ? (
                            <Tooltip delayDuration={0.2}>
                              <TooltipTrigger asChild>
                                <div className="-ml-[6px] flex justify-center rounded-full border-2 border-white-950 bg-gray-100 p-1 ">
                                  <Image
                                    src={chain.imageUrl}
                                    alt={chain.name}
                                    width={18}
                                    height={18}
                                    className="overflow-hidden rounded-full"
                                  />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{chain.name}</p>
                              </TooltipContent>
                            </Tooltip>
                          ) : null
                        )}
                      </TooltipProvider>
                    </div>
                    <div className="mb-[41px] md:mb-[25px] flex gap-x-2 md:mt-8 lg:mt-0 lg:h-fit">
                      <Button asChild className="bg-[#2A2E32] h-12 group">
                        <Link href={dappData.websiteUrl}>
                          Visit website
                          <Icons.arrowRight className="group-hover:-rotate-45 transition ease duration-200" />
                        </Link>
                      </Button>

                      {dappData.socialLinks.twitter && (
                        <Button asChild className=" bg-[#2A2E32] h-12">
                          <Link
                            href={dappData.socialLinks.twitter}
                            target="_blank"
                          >
                            <Icons.XIcon />
                          </Link>
                        </Button>
                      )}

                      {dappData.socialLinks.discord && (
                        <Button asChild className=" bg-[#2A2E32] h-12">
                          <Link
                            href={dappData.socialLinks.discord}
                            target="_blank"
                          >
                            <Icons.discord />
                          </Link>
                        </Button>
                      )}
                    </div>
                    <span className="font-label-size-300 mt-auto font-semibold ">
                      {dappData.status.join(", ")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-[18px] ">
              <header className="text-[16px] font-extrabold text-white">
                {`What is ${dappData.name}?`}
              </header>
              <p className="text-[16px] text-white opacity-[70%]">
                {dappData.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
