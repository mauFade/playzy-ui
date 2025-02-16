"use client";

import { useQuery } from "@tanstack/react-query";
import { Filter, Gamepad2, LoaderCircle, Medal } from "lucide-react";
import React, { useEffect, useState } from "react";

import { api } from "@/api/api";
import { SessionInterface } from "@/api/dto/sessions";
import Carousel from "@/components/carousel";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import CreateSessionModal from "./components/create-session-modal";
import FilterSessionModal from "./components/filter-session-modal";
import SelectSessionModal from "./components/select-session-modal";

const fetchSessions = async (
  page: number,
  selectedGame: string | null,
  isRanked: boolean | null
) => {
  const response = await api.getSessions(page, selectedGame, isRanked);
  return response;
};

const Sessions = () => {
  const [page, setPage] = useState<number>(1);
  const [selectedSession, setSelectedSession] =
    useState<SessionInterface | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [isRanked, setIsRanked] = useState<boolean | null>(null);
  const [games, setGames] = useState<string[]>([]);

  const { data, refetch } = useQuery({
    queryKey: ["sessions", page, selectedGame, isRanked],
    queryFn: () => fetchSessions(page, selectedGame, isRanked),
  });

  useEffect(() => {
    if (data && data.sessions) {
      const uniqueGames = Array.from(
        new Set(data.sessions.map((session) => session.game))
      );
      setGames(uniqueGames);
    }
  }, [data]);

  const applyFilters = () => {
    setPage(1); // Reset to first page when applying filters
    refetch();
  };

  return (
    <main className="sm:ml-14 p-4 space-y-4">
      <div className="flex justify-between items-center">
        <CreateSessionModal />
        <Button variant="outline" onClick={() => setIsFilterModalOpen(true)}>
          <Filter className="mr-2 h-4 w-4" /> Filtrar por...
        </Button>
      </div>
      <FilterSessionModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        games={games}
        selectedGame={selectedGame}
        setSelectedGame={setSelectedGame}
        isRanked={isRanked}
        setIsRanked={setIsRanked}
        applyFilters={applyFilters}
      />

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {data ? (
          data.sessions.map((session) => (
            <Card
              key={session.id}
              className="hover:cursor-pointer"
              onClick={() => {
                setSelectedSession(session);
                setIsModalOpen(true);
              }}
            >
              <CardHeader>
                <div className="flex items-center justify-center">
                  <CardTitle className="text-lg sm:text-xl select-none">
                    {session.game}
                  </CardTitle>

                  <Gamepad2 className="ml-auto w-6 h-6" />
                </div>

                <CardDescription className="flex flex-row items-center space-x-1">
                  <span className="text-base sm:text-lg">
                    Sessão de jogo criada por:
                  </span>
                  <span className="text-base sm:text-lg font-bold">
                    {session.user.gamertag}
                  </span>
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={session.user.avatar} />
                    <AvatarFallback>MC</AvatarFallback>
                  </Avatar>
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-1">
                <p className="flex items-center gap-2">
                  Modo de jogo:{" "}
                  <span className="text-base sm:text-lg font-bold inline-flex items-center gap-1">
                    {session.is_ranked ? "Ranked" : "Casual"}
                    {session.is_ranked && (
                      <Medal className="w-5 h-5 text-sky-600" />
                    )}
                  </span>
                </p>
                {session.rank && (
                  <p>
                    Ranque:{" "}
                    <span className="text-base sm:text-lg font-bold">
                      {session.rank}
                    </span>
                  </p>
                )}

                <p>
                  Objetivo:{" "}
                  <span className="text-base sm:text-lg font-bold">
                    {session.objetive}
                  </span>
                </p>

                <p className="sm:text-sm text-gray-400">
                  Data:{" "}
                  {new Date(session.created_at)
                    .toLocaleDateString("pt-BR")
                    .split("/")
                    .join("-")}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <LoaderCircle className="animate-spin" />
        )}
      </section>

      {selectedSession && (
        <SelectSessionModal
          isModalOpen={isModalOpen}
          selectedSession={selectedSession}
          setIsModalOpen={setIsModalOpen}
        />
      )}

      <Carousel
        page={page}
        setPage={setPage}
        totalPages={data ? data.total_pages : 100}
      />
    </main>
  );
};

export default Sessions;
