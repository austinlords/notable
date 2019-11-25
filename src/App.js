import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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

  authenticator = async user => {
    if (user === "logout") return this.setState({ user: null });
    if (user) return this.setState({ user });

    try {
      const response = await fetch(config.apiUrl + "user");
      if (response.status !== 200) {
        this.setState({ user: null });
      } else {
        const user = await response.json();
        this.setState({ user });
      }
    } catch (error) {}
  };

  componentDidMount() {
    this.authenticator();
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
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

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth ? <Component {...props} {...rest} /> : <Redirect to="/login" />
    }
  />
);

export default App;
