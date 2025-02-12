"use client";

import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { SlGameController } from "react-icons/sl";

import { api } from "@/api/api";
import Input from "@/components/Input";
import { showToast } from "@/utils/showToast";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [wait, setWait] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: api.login,
    onSuccess: async (data) => {
      setCookie("jwtToken", data.token);

      router.push("/sessions");
    },
    onError: (error, v) => {
      const errorMessage =
        error.message === "wrong password"
          ? "Senha incorreta, tente novamente."
          : `O e-mail ${v.email} não está vinculado à nenhuma conta`;

      setWait(false);

      showToast(errorMessage, "error");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setWait(true);
    mutation.mutate({ email, password });
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="bg-black w-1/3 hidden md:flex md:items-center md:justify-center">
        <SlGameController className="text-teal-900" size={200} />
      </div>
      <div className="flex justify-center items-center bg-gradient-to-br from-zinc-800 to-zinc-950 w-full md:w-2/3">
        <div className="flex items-center flex-col space-y-3">
          <h1 className="font-bold text-4xl mb-5 text-teal-700">Bem vindo</h1>

          <form onSubmit={handleSubmit} className="min-w-max md:min-w-96 py-4">
            <Input
              id="email"
              type="email"
              label="email"
              value={email}
              setValue={(e) => setEmail(e.target.value)}
              placeholder="Endereço de email"
              required
            />

            <Input
              id="password"
              type="password"
              label="password"
              value={password}
              setValue={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              required
            />
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="w-36 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg transition flex justify-center items-center"
              >
                {wait ? (
                  <AiOutlineLoading className="text-4xl animate-spin" />
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          <p className="text-teal-600 font-light tracking-wide text-center">
            Não tem uma conta?{" "}
            <Link
              href="/register"
              className="hover:font-medium font-normal hover:border-b transition-colors border-teal-600"
            >
              Registre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
