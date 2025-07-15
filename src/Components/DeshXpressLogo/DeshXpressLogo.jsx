import React from "react";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router";

const DeshXpressLogo = () => {
  return (
    <Link to='/'>
      <div className="flex items-end">
        <img className="mb-2" src={logo} alt="" />
        <p className="text-3xl font-extrabold -ml-2 text-black">DeshXpress</p>
      </div>
    </Link>
  );
};

export default DeshXpressLogo;
