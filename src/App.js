import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar";
import Notes from "./components/Notes";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import { validateUser } from "./services/auth";
import "react-toastify/dist/ReactToastify.min.css";
import "./css/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };

    this.updateUser = this.updateUser.bind(this);
  }

  async componentDidMount() {
    try {
      const user = await validateUser();
      if (user) this.setState({ user });
    } catch (error) {
      console.log(error);
    }
  }

  updateUser = user => {
    this.setState({ user });
  };

  render() {
    console.log("state: ", this.state);

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} updateUser={this.updateUser} />
        <main className="app-background">
          <Switch>
            <Route
              path="/notes/:id"
              render={props => (
                <Notes
                  user={this.state.user}
                  updateUser={this.updateUser}
                  {...props}
                />
              )}
            />
            <Route
              path="/notes"
              render={props => (
                <Notes
                  user={this.state.user}
                  updateUser={this.updateUser}
                  {...props}
                />
              )}
            />
            <Route
              path="/login"
              render={props => (
                <Login
                  user={this.state.user}
                  updateUser={this.updateUser}
                  {...props}
                />
              )}
            />
            <Route
              path="/register"
              render={props => (
                <Register
                  user={this.state.user}
                  updateUser={this.updateUser}
                  {...props}
                />
              )}
            />
            <Redirect from="/" exact to="/notes" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
