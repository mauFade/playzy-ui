"use client";

import { FormEvent, useState } from "react";
import { api } from "@/api/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { SlGameController } from "react-icons/sl";
import { showToast } from "@/utils/showToast";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: api.login,
    onSuccess: (data) => {
      const token = Cookies.get("jwtToken");

      if (token) Cookies.remove("jwtToken");

      Cookies.set("jwtToken", data.token, { expires: 1 }); // Expira em 1 dia

      router.push("/sessions");
    },
    onError: (error, v) => {
      const errorMessage =
        error.message === "wrong password"
          ? "Senha incorreta, tente novamente."
          : `O e-mail ${v.email} não está vinculado à nenhuma conta`;

      showToast(errorMessage, "error");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    mutate({ email, password });
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="bg-black w-1/3 hidden md:flex md:items-center md:justify-center">
        <SlGameController className="text-teal-900" size={200} />
      </div>
      <div className="flex justify-center items-center bg-gradient-to-br from-zinc-800 to-zinc-950 w-full md:w-2/3">
        <div className="flex items-start flex-col space-y-3">
          <h1 className="font-bold text-4xl mb-5">Bem vindo</h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-8 min-w-max md:min-w-96"
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-xs font-semibold text-teal-600 tracking-wide"
              >
                EMAIL
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border-b border-teal-600 focus:outline-none bg-transparent"
                placeholder="Endereço de email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-xs font-semibold text-teal-600 tracking-wide"
              >
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border-b border-teal-600 focus:outline-none bg-transparent"
                placeholder="Senha"
                required
              />
            </div>
            <button
              disabled={isPending}
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-800 text-zinc-300 py-2 px-4 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-steel focus:ring-offset-2 disabled:bg-teal-950 disabled:cursor-not-allowed disabled:text-zinc-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
