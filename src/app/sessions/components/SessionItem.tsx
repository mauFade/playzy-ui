import { Session } from "@/api/dto/sessions";
import Image from "next/image";
import React from "react";

const SessionItem = (props: Session) => {
  return (
    <div className="bg-zinc-900 text-zinc-100 p-6 rounded-3xl shadow-lg flex flex-col justify-between hover:shadow-2xl transition-shadow hover:bg-zinc-950 mb-3 lg:flex lg:flex-row lg:space-x-6 lg:items-center lg:max-h-20">
      <div className="relative group">
        <h2 className="text-2xl font-bold text-teal-600 mb-1">
          {props.game.length > 30
            ? `${props.game.substring(0, 26).toUpperCase()}...`
            : props.game.toUpperCase()}
        </h2>
        <div className="absolute bottom-full mb-2 hidden group-hover:block bg-zinc-700 text-zinc-100 text-sm px-2 py-1 rounded-lg">
          {props.game.toUpperCase()}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-zinc-700"></div>
        </div>
      </div>

      <div className="flex flex-grow"></div>
      <p className="text-sm text-zinc-400 ">
        <span className="font-semibold text-zinc-100">Objetivo:</span>{" "}
        {props.objetive}
      </p>

      <p className="text-sm text-zinc-400 ">
        <span className="font-semibold text-zinc-100">Gamertag:</span>{" "}
        {props.user.gamertag}
      </p>

      <Image
        alt="avatar"
        src={props.user.avatar}
        width={30}
        height={30}
        className="rounded-full"
      />
      <p className="text-sm text-zinc-400 ">
        <span className="font-semibold text-zinc-100">Rank:</span>{" "}
        {props.rank || "Sem classificação"}
      </p>
      <p className="text-sm text-zinc-400 mb-3 lg:mb-0">
        <span className="font-semibold text-zinc-100">Partida Ranqueada:</span>{" "}
        <span className={props.is_ranked ? "text-green-400" : "text-red-400"}>
          {props.is_ranked ? "Sim" : "Não"}
        </span>
      </p>
      <div className="flex flex-grow"></div>
      <p className="text-sm text-zinc-500 mb-3 lg:mb-0">
        Criada em: {new Date(props.created_at).toLocaleString()}
      </p>

      <div className="relative group">
        <button className="px-4 py-2 bg-teal-600 text-zinc-100 font-semibold rounded-3xl hover:bg-teal-600 transition-colors">
          Bora jogar!
        </button>
        <div className="absolute bottom-full mb-2 hidden group-hover:block bg-zinc-700 text-zinc-100 text-sm px-2 py-1 rounded-lg">
          GG!
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-zinc-700"></div>
        </div>
      </div>
    </div>
  );
};

export default SessionItem;
