"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

import { api } from "@/api/api";
import { SessionInterface } from "@/api/dto/sessions";
import Carousel from "@/components/Carousel";

import SessionItem from "./components/SessionItem";

const fetchSessions = async (page: number) => {
  const response = await api.getSessions(page);
  return response;
};

const Sessions = () => {
  const [page, setPage] = useState<number>(1);

  const { data } = useQuery({
    queryKey: ["sessions", page],
    queryFn: () => fetchSessions(page),
  });

  let sessionsFetch: SessionInterface[] = [];

  if (data) {
    sessionsFetch = data.sessions;
  }

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center py-10 md:mt-12">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-extrabold text-teal-500 mb-6 text-center">
            Sessões Abertas
          </h1>

          {sessionsFetch.length ? (
            sessionsFetch.map((game) => <SessionItem key={game.id} {...game} />)
          ) : (
            <div className="flex justify-center items-center">
              <AiOutlineLoading className="text-4xl text-teal-500 animate-spin" />
            </div>
          )}

          <Carousel
            page={page}
            setPage={setPage}
            totalPages={data ? data.total_pages : 100}
          />
        </div>
      </main>
    </div>
  );
};

export default Sessions;
