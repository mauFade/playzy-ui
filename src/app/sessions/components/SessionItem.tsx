import { Session } from "@/api/dto/sessions";
import React from "react";

const SessionItem = (props: Session) => {
  return (
    <div className="bg-zinc-900 text-zinc-100 p-6 rounded-3xl shadow-lg flex flex-col justify-between hover:shadow-2xl transition-shadow hover:bg-zinc-950">
      <div>
        <h2 className="text-2xl font-bold text-teal-400 mb-2">
          {props.game.toUpperCase()}
        </h2>
        <p className="text-sm text-zinc-400 mb-1">
          <span className="font-semibold text-zinc-100">Objetivo:</span>{" "}
          {props.objetive}
        </p>
        <p className="text-sm text-zinc-400 mb-1">
          <span className="font-semibold text-zinc-100">Usuário:</span>{" "}
          {props.user.name}
        </p>
        <p className="text-sm text-zinc-400 mb-1">
          <span className="font-semibold text-zinc-100">Gamertag:</span>{" "}
          {props.user.gamertag}
        </p>
        <p className="text-sm text-zinc-400 mb-1">
          <span className="font-semibold text-zinc-100">Rank:</span>{" "}
          {props.rank || "Sem classificação"}
        </p>
        <p className="text-sm text-zinc-400 mb-4">
          <span className="font-semibold text-zinc-100">
            Partida Ranqueada:
          </span>{" "}
          <span className={props.is_ranked ? "text-green-400" : "text-red-400"}>
            {props.is_ranked ? "Sim" : "Não"}
          </span>
        </p>
      </div>

      <div className="flex justify-between items-center text-sm text-zinc-500">
        <p>Criada em: {new Date(props.created_at).toLocaleString()}</p>
        <button className="px-4 py-2 bg-teal-500 text-zinc-100 font-semibold rounded-3xl hover:bg-teal-600 transition-colors">
          Bora jogar!
        </button>
      </div>
    </div>
  );
};

export default SessionItem;
