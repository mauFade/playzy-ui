"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const mockUser = {
  name: "Mauricio",
  email: "mauricio.cds55777@gmail.com",
  phone: "41985351419",
  avatar: "https://www.github.com/mauFane.png",
  gamertag: "maucardsm11785",
};

const formSchema = z.object({
  name: z.string().min(3, "Nome inválido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Número inválido"),
  gamertag: z.string().min(3, "Gamertag inválida"),
});

const EditProfileModal = () => {
  const [user, setUser] = useState(mockUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: user,
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setUser({ ...data, avatar: "" });
    reset(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4 w-full">Editar Perfil</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
          <DialogDescription>
            Atualize suas informações abaixo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="gamertag">Gamertag</Label>
            <Input id="gamertag" {...register("gamertag")} />
            {errors.gamertag && (
              <p className="text-red-500 text-sm">{errors.gamertag.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" {...register("email")} />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="phone">Telefone</Label>
            <Input id="phone" {...register("phone")} />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
