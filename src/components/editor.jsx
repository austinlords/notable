import React, { Component } from "react";
import EditorMenu from "./editor-menu";
import DraftEditor from "./draftEditor";
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
        <DraftEditor />
      </div>
    );
  }
}

export default Editor;
