import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Notes from "./components/Notes";
import "./css/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="app-background">
          <Switch>
            <Route path="/notes/:id" component={Notes} />
            <Route path="/notes" component={Notes} />
            <Redirect from="/" exact to="/notes" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
