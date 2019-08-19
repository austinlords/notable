import React, { Component } from "react";
import EditorMenu from "./editor-menu";
import "../css/editor.css";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="editor-window">
        <EditorMenu />
        <div className="editor-edit" />
      </div>
    );
  }
}

export default Editor;
