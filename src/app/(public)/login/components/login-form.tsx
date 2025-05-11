"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";
import { ArrowRight, AtSign, KeyRound } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const { setUserData } = useAuth();

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
    onSuccess: ({ token, email, name, user_id, avatar, gamertag, phone }) => {
      setUserData(
        {
          email,
          name,
          id: user_id,
          avatar,
          gamertag,
          phone,
        },
        token
      );

      toast("Tudo certo ao fazer login!", { description: "Bora lá!" });
      router.push("/sessions");
      setWait(false);
    },
    onError: (error, variables) => {
      const errorMessage =
        error.message === "wrong password"
          ? "Senha incorreta, tente novamente."
          : `O e-mail ${variables.email} não está vinculado a nenhuma conta.`;

      toast("Erro ao fazer login", { description: errorMessage });

      setWait(false);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    setWait(true);
    loginMutation.mutate(data);
  };

  return (
    <Card className="border-border/40 shadow-lg">
      <CardHeader className="pb-4 space-y-1">
        <h2 className="text-xl font-semibold text-center">
          Bem-vindo de volta
        </h2>
        <p className="text-sm text-muted-foreground text-center">
          Insira seus dados para acessar sua conta
        </p>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">Email</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="seu.email@exemplo.com"
                        className="pl-10"
                        {...field}
                      />
                    </FormControl>
                    <AtSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">Senha</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        {...field}
                      />
                    </FormControl>
                    <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              className="w-full font-medium group"
              type="submit"
              disabled={wait}
              size="lg"
            >
              {wait ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
              {wait ? "Entrando..." : "Fazer Login"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
