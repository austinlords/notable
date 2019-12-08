import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar";
import Notes from "./components/Notes";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import { validateUser } from "./services/auth";
import AppContext from "./context/AppContext";
import "react-toastify/dist/ReactToastify.min.css";
import "./css/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      receivedAsyncData: false
    };

    this.updateUser = this.updateUser.bind(this);
  }

  async componentDidMount() {
    try {
      const user = await validateUser();
      this.setState({ user, receivedAsyncData: true });
    } catch (error) {
      console.log(error);
    }
  }

  updateUser = user => {
    this.setState({ user });
  };

  render() {
    if (!this.state.receivedAsyncData) return <div>loading...</div>;

    return (
      <React.Fragment>
        <AppContext.Provider
          value={{
            user: this.state.user,
            updateUser: this.updateUser
          }}
        >
          <ToastContainer />
          <NavBar />
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
        </AppContext.Provider>
      </React.Fragment>
    );
  }
}

export default App;
