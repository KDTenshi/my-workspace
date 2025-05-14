import type { ButtonHTMLAttributes, FC } from "react";

import style from "./Button.module.css";

type ButtonSizes = "small" | "medium" | "large";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSizes;
}

const sizeClassNames: { [key in ButtonSizes]: string } = {
  small: style.Small,
  medium: style.Medium,
  large: style.Large,
};

const Button: FC<ButtonProps> = ({ size = "medium", children, ...restProps }) => {
  const buttonSizeClassName = sizeClassNames[size];

  const buttonClassName = restProps.className
    ? [buttonSizeClassName, restProps.className].join(" ")
    : buttonSizeClassName;

  delete restProps.className;

  return (
    <button className={buttonClassName} {...restProps}>
      {children}
    </button>
  );
};

export default Button;
