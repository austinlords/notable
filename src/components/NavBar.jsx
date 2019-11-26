import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ user, logout }) => {
  return (
    <nav className="app-navbar">
      <Link className="navbar-brand" to="/">
        Notable
      </Link>

      <div className="">
        {user ? (
          <div>
            <span
              className="navBar-link clickable"
              onClick={() => logout("logout")}
              style={{ color: "orange" }}
            >
              Logout
            </span>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
