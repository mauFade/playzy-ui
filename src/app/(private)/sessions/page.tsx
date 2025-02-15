"use client";

import { useQuery } from "@tanstack/react-query";
import { Gamepad2, LoaderCircle } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import CreateSessionModal from "./components/create-session-modal";
import Drawerform from "./components/drawer-form";

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
          data.sessions.map((session, i) => (
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
                    <AvatarImage
                      src={
                        i % 2 === 0
                          ? "https://www.github.com/mauFade.png"
                          : "https://www.github.com/shadcn.png"
                      }
                    />
                    <AvatarFallback>MC</AvatarFallback>
                  </Avatar>
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-1">
                <p>
                  Modo de jogo:{" "}
                  <span className="text-base sm:text-lg font-bold">
                    {session.is_ranked ? "Ranked" : "Casual"}
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-80 sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedSession?.game}
            </DialogTitle>
          </DialogHeader>

          {selectedSession && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://www.github.com/mauFade.png" />
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
                <span className="font-semibold">
                  {selectedSession.user.gamertag}
                </span>
              </div>

              <div className="grid gap-2">
                <p className="text-lg">
                  Modo de jogo:{" "}
                  <span className="font-semibold">
                    {selectedSession.is_ranked ? "Ranked" : "Casual"}
                  </span>
                </p>
                {selectedSession.rank && (
                  <p className="text-lg">
                    Ranque:{" "}
                    <span className="font-semibold">
                      {selectedSession.rank}
                    </span>
                  </p>
                )}
                <p className="text-lg">
                  Objetivo:{" "}
                  <span className="font-semibold">
                    {selectedSession.objetive}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Criado em:{" "}
                  {new Date(selectedSession.created_at)
                    .toLocaleDateString("pt-BR")
                    .split("/")
                    .join("-")}
                </p>
              </div>

              <Drawerform />
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Carousel
        page={page}
        setPage={setPage}
        totalPages={data ? data.total_pages : 100}
      />
    </main>
  );
};

export default Sessions;
