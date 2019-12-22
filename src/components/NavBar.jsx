import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/auth";
import { toast } from "react-toastify";
import AppContext from "../context/AppContext";

const NavBar = () => {
  const app = useContext(AppContext);

  async function handleLogout() {
    try {
      const message = await logout();
      app.updateUser(null);
      toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } catch (error) {
      console.log(error);
      toast.error("Could not logout. Unexpected error: " + error.message);
    }
  }

  return (
    <nav className="app-navbar">
      <Link className="navbar-brand" to="/">
        Notable
      </Link>

      <div className="">
        {app.user ? (
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
