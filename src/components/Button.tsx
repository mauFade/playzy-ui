import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

interface PropsInterface {
  isLoading: boolean;
  content: string;
  type: "submit" | "reset" | "button";
}

const Button = (props: PropsInterface) => {
  return (
    <button
      type={props.type}
      className="w-36 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg transition flex justify-center items-center"
    >
      {props.isLoading ? (
        <AiOutlineLoading className="text-4xl animate-spin" />
      ) : (
        props.content
      )}
    </button>
  );
};

export default Button;
