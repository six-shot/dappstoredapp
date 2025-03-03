import { updateUrl } from "@/lib/utils";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

type BreadcrumbProps = {
  path: string;
  categories: {
    parentCategory: string | null;
    _id: string;
    name: string;
  }[];
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path, categories }) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 w-full flex-wrap duration-500 transition-colors">
        <li>
          <Link
            href="/dapps"
            className="text-white hover:text-[#CBF947] duration-300 transition-colors"
          >
            Dapp Book
          </Link>
        </li>

        <ChevronRightIcon />

        {categories?.map((cat, idx) => (
          <li key={cat._id} className="flex items-center gap-2">
            <Link
              href={`/dapps?categoryName=${cat.name}`}
              className="text-white/50 hover:text-[#CBF947] duration-300 transition-colors"
            >
              {cat.name}
            </Link>
            <ChevronRightIcon className="text-[#CBF947]" />
          </li>
        ))}

        <li className="flex items-center gap-2">
          <span className="text-[#CBF947]">{path}</span>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
