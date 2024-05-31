import { MouseEventHandler } from "react";
import s from "../css/buttons.module.css";

type Props = {
  buttonText: string;
  onClick: MouseEventHandler;
};

const Button = ({ buttonText, onClick }: Props) => {
  return (
    <button type="button" className={s.btn_reset} onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default Button;
