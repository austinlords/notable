import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../services/auth";
import "./login.css";

const Login = ({ user, updateUser }) => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const handleLogin = async event => {
    event.preventDefault();
    try {
      let newUser = await login(email, password);
      if (newUser) {
        updateUser(newUser);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (user) return <Redirect to="/notes" />;

  return (
    <div className="background">
      <div className="masthead">
        <div id="masthead-heading" className="container">
          <h1 className="display-4">
            Welcome back to <b>Notable</b>.
          </h1>
          <h3>
            <em>A simple note-taking application.</em>
          </h3>
        </div>

        <form id="signUpForm" className="container" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="signUpEmail"
              aria-describedby="emailHelp"
              placeholder="Email"
              required
              maxLength="50"
              title="Email address is required"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="signUpPassword"
              placeholder="Password"
              required
              minLength="8"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
            <small id="passwordHelp" className="form-text text-muted">
              Minimum length: 8 characters
            </small>
          </div>

          <button type="submit" form="signUpForm" className="btn btn-primary">
            Login
          </button>
          <div className="float-right">
            <Link to="/register">Need to register? Click here.</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
