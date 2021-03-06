import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import LoadingScreen from "./components/common/LoadingScreen";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import NavBar from "./components/common/Navbar/NavBar";
import Notes from "./components/Notes/Notes";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
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
      if (!user) console.log("User not logged in");
      this.setState({ user, receivedAsyncData: true });
    } catch (error) {
      toast.error("Unexpected error: please try refreshing the page.");
      console.log(error);
      this.setState({ receivedAsyncData: true });
    }
  }

  updateUser = user => {
    this.setState({ user });
  };

  render() {
    if (!this.state.receivedAsyncData) return <LoadingScreen />;

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
