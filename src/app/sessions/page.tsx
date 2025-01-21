"use client";

import { api } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast, { Toast } from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import {
  MdError,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

const fetchSessions = async (page: number) => {
  const response = await api.getSessions(page);

  return response;
};

const Sessions = () => {
  const [page, setPage] = useState<number>(1);

  const { isPending, isError, error, data } = useQuery({
    queryKey: ["sessions", page],
    queryFn: () => fetchSessions(page),
  });

  const totalPages = 2;

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">
        {isPending ? (
          <p>LOADING...</p>
        ) : (
          data.map((d: any) => <p key={d.id}>{d.game}</p>)
        )}
      </h1>

      <div className="flex flex-row">
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
    </div>
  );
};

export default Sessions;
