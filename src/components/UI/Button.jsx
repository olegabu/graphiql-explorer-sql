import React from "react";

export const Button = ({ children, className, handleClick }) => (
  <button
    className={className}
    onClick={handleClick}
  >
    {children}
  </button>
)
