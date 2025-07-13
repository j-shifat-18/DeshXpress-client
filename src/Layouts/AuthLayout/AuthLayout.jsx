import React from "react";
import { Outlet } from "react-router";
import DeshXpressLogo from "../../Components/DeshXpressLogo/DeshXpressLogo";
import authImg from "../../assets/images/authImage.png";

const AuthLayout = () => {
  return (
    <div className="min-h-screen ">
      <div className="flex flex-col lg:flex-row-reverse h-full ">
        <div className="min-h-screen flex justify-center items-center flex-1 bg-[#FAFDF0]">
          <img src={authImg} />
        </div>
        <div className="flex-1">
          <div className="pt-6 pl-6">
            <DeshXpressLogo></DeshXpressLogo>
          </div>
          <div className="flex justify-center items-center h-screen">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
