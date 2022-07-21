import React from "react";

import SimpleLoader from "../SimpleLoader";
import "./Button.css";

const Button = ({ children, className, handleClick, isLoading }) => (
  <button
    className={className}
    onClick={!isLoading ? handleClick : undefined}
    disabled={isLoading}
  >
    {
      isLoading && (
        <SimpleLoader className="button-loader" />
      )
    }
    {children}
  </button>
);

export default Button;
