"use client";

import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { SlGameController } from "react-icons/sl";

import { api } from "@/api/api";
import Input from "@/components/Input";
import { showToast } from "@/utils/showToast";

const Register = () => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [gamertag, setGamertag] = useState<string>("");
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
      <div className="flex justify-center items-center bg-gradient-to-br from-zinc-800 to-zinc-950 w-full md:w-2/3 flex-col space-y-3  px-20">
        <h1 className="font-bold text-4xl mb-5 text-teal-700">
          Você está prestes a achar alguém pra jogar!
        </h1>

        <form
          onSubmit={handleSubmit}
          className="md:min-w-96 w-full flex flex-col items-center space-y-6"
        >
          <div className="grid grid-cols-2 gap-6 justify-items-center w-full">
            <div className="w-full">
              <Input
                id="name"
                type="name"
                label="nome"
                value={name}
                setValue={(e) => setName(e.target.value)}
                placeholder="Nome completo"
                required={true}
              />

              <Input
                id="email"
                type="email"
                label="email"
                value={email}
                setValue={(e) => setEmail(e.target.value)}
                placeholder="Endereço de email"
                required={true}
              />

              <Input
                id="gamertag"
                type="gamertag"
                label="gamertag"
                value={gamertag}
                setValue={(e) => setGamertag(e.target.value)}
                placeholder="Gamertag"
                required={true}
              />
            </div>

            <div className="w-full">
              <Input
                id="phone"
                type="phone"
                label="celular"
                value={phone}
                setValue={(e) => setPhone(e.target.value)}
                placeholder="Celular (11) 99999-9999"
                required={true}
              />

              <Input
                id="password"
                type="password"
                label="senha"
                value={password}
                setValue={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                required={true}
              />

              <Input
                id="confirmPassword"
                type="confirmPassword"
                label="senha"
                value={confirmPassword}
                setValue={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme sua senha"
                required={true}
              />
            </div>
          </div>

          <button
            disabled={wait}
            type="submit"
            className="flex justify-center items-center w-1/2 bg-teal-600 hover:bg-teal-800 text-zinc-300 py-2 px-4 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-steel focus:ring-offset-2 disabled:bg-teal-950 disabled:cursor-not-allowed disabled:text-zinc-500"
          >
            {wait ? (
              <AiOutlineLoading className="text-4xl animate-spin" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
