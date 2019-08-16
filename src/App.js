import React, { Component } from "react";
import NavBar from "./components/navBar";
import SideBar from "./components/sideBar";
import Editor from "./components/editor";
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
          <div className="app-page">
            <SideBar />
            <Editor />
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
