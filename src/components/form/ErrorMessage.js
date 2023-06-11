import React from "react";

export const ErrorMessage = (props) => {
  const { error } = props;
  return <div className="input-error-msg">{error.message}</div>;
};
