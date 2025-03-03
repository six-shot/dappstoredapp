import { buttonVariants } from "@/components/ui/button";
import { updateUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface PaginationProps {
  totalPages: number;
}

export const PaginationControls: React.FC<PaginationProps> = ({
  totalPages,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (newPage: number) => {
    router.push(updateUrl([{ key: "page", value: newPage }]));
  };

  const getPaginationRange = () => {
    const range: (number | string)[] = [];
    const delta = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currPage - delta && i <= currPage + delta)
      ) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }

    return range;
  };

  return (
    <div className="flex items-center justify-center mt-4 gap-2 flex-wrap">
      {currPage > 1 && (
        <button
          onClick={() => handlePageChange(currPage - 1)}
          className={buttonVariants({ variant: "secondary" })}
        >
          Previous
        </button>
      )}
      {getPaginationRange().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-3 py-1">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => handlePageChange(Number(page))}
            className={buttonVariants({
              variant: page === currPage ? "secondary" : "outline",
            })}
          >
            {page}
          </button>
        )
      )}
      {currPage < totalPages && (
        <button
          onClick={() => handlePageChange(currPage + 1)}
          className={buttonVariants({ variant: "secondary" })}
        >
          Next
        </button>
      )}
    </div>
  );
};
