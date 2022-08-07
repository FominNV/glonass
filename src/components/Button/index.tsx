import { FC } from "react";
import { IButtonProps } from "./types";

import "./styles.scss";

const Button: FC< IButtonProps> = ({ name, callback }) => (
  <button
    className="Button"
    onClick={() => callback()}
  >
    {name}
  </button>
);

export default Button;
