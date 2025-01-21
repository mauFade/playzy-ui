"use client";

import { api } from "@/api/api";
import Carousel from "@/components/Carousel";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const Sessions = () => {
  // const [page, setPage] = useState<number>(1);

  // const { isPending, isError, data, error } = useMutation({
  //   mutationFn: api.getSessions,
  // });

  return (
    <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 min-h-screen flex justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Carrossel de Paginação</h1>
      <Carousel />
    </div>
  );
};

export default Sessions;
