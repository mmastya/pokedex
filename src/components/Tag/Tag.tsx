import React from "react";
import "./Tag.css";
import randomColor from "random-color";

const colors = new Map();

export const Tag = (props): JSX.Element => {
  let currentColor = colors.get(props.children);

  if (!currentColor) {
    const color = randomColor();
    currentColor = color.hexString();

    colors.set(props.children, color.hexString());
  }
  return (
    <span style={{ backgroundColor: currentColor, color: "black" }} className={"tag"}>
      {props.children}
    </span>
  );
};
