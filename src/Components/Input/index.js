// src/components/Input.js

import React from "react";
import cx from "classnames";

import "./style.css";

const InputField = ({
  enterKeyEvent,
  placeHolder,
  onChange,
  onBlur,
  onFocus,
  value,
  id = "userField",
  disabled = false,
  autoComplete = "",
  className = "",
}) => {
  return (
    <input
      id={id}
      disabled={disabled}
      onChange={(event) => {
        onChange(event.target.value);
      }}
      onFocus={onFocus}
      onBlur={onBlur}
      autoComplete={autoComplete}
      spellCheck={false}
      value={value}
      className={cx([className, disabled && "disabled"])}
      placeholder={placeHolder}
      onKeyDown={enterKeyEvent}
    />
  );
};

export default InputField;
