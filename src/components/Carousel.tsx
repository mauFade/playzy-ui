import React, { SetStateAction } from "react";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

interface Props {
  page: number;
  totalPages: number;
  setPage: (value: SetStateAction<number>) => void;
}

const Carousel = (props: Props) => {
  const handlePrev = () => {
    if (props.page > 1) props.setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (props.page < props.totalPages) props.setPage((prev) => prev + 1);
  };

  const generatePageNumbers = () => {
    const pages = [];
    for (let i = props.page; i < props.page + 3 && i <= props.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={handlePrev}
        disabled={props.page === 1}
        className={`flex items-center px-4 py-2 border border-zinc-500 rounded-lg mx-2 transition-colors ${
          props.page === 1
            ? "bg-zinc-800 text-zinc-400 cursor-not-allowed"
            : "bg-teal-500 text-zinc-100 hover:bg-teal-600"
        }`}
      >
        <MdOutlineKeyboardDoubleArrowLeft className="text-xl" />
      </button>

      {generatePageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => props.setPage(pageNumber)}
          className={`px-4 py-2 border border-zinc-500 rounded-lg mx-1 transition-colors ${
            pageNumber === props.page
              ? "bg-teal-500 text-zinc-100"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
          }`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={props.page === props.totalPages}
        className={`flex items-center px-4 py-2 border border-zinc-500 rounded-lg mx-2 transition-colors ${
          props.page === props.totalPages
            ? "bg-zinc-800 text-zinc-400 cursor-not-allowed"
            : "bg-teal-500 text-zinc-100 hover:bg-teal-600"
        }`}
      >
        <MdOutlineKeyboardDoubleArrowRight className="text-xl" />
      </button>
    </div>
  );
};

export default Carousel;
