import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/auth";
import { toast } from "react-toastify";

const NavBar = ({ user, updateUser }) => {
  async function handleLogout(e) {
    try {
      const user = await logout();
      // no user means logout successful
      if (!user) updateUser(user);
    } catch (error) {
      return toast.error(error);
    }
  }

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
              onClick={handleLogout}
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
