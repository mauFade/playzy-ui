"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "@/api/api";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { errorMessages } from "@/constants/errorMessages";

const formatPhoneNumber = (value: string) => {
  const numbers = value.replace(/\D/g, "");

  let formatted = numbers;
  if (numbers.length <= 11) {
    formatted = numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }

  return formatted;
};

const Register = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [wait, setWait] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const registerSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    gamertag: z.string().min(4, "Insira uma gamertag válida"),
    name: z.string().min(3, "Insira um nome válido"),
    phone: z.string().min(11, "Insira um celuar válido"),
  });

  type RegisterFormData = z.infer<typeof registerSchema>;

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      gamertag: "",
      name: "",
      phone: "",
    },
  });

  const mutation = useMutation({
    mutationFn: api.createUser,
    onSuccess: (data) => {
      setCookie("jwtToken", data.token);
      router.push("/sessions");
    },
    onError: (error) => {
      const errorMessage = errorMessages[error.message] ?? error.message;
      setWait(false);
      toast({ title: "Erro ao criar conta", description: errorMessage });
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    setWait(true);

    if (data.password !== confirmPassword) {
      toast({
        title: "As senhas não coincidem!",
        description: "As senhas devem ser iguais",
      });
      setWait(false);
    } else {
      mutation.mutate({ ...data, phone: data.phone.replace(/\D/g, "") });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Criar conta</CardTitle>
          <CardDescription>
            Preencha os campos abaixo para criar sua conta
          </CardDescription>
        </CardHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="João Silva"
                {...form.register("name")}
                className={form.formState.errors.name && "border-red-500"}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="exemplo@email.com"
                {...form.register("email")}
                className={form.formState.errors.email && "border-red-500"}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gamertag">Gamertag</Label>
              <Input
                id="gamertag"
                placeholder="Seu nome de jogador"
                {...form.register("gamertag")}
                className={form.formState.errors.gamertag && "border-red-500"}
              />
              {form.formState.errors.gamertag && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.gamertag.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Celular</Label>
              <Input
                id="phone"
                placeholder="(11) 99999-9999"
                {...form.register("phone")}
                value={form.watch("phone")}
                onChange={(e) => {
                  const formatted = formatPhoneNumber(e.target.value);
                  form.setValue("phone", formatted);
                }}
                className={form.formState.errors.phone && "border-red-500"}
              />
              {form.formState.errors.phone && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.phone.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                {...form.register("password")}
                className={form.formState.errors.password && "border-red-500"}
              />
              {form.formState.errors.password && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" type="submit" disabled={wait}>
              {wait && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Criar conta
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Entrar
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
