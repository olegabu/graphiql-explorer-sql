import React from "react";
import "./SimpleLoader.css";

const SimpleLoader = ({ className }) => (
  <div className={`simple-loader ${className}`}>
    <svg className="circular-loader" viewBox="25 25 50 50">
      <circle className="loader-path" cx="50" cy="50" r="20"></circle>
    </svg>
  </div>
);

export default SimpleLoader;
