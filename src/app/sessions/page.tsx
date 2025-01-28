"use client";

import { api } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import SessionItem from "./components/SessionItem";
import { AiOutlineLoading } from "react-icons/ai";
import Carousel from "@/components/Carousel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fetchSessions = async (page: number) => {
  const response = await api.getSessions(page);
  return response;
};

const Sessions = () => {
  const [page, setPage] = useState<number>(1);

  const { isPending, data } = useQuery({
    queryKey: ["sessions", page],
    queryFn: () => fetchSessions(page),
  });

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center py-10">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-extrabold text-teal-500 mb-6 text-center">
            Sessões Abertas
          </h1>

          {isPending ? (
            <div className="flex justify-center items-center">
              <AiOutlineLoading className="text-4xl text-teal-500 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data &&
                data.sessions.map((game: any) => (
                  <SessionItem key={game.id} {...game} />
                ))}
            </div>
          )}

          <Carousel
            page={page}
            setPage={setPage}
            totalPages={data ? data.total_pages : 100}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Sessions;
