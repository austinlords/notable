import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer, cssTransition } from "react-toastify";
import NavBar from "./components/NavBar";
import Notes from "./components/Notes";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import config from "./config";
import "react-toastify/dist/ReactToastify.min.css";
import "./css/App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  componentDidMount() {
    this.authenticator();
  }

  authenticator = async user => {
    if (user === "logout") {
      try {
        const response = await fetch(`${config.apiUrl}logout`, {
          method: "POST",
          credentials: "include"
        });
        if (response.status === 200) {
          this.setState({ user: null });
          return null;
        }
      } catch (error) {
        console.log("server error: ", error);
      }
    }

    if (user) {
      this.setState({ user });
      return user;
    }

    try {
      const response = await fetch(config.apiUrl + "user", {
        credentials: "include"
      });
      if (response.status !== 200) {
        this.setState({ user: null });
        return null;
      } else {
        const user = await response.json();
        this.setState({ user });
        return user;
      }
    } catch (error) {}
  };

  render() {
    console.log("state: ", this.state);

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} logout={this.authenticator} />
        <main className="app-background">
          <Switch>
            <PrivateRoute
              path="/notes/:id"
              auth={!!this.state.user}
              authenticator={this.authenticator}
              user={this.state.user}
              component={Notes}
            />
            <PrivateRoute
              path="/notes"
              auth={!!this.state.user}
              authenticator={this.authenticator}
              user={this.state.user}
              component={Notes}
            />
            <Route
              path="/login"
              render={props => (
                <Login {...props} authenticator={this.authenticator} />
              )}
            />
            <Route
              path="/register"
              render={props => (
                <Register {...props} authenticator={this.authenticator} />
              )}
            />
            <Redirect from="/" exact to="/notes" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

const PrivateRoute = ({ component: Component, auth, user, ...rest }) => {
  async function isAuth() {
    try {
      const response = await fetch(config.apiUrl + "user", {
        credentials: "include"
      });
      if (response.status == 200) {
        let user = response.json();
        return [true, user];
      }

      return [false, null];
    } catch (error) {
      console.log("server error: ", error);
    }
  }

  if (!auth) {
    [auth, user] = isAuth();
  }

  return (
    <Route
      {...rest}
      render={props =>
        auth ? (
          <Component {...props} {...rest} user={user} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default App;
