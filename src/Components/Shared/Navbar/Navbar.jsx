import React from "react";
import { Link, NavLink } from "react-router";
import DeshXpressLogo from "../../DeshXpressLogo/DeshXpressLogo";
import './navbar.css'

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li>
        <NavLink to="/sendParcel">Send Parcel</NavLink>
      </li>
      <li>
        <NavLink to="/trackOrder">Track Order</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      
    </>
  );
  return (
    <div className="navbar bg-white shadow-sm rounded-2xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <div className="w-6 text-black"><DeshXpressLogo></DeshXpressLogo></div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-black text-base font-medium">
          {links}
        </ul>
      </div>
      <div className="navbar-end">
        <Link to="/login" className="btn bg-primary rounded-4xl">Login</Link>
      </div>
    </div>
  );
};

export default Navbar;
