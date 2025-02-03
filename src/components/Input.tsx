import React, { ChangeEvent, HTMLInputTypeAttribute } from "react";

interface PropsInterface {
  id: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  label: string;
  value: string;
  required: boolean;
  setValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: PropsInterface) => {
  return (
    <>
      <label
        htmlFor={props.id}
        className="block text-xs font-semibold text-teal-600 tracking-wide"
      >
        {props.label.toUpperCase()}
      </label>
      <input
        id={props.id}
        type={props.type}
        value={props.value}
        onChange={props.setValue}
        className="w-full px-4 py-2 border-b border-teal-600 focus:outline-none bg-transparent text-teal-50 mb-4"
        placeholder={props.placeholder}
        required={props.required}
      />
    </>
  );
};

export default Input;
