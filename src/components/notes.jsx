import React, { Component } from "react";
import EditorMenu from "./EditorMenu";
import DraftEditor from "./DraftEditor";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import SideBar from "./SideBar";
import { getNotes, getNote } from "../services/fakePostsService";
import { saveNote } from "../services/notesService";
import "../css/notes.css";

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allNotes: getNotes(),
      errors: {},
      editorState: EditorState.createEmpty(),
      selectedNote: null
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

  populateEditor() {
    const id = this.props.match.params.id;

    if (
      id === "new" &&
      this.state.editorState !== EditorState.createEmpty() &&
      this.state.selectedNote !== null
    ) {
      delete window.localStorage.content;
      this.setState({
        editorState: EditorState.createEmpty(),
        selectedNote: null
      });
      return;
    }

    const note = getNote(id);
    if (!note && this.state.selectedNote !== null) {
      delete window.localStorage.content;
      this.setState({
        editorState: EditorState.createEmpty(),
        selectedNote: null
      });
      return this.props.history.replace("/notes");
    }

    if (note && this.state.selectedNote !== note._id) {
      const editorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(note.content))
      );
      this.setState({ editorState, selectedNote: note._id });
    }
  }

  componentDidMount() {
    this.populateEditor();
  }

  componentDidUpdate() {
    this.populateEditor();
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

  save = async () => {
    let allNotes = [...this.state.allNotes];
    const data = {};
    const strContent = window.localStorage.content;
    const currentContent = JSON.parse(strContent);
    const title = currentContent.blocks.find(n => n.type === "header-one");
    if (title) data.title = title.text;

    data.content = JSON.stringify(strContent);
    data.updated = new Date();
    data.preview = this.generatePreview(currentContent, data.title);
    if (!title) data.title = data.preview;

    // existing note
    if (this.state.selectedNote) {
      let noteToUpdate = getNote(this.state.selectedNote);
      data._id = noteToUpdate._id;
      allNotes.splice(allNotes.indexOf(noteToUpdate), 1, data);
      this.setState({ allNotes, selectedNote: data._id });
      return;
    }

    // if new note
    console.log(JSON.stringify(data.content));
    allNotes.push(data);
    await saveNote(data);
    this.setState({ allNotes, selectedNote: data._id });
  };

  render() {
    let { editorState, allNotes } = this.state;

    return (
      <div className="app-page">
        <SideBar
          editorState={editorState}
          allNotes={allNotes}
          populateEditor={this.populateEditor}
        />
        <div className="editor-window">
          <EditorMenu editorState={editorState} save={this.save} />
          <DraftEditor onChange={this.onChange} editorState={editorState} />
        </div>
      </div>
    );
  }
}

export default Notes;
