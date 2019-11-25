import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="app-navbar">
      <Link className="navbar-brand" to="/">
        Notable
      </Link>
      <div className=""></div>
    </nav>
  );
};

export default NavBar;
