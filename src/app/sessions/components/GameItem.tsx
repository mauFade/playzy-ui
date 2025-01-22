import React from "react";

interface GameItemProps {
  id: string;
  game: string;
  user_id: string;
  objetive: string;
  rank: string | null;
  is_ranked: boolean;
  updated_at: string;
  created_at: string;
  user_name: string;
  user_gamertag: string;
  email: string;
}

const GameItem = (props: GameItemProps) => {
  return (
    <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl bg-neutral-800 text-neutral-100 p-4 rounded-lg shadow-md mx-auto">
      <h2 className="text-xl font-bold">JOGO: {props.game}</h2>
      <p className="text-sm text-neutral-400">
        Objetivo: <span className="text-neutral-100">{props.objetive}</span>
      </p>
      <p className="text-sm text-neutral-400">
        Usuário: <span className="text-neutral-100">{props.user_name}</span>
      </p>
      <p className="text-sm text-neutral-400">
        Gamertag:{" "}
        <span className="text-neutral-100">{props.user_gamertag}</span>
      </p>

      <p className="text-sm text-neutral-400">
        Rank:{" "}
        <span className="text-neutral-100">
          {props.rank ? props.rank : "Sem class"}
        </span>
      </p>
      <p className="text-sm text-neutral-400">
        Partida Ranqueada:{" "}
        <span
          className={`font-semibold ${
            props.is_ranked ? "text-green-400" : "text-red-400"
          }`}
        >
          {props.is_ranked ? "Sim" : "Não"}
        </span>
      </p>
      <div className="flex justify-between text-xs text-neutral-500 mt-4">
        <p>Criada em: {new Date(props.created_at).toLocaleString()}</p>
      </div>

      <button type="button">Bora jogar!</button>
    </div>
  );
};

export default GameItem;
