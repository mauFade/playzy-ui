"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { api } from "@/api/api";
import toast, { Toast } from "react-hot-toast";
import { MdError } from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";

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
      toast((t: Toast) => {
        t.duration = 5000;

        const errorMessage =
          error.message === "wrong password"
            ? "Senha incorreta, tente novamente."
            : `O e-mail ${v.email} não está vinculado à nenhuma conta`;

        return (
          <div className="flex items-center gap-2 font-semibold">
            <MdError size={50} />
            {errorMessage}
            <button onClick={() => toast.dismiss(t.id)}>
              <IoMdClose size={20} />
            </button>
          </div>
        );
      });
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="bg-black w-1/3"></div>
      <div className="flex justify-center items-center bg-gradient-to-br from-zinc-800 to-zinc-950 w-2/3">
        <div className="flex items-start flex-col space-y-3">
          <h1 className="font-bold text-4xl mb-5">Bem vindo</h1>

          <form onSubmit={handleSubmit} className="space-y-8 min-w-96">
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
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-800 text-white py-2 px-4 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-steel focus:ring-offset-2"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
