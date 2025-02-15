"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, ChevronDown, Gamepad2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "@/api/api";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

const formSchema = z
  .object({
    game: z.string().min(3, { message: "Insira o nome de um jogo válido" }),
    objective: z.string().min(3, { message: "Selecione um objetivo" }),
    rank: z.string().optional(),
    is_ranked: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.is_ranked && (!data.rank || data.rank.length < 3)) {
      ctx.addIssue({
        path: ["rank"],
        message: "Insira um ranque válido",
        code: z.ZodIssueCode.custom,
      });
    }
  });

const DialogModal = () => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      game: "",
      is_ranked: true,
      objective: "",
      rank: "",
    },
  });

  const mutation = useMutation({
    mutationFn: api.createSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      setIsOpen(false);
      reset();

      toast({
        title: "Sucesso!",
        description: "Sessão criada com sussesso!",
      });
    },
  });

  const objective = watch("objective");

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const apiObj = {
      ...data,
      rank: data.rank?.length ? data.rank : null,
    };

    mutation.mutate(apiObj);
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          <Gamepad2 className="h-6 w-6" />
          Criar sessão
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar sessão</DialogTitle>
          <DialogDescription>
            Crie uma sessão para chamar alguém para jogar aqui.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="game" className="text-right">
              Jogo
            </Label>
            <Input id="game" {...register("game")} className="col-span-3" />
            {errors.game && (
              <p className="text-red-500 text-sm">{errors.game.message}</p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="objective" className="text-right">
              Objetivo
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="col-span-3 flex justify-between"
                >
                  {objective || "Selecione um objetivo"}
                  <ChevronDown className="w-4 h-4 ml-2 right-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {["Jogo sério", "Por diversão", "Campeonato"].map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setValue("objective", option)}
                  >
                    {option}
                    {objective === option && (
                      <Check className="ml-auto w-4 h-4" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {errors.objective && (
              <p className="text-red-500 text-sm">{errors.objective.message}</p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rank" className="text-right">
              Ranque
            </Label>
            <Input id="rank" {...register("rank")} className="col-span-3" />
            {errors.rank && (
              <p className="text-red-500 text-sm">{errors.rank.message}</p>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">É ranked?</Label>
            <RadioGroup
              value={watch("is_ranked") ? "sim" : "não"}
              onValueChange={(value) => setValue("is_ranked", value === "sim")}
              className="col-span-3 flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sim" id="ranked-sim" />
                <Label htmlFor="ranked-sim">Sim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="não" id="ranked-nao" />
                <Label htmlFor="ranked-nao">Não</Label>
              </div>
            </RadioGroup>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Salvando..." : "Salvar sessão"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogModal;
