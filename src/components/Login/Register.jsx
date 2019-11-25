import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./login.css";

const Register = props => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  return (
    <div className="background">
      <div class="masthead">
        <div id="masthead-heading" class="container">
          <h1 class="display-4">
            Welcome to <b>Notable</b>.
          </h1>
          <h3>
            <em>A simple note-taking application.</em>
          </h3>
        </div>

        <form
          id="signUpForm"
          class="container"
          action="/register"
          method="post"
        >
          <div class="form-group">
            <label for="signUpEmail">Email address</label>
            <input
              type="email"
              name="email"
              class="form-control"
              id="signUpEmail"
              aria-describedby="emailHelp"
              placeholder="Email"
              required
              maxlength="50"
              title="Email address is required"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class="form-group">
            <label for="signUpPassword">Password</label>
            <input
              type="password"
              name="password"
              class="form-control"
              id="signUpPassword"
              placeholder="Password"
              required
              pattern="(?=.*[a-zA-Z])(?=.*\d).{8,}"
              title="Password must contain at least 1 letter, 1 number and be at least 8 characters long."
              minlength="8"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
            <small id="passwordHelp" class="form-text text-muted">
              Must contain at least 1 letter and 1 number (min 8 characters).
            </small>
          </div>

          <button type="submit" form="signUpForm" class="btn btn-primary">
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
