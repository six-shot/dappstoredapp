"use client";
import logo from "@/assets/logo-01.svg";
import React, { useCallback, useEffect, useState } from "react";

import Image from "next/image";

import Link from "next/link";

const MobileTopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget as HTMLElement;
    target.classList.toggle("open");
    setIsMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const navIcon = document.getElementById("nav-icon2");
    if (navIcon) {
      const handleClick = (event: MouseEvent) =>
        toggleMenu(event as unknown as React.MouseEvent<HTMLElement>);
      navIcon.addEventListener("click", handleClick);

      return () => {
        navIcon.removeEventListener("click", handleClick);
      };
    }
  }, [toggleMenu]);

  return (
    <div className="topBarShadow z-50 w-full bg-[#0C0D0E] text-white flex fixed top-0 sm:hidden h-[64px] justify-between items-center px-[22px] py-[17px]">
      <Link href={"/dapps"} className="flex justify-center items-center">
        <Image src={logo} width={35} height={35} alt="Dappstore Logo" />
        <span className="font-bold text-[20.02px]">APP BOOK</span>
      </Link>

      <div className="w-10 h-10 flex justify-center items-center bg-[#2A2E32] rounded-[10px]">
        <div id="nav-icon2">
          <span></span>
          <span></span>
        </div>
      </div>

      <div
        className={`fixed pb-8 inset-0 bg-black z-50 transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 visible top-[64px]"
            : " top-[64px] opacity-0 invisible"
        }`}
      >
        <div className="h-full overflow-y-auto flex flex-col justify-between">
          <div className="w-full flex justify-between px-8 flex-col gap-4">
            <Link href={"/dapps"} className="">
              Dapps
            </Link>
            <Link href={"/list-dapp"} className="">
              List
            </Link>
            <Link href={"/"} className="">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileTopBar;
