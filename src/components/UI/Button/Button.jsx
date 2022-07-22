import React from "react";

import SimpleLoader from "../SimpleLoader";
import "./Button.css";

const Button = ({ children, className, handleClick, isLoading, ...props }) => (
  <button
    className={className}
    onClick={!isLoading ? handleClick : undefined}
    disabled={isLoading}
    {...props}
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
