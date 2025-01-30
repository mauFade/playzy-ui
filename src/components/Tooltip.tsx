import React from "react";

interface Props {
  message: string;
}

const Tooltip = (props: Props) => {
  return (
    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-zinc-700 text-zinc-100 text-sm px-2 py-1 rounded-lg">
      {props.message}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-zinc-700"></div>
    </div>
  );
};

export default Tooltip;
