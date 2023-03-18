// src/components/Button.js

import React from "react";
import cx from "classnames";

import "./style.css";

const Button = ({
  id = "cta",
  type = "button",
  children,
  buttonRef,
  className = "",
  iconClass = "",
  onClick,
  ...rest
}) => {
  return (
    <button
      id={id}
      type={type}
      className={`${cx("button", className)}`}
      ref={buttonRef}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
