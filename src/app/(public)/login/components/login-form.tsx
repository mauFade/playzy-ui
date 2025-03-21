"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth-context";

export default function LoginForm() {
  const router = useRouter();

  const { toast } = useToast();
  const { saveUserToken, setUser } = useAuth();

  // isPending do react-query não funciona muito bem
  const [wait, setWait] = useState<boolean>(false);

  const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  });

  type LoginFormData = z.infer<typeof loginSchema>;

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: api.login,
    onSuccess: ({ token, email, name, user_id }) => {
      saveUserToken(token);
      setUser({
        id: user_id,
        email,
        name,
      });
      router.push("/sessions");
      setWait(false);
    },
    onError: (error, variables) => {
      const errorMessage =
        error.message === "wrong password"
          ? "Senha incorreta, tente novamente."
          : `O e-mail ${variables.email} não está vinculado a nenhuma conta.`;

      toast({ title: "Erro ao fazer login", description: errorMessage });

      setWait(false);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    setWait(true);
    loginMutation.mutate(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Faça login na sua conta</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Entre seu e-mail"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Entre sua senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={wait}>
              {wait && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Fazer Login
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
