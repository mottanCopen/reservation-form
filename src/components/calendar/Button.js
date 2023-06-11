import React from "react";

export const Button = (props) => {
  const { text, className, onClick } = props;
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
};
