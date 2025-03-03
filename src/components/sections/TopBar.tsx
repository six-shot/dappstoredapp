import logo from "@/assets/logo-01.svg";
import Image from "next/image";
import Link from "next/link";

const TopBar = () => {
  return (
    <div className="hidden sm:flex topBarShadow h-[70px] sticky z-50 bg-[#0C0D0E] text-white top-0 justify-center items-center px-4 md:px-6">
      <div className="max-w-[1245px] mx-auto w-full flex justify-between items-center">
        <Link href={"/dapps"} className="flex justify-center items-center">
          <Image src={logo} width={35} height={35} alt="Dappstore Logo" />
          <span className="font-bold text-[20.02px]">APP BOOK</span>
        </Link>
        <ul className="">
          <Link href={"/dapps"} className="inLinkne-block mx-4">
            Dapps
          </Link>
          <Link href={"/list-dapp"} className="inLinkne-block mx-4">
            List
          </Link>
          <Link href={"/"} className="inLinkne-block mx-4">
            Blog
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default TopBar;
