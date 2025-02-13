"use client";

import { Check, ChevronDown, Gamepad2 } from "lucide-react";
import { useState } from "react";

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
import { DrawerClose } from "@/components/ui/drawer";

const DialogModal = () => {
  const [game, setGame] = useState<string>("");
  const [objective, setObjective] = useState<string>("");
  const [rank, setRank] = useState<string | undefined>("");
  const [isRanked, setIsRanked] = useState<boolean>(true);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
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

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="game" className="text-right">
              Jogo
            </Label>
            <Input
              id="game"
              value={game}
              onChange={(e) => setGame(e.target.value)}
              className="col-span-3"
            />
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
                  id="objective"
                >
                  {objective || "Selecione um objetivo"}
                  <ChevronDown className="w-4 h-4 ml-2 right-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {["Jogo sério", "Por diversão", "Campeonato"].map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setObjective(option)}
                  >
                    {option}
                    {objective === option && (
                      <Check className="ml-auto w-4 h-4" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rank" className="text-right">
              Ranque
            </Label>
            <Input
              id="rank"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">É ranked?</Label>
            <RadioGroup
              value={isRanked ? "sim" : "não"}
              onValueChange={(value) => setIsRanked(value === "sim")}
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
        </div>

        <DialogFooter>
          <DrawerClose asChild>
            <Button
              type="button"
              onClick={() => {
                console.log({ game, isRanked, rank, objective });
              }}
            >
              Save changes
            </Button>
          </DrawerClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogModal;
