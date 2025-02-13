"use client";

import { useQuery } from "@tanstack/react-query";
import { Gamepad2, LoaderCircle } from "lucide-react";
import React, { useState } from "react";

import { api } from "@/api/api";
import Carousel from "@/components/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import CreateSessionModal from "./components/create-session-modal";
import Drawerform from "./components/drawer-form";

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

  return (
    <main className="sm:ml-14 p-4 space-y-4">
      <CreateSessionModal />
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {data ? (
          data.sessions.map((session, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-center justify-center">
                  <CardTitle className="text-lg sm:text-xl select-none">
                    {session.game}
                  </CardTitle>

                  <Gamepad2 className="ml-auto w-6 h-6" />
                </div>

                <CardDescription>
                  Sessão de jogo criada por:{" "}
                  <span className="text-base sm:text-lg font-bold">
                    {session.user.gamertag}
                  </span>
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

              <CardFooter>
                <Drawerform />
              </CardFooter>
            </Card>
          ))
        ) : (
          <LoaderCircle className="animate-spin" />
        )}
      </section>

      <Carousel
        page={page}
        setPage={setPage}
        totalPages={data ? data.total_pages : 100}
      />
    </main>
  );
};

export default Sessions;
