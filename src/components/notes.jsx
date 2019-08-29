import React, { Component } from "react";
import EditorMenu from "./editor-menu";
import DraftEditor from "./draftEditor";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import SideBar from "./sideBar";
import "../css/notes.css";

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allNotes: {},
      errors: {},
      selected: "",
      editorState: EditorState.createEmpty()
    };

    this.onChange = editorState => {
      const contentState = editorState.getCurrentContent();
      this.saveContent(contentState);
      this.setState({ editorState });
    };

    // persistent DraftEditor content in local storage on refresh
    const content = window.localStorage.getItem("content");
    if (content)
      this.state.editorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(content))
      );
  }

  saveContent = content => {
    window.localStorage.setItem(
      "content",
      JSON.stringify(convertToRaw(content))
    );
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className="app-page">
        <SideBar editorState={editorState} />
        <div className="editor-window">
          <EditorMenu editorState={editorState} />
          <DraftEditor onChange={this.onChange} editorState={editorState} />
        </div>
      </div>
    );
  }
}

export default Notes;
