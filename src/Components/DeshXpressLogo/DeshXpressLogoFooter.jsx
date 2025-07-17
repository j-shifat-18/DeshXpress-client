import React from "react";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router";

const DeshXpressLogoFooter = () => {
  return (
    <Link to="/">
      <div className="flex items-end">
        <img className="mb-2" src={logo} alt="" />
        <p className="text-3xl font-extrabold -ml-2 text-white">DeshXpress</p>
      </div>
    </Link>
  );
};

export default DeshXpressLogoFooter;
