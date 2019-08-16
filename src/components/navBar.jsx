import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../css/navBar.css";

const NavBar = () => {
  return (
    <nav className="app-navbar">
      <Link className="navbar-brand" to="/">
        Notable
      </Link>
      <div className="">
        <NavLink className="navBar-link" to="/home">
          Home
        </NavLink>
        <NavLink className="navBar-link" to="/features">
          Features
        </NavLink>
        <NavLink className="navBar-link" to="/pricing">
          Pricing
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
