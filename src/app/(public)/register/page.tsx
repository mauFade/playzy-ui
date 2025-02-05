"use client";

import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

import { api } from "@/api/api";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { errorMessages } from "@/utils/errorMessages";
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
    mutationFn: api.createUser,
    onSuccess: (data) => {
      setCookie("jwtToken", data.token);

      router.push("/sessions");
    },
    onError: (error) => {
      const errorMessage = errorMessages[error.message] ?? error.message;

      setWait(false);

      showToast(errorMessage, "error");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setWait(true);

    if (password !== confirmPassword) {
      showToast("As senhas não coincidem!", "error");
      setWait(false);
    } else {
      mutation.mutate({ email, password, gamertag, name, phone });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-950">
      <div className="bg-zinc-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-teal-400 text-center mb-6">
          Crie sua conta
        </h2>
        <hr className="border-zinc-500 my-6" />
        <form onSubmit={handleSubmit} className="mt-2">
          <Input
            id="name"
            type="text"
            placeholder="Nome"
            label="Nome"
            value={name}
            required={true}
            setValue={(e) => setName(e.target.value)}
          />
          <Input
            id="email"
            type="email"
            placeholder="Email"
            label="Email"
            value={email}
            required={true}
            setValue={(e) => setEmail(e.target.value)}
          />
          <Input
            id="phone"
            type="text"
            placeholder="Telefone"
            label="Telefone"
            value={phone}
            required={true}
            setValue={(e) => setPhone(e.target.value)}
          />
          <Input
            id="password"
            type="password"
            placeholder="Senha"
            label="Senha"
            value={password}
            required={true}
            setValue={(e) => setPassword(e.target.value)}
          />
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirme sua senha"
            label="Confirme sua senha"
            value={confirmPassword}
            required={true}
            setValue={(e) => setConfirmPassword(e.target.value)}
          />
          <Input
            id="gamertag"
            type="text"
            placeholder="Gamertag"
            label="Gamertag"
            value={gamertag}
            required={true}
            setValue={(e) => setGamertag(e.target.value)}
          />
          <div className="w-full flex justify-center">
            <Button content="Criar conta" isLoading={wait} type="submit" />
          </div>
        </form>
        <hr className="border-zinc-500 my-6" />
        <p className="text-teal-600 font-light tracking-wide text-center">
          Já tem uma conta?{" "}
          <Link
            href="/login"
            className="hover:font-medium font-normal hover:border-b border-teal-600 transition-colors"
          >
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
