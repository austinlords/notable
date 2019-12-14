import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/auth";
import { toast } from "react-toastify";
import AppContext from "../context/AppContext";

const NavBar = () => {
  return (
    <AppContext.Consumer>
      {value => {
        async function handleLogout(e) {
          try {
            const message = await logout();
            value.updateUser(null);
            toast.success(message, {
              position: toast.POSITION.BOTTOM_RIGHT
            });
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
              {value.user ? (
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
      }}
    </AppContext.Consumer>
  );
};

export default NavBar;
