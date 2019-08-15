import React, { Component } from "react";
import NavBar from "./components/navBar";
import SideBar from "./components/sideBar";
import "./App.css";

class App extends Component {
  state = {
    navbarHeight: "65px"
  };

  background = {
    background: "rgba(50, 50, 50, 0.2)",
    marginTop: this.state.navbarHeight,
    width: "100vw"
  };

  render() {
    const { navbarHeight } = this.state;

    return (
      <React.Fragment>
        <NavBar height={navbarHeight} />
        <main style={this.background}>
          <SideBar navbarHeight={navbarHeight} />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
