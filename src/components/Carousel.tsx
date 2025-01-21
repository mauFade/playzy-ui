import React, { useState } from "react";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

const Carousel = () => {
  const [page, setPage] = useState<number>(1);
  const totalPages = 10;

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    console.log({ page: page + 1 });
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const generatePageNumbers = () => {
    const pages = [];
    for (let i = page; i < page + 3 && i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center gap-2 mt-4">
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className={`px-4 py-2 border rounded ${
          page === 1
            ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
            : "bg-neutral-200 text-neutral-700 hover:bg-neutral-400 hover:text-neutral-200"
        }`}
      >
        <MdOutlineKeyboardDoubleArrowLeft />
      </button>

      {generatePageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => setPage(pageNumber)}
          className={`px-4 py-2 border border-neutral-200 rounded ${
            pageNumber === page
              ? "bg-neutral-800 text-neutral-300"
              : "bg-white text-neutral-700 hover:bg-neutral-400"
          }`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className={`px-4 py-2 border rounded ${
          page === totalPages
            ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
            : "bg-neutral-200 text-neutral-700 hover:bg-neutral-400 hover:text-neutral-200"
        }`}
      >
        <MdOutlineKeyboardDoubleArrowRight />
      </button>
    </div>
  );
};

export default Carousel;
