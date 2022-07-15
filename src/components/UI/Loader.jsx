import React from "react";
import { ReactComponent as LoaderSVG } from "../../assets/imgs/loader.svg";

const Loader = ({ className }) => (
  <div className={`w-screen h-screen bg-transparent flex items-center justify-center ${className}`}>
    <LoaderSVG className="w-20" />
  </div>
);

export default Loader;
