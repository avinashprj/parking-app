import { ChangeEvent, useState } from "react";

export const useInput = (state: { [key: string]: string }) => {
  const [inputState, setInputState] = useState(state);
  const inputUpdate = (e: ChangeEvent<HTMLInputElement>): void => {
    const inpValue = e.target.value;
    setInputState({
      ...inputState,
      [e.target.name]: inpValue,
    });
  };
  return { inputState, inputUpdate, setInputState };
};
