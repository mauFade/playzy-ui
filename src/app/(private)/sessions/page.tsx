"use client";

import { useQuery } from "@tanstack/react-query";
import { Gamepad2, LoaderCircle, Medal } from "lucide-react";
import React, { useState } from "react";

import { api } from "@/api/api";
import { SessionInterface } from "@/api/dto/sessions";
import Carousel from "@/components/carousel";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import CreateSessionModal from "./components/create-session-modal";
import SelectSessionModal from "./components/select-session-modal";

const fetchSessions = async (page: number) => {
  const response = await api.getSessions(page);
  return response;
};

const Sessions = () => {
  const [page, setPage] = useState<number>(1);
  const [selectedSession, setSelectedSession] =
    useState<SessionInterface | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data } = useQuery({
    queryKey: ["sessions", page],
    queryFn: () => fetchSessions(page),
  });

  return (
    <main className="sm:ml-14 p-4 space-y-4">
      <CreateSessionModal />
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
