"use client";

import { useQuery } from "@tanstack/react-query";
import { Gamepad2, LoaderCircle, Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

import { api } from "@/api/api";
import Carousel from "@/components/carousel";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const fetchSessions = async (page: number) => {
  const response = await api.getSessions(page);
  return response;
};

const chartData = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

const Sessions = () => {
  const [page, setPage] = useState<number>(1);

  const { data } = useQuery({
    queryKey: ["sessions", page],
    queryFn: () => fetchSessions(page),
  });

  const [goal, setGoal] = React.useState(350);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  return (
    <main className="sm:ml-14 p-4 space-y-4">
      <h1 className="font-bold text-center">Sessions</h1>

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
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button>Bora jogar!</Button>
                  </DrawerTrigger>

                  <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                      <DrawerHeader>
                        <DrawerTitle>Move Goal</DrawerTitle>
                        <DrawerDescription>
                          Set your daily activity goal.
                        </DrawerDescription>
                      </DrawerHeader>
                      <div className="p-4 pb-0">
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 shrink-0 rounded-full"
                            onClick={() => onClick(-10)}
                            disabled={goal <= 200}
                          >
                            <Minus />
                            <span className="sr-only">Decrease</span>
                          </Button>
                          <div className="flex-1 text-center">
                            <div className="text-7xl font-bold tracking-tighter">
                              {goal}
                            </div>
                            <div className="text-[0.70rem] uppercase text-muted-foreground">
                              Calories/day
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 shrink-0 rounded-full"
                            onClick={() => onClick(10)}
                            disabled={goal >= 400}
                          >
                            <Plus />
                            <span className="sr-only">Increase</span>
                          </Button>
                        </div>
                        <div className="mt-3 h-[120px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                              <Bar
                                dataKey="goal"
                                style={
                                  {
                                    fill: "hsl(var(--foreground))",
                                    opacity: 0.9,
                                  } as React.CSSProperties
                                }
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </div>
                  </DrawerContent>
                </Drawer>
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
