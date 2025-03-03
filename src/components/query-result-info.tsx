"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

export function QueryResultInfo({ totalItems }: { totalItems: number }) {
  const currentPage = Number(useSearchParams().get("page")) || 1;

  const startItem = (currentPage - 1) * 10 + 1;
  const endItem = Math.min(currentPage * 10, totalItems);

  return (
    <div>
      <p className="text-xs md:text-sm">
        Showing <strong>{startItem}</strong> - <strong>{endItem}</strong> of{" "}
        <strong>{new Intl.NumberFormat().format(totalItems)}</strong> Dapps
      </p>{" "}
    </div>
  );
}
