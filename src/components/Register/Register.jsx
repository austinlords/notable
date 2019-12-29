import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../../services/auth";
import "./login.css";

const Register = ({ user, updateUser }) => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const handleRegister = async event => {
    event.preventDefault();
    try {
      let newUser = await register(email, password);
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
            Welcome to <b>Notable</b>.
          </h1>
          <h3>
            <em>A simple note-taking application.</em>
          </h3>
        </div>

        <form id="signUpForm" className="container" onSubmit={handleRegister}>
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
            Register
          </button>
          <div className="float-right">
            <Link to="/login">Already registered? Click here.</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
