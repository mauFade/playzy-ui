"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const {
    data: resp,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["resp"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8080/auth", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const trueResp = await response.json();

      return trueResp;
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ resp, isError, isPending });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 text-gray-100 items-center justify-center w-full">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <span className="text-neutral-600 font-bold text-3xl">Playzy</span>
        </div>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              placeholder="Digite seu email"
              className="w-full px-4 py-3 mt-1 bg-neutral-800 border border-gray-700 rounded-lg text-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-600"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              placeholder="Digite sua senha"
              className="w-full px-4 py-3 mt-1 bg-neutral-800 border border-gray-700 rounded-lg text-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-600"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 font-bold text-neutral-300 bg-neutral-800 rounded-lg hover:bg-neutral-600  focus:outline-none focus:ring-2 focus:ring-neutral-600"
          >
            Entrar
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Não tem uma conta?{" "}
          <Link
            href="/register"
            className="text-neutral-300 hover:underline font-medium"
          >
            Clique aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
