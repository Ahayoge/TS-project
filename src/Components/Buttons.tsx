import { FC, MouseEventHandler } from "react";
import s from "../css/buttons.module.css";

const Button: FC<{ buttonText: string; onClick: MouseEventHandler }> = ({
  buttonText,
  onClick,
}) => {
  return (
    <button type="button" className={s.btn_reset} onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default Button;
