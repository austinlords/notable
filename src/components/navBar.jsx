import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="app-navbar">
      <Link className="navbar-brand" to="/">
        Notable
      </Link>
      <div className="">
        <NavLink className="navBar-link" to="/login">
          Login
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
