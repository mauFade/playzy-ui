import { Medal } from "lucide-react";
import React from "react";

import { SessionInterface } from "@/api/dto/sessions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import Drawerform from "./drawer-form";

interface PropsInterface {
  isModalOpen: boolean;
  setIsModalOpen: (v: boolean) => void;
  selectedSession: SessionInterface;
}

const SelectSessionModal = (props: PropsInterface) => {
  return (
    <Dialog open={props.isModalOpen} onOpenChange={props.setIsModalOpen}>
      <DialogContent className="max-w-80 sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {props.selectedSession.game}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={props.selectedSession.user.avatar} />
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
            <span className="font-semibold">
              {props.selectedSession.user.gamertag}
            </span>
          </div>

          <div className="grid gap-2">
            <p className="text-lg flex items-center gap-2">
              Modo de jogo:{" "}
              <span className="font-semibold inline-flex items-center gap-1">
                {props.selectedSession.is_ranked ? "Ranked" : "Casual"}
                {props.selectedSession.is_ranked && (
                  <Medal className="w-5 h-5 text-sky-600" />
                )}
              </span>
            </p>
            {props.selectedSession.rank && (
              <p className="text-lg">
                Ranque:{" "}
                <span className="font-semibold">
                  {props.selectedSession.rank}
                </span>
              </p>
            )}
            <p className="text-lg">
              Objetivo:{" "}
              <span className="font-semibold">
                {props.selectedSession.objetive}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              Criado em:{" "}
              {new Date(props.selectedSession.created_at)
                .toLocaleDateString("pt-BR")
                .split("/")
                .join("-")}
            </p>
          </div>

          <Drawerform otherUserId={props.selectedSession.user.id} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectSessionModal;
