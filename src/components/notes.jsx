import React, { Component } from "react";
import EditorMenu from "./editor-menu";
import DraftEditor from "./draftEditor";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import SideBar from "./sideBar";
import { getNotes } from "../services/fakePostsService";
import "../css/notes.css";

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allNotes: getNotes(),
      errors: {},
      selected: this.props.match.params.id,
      editorState: EditorState.createEmpty()
    };

    this.onChange = editorState => {
      const contentState = editorState.getCurrentContent();
      this.saveContent(contentState);
      this.setState({ editorState });
    };

    // persistent DraftEditor content in local storage on refresh
    this.content = window.localStorage.getItem("content");
    if (this.content)
      this.state.editorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(this.content))
      );
  }

  componentDidMount() {
    this.populateEditor();
  }

  populateEditor() {
    try {
      const noteId = this.state.selected;
      if (noteId === "new") {
        this.setState({ editorState: EditorState.createEmpty() });
        return;
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  saveContent = content => {
    window.localStorage.setItem(
      "content",
      JSON.stringify(convertToRaw(content))
    );
  };

  generatePreview(content, title) {
    let preview = "";
    for (let i = 0; i < content.blocks.length; i++) {
      let c = content.blocks[i];
      if (c.text === title) continue;
      else if (preview.length + c.text.length < 75) {
        preview += `${c.text} `;
        continue;
      } else {
        let dif = 75 - preview.length;
        let part = c.text.slice(0, dif);
        preview += `${part}...`;
        break;
      }
    }
    return preview;
  }

  save = () => {
    const allNotes = [...this.state.allNotes];
    const data = {};
    const strContent = window.localStorage.content;
    const currentContent = JSON.parse(strContent);
    const title = currentContent.blocks.find(n => n.type === "header-one");
    if (title) data.title = title.text;

    data.content = strContent;
    data.updated = new Date();
    data.preview = this.generatePreview(currentContent, data.title);
    if (!title) data.title = data.preview;
    data._id = Math.floor(Math.random() * 9999999999).toString();

    allNotes.push(data);
    this.setState({ allNotes });
    console.log(data);
  };

  render() {
    const { editorState, allNotes } = this.state;

    return (
      <div className="app-page">
        <SideBar editorState={editorState} allNotes={allNotes} />
        <div className="editor-window">
          <EditorMenu editorState={editorState} save={this.save} />
          <DraftEditor onChange={this.onChange} editorState={editorState} />
        </div>
      </div>
    );
  }
}

export default Notes;
