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
      allNotes: null,
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

  componentDidMount() {
    this.setState({ allNotes: getNotes() });
    this.populateEditor();
  }

  componentDidUpdate() {
    this.populateEditor();
  }

  populateEditor() {
    const id = this.props.match.params.id;

    if (!id) return;

    if (
      id === "new" &&
      this.state.editorState !== EditorState.createEmpty() &&
      this.state.selectedNote !== null
    ) {
      delete window.localStorage.content;
      return this.setState({
        editorState: EditorState.createEmpty(),
        selectedNote: null
      });
    }

    const note = getNote(id);
    if (!note) {
      delete window.localStorage.content;
      return this.props.history.replace("/notes");
    }

    if (note && this.state.selectedNote !== note) {
      const editorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(note.content))
      );
      return this.setState({ editorState, selectedNote: note });
    }
  }

  saveContent = content => {
    window.localStorage.setItem(
      "content",
      JSON.stringify(convertToRaw(content))
    );
  };

  generatePreview(content) {
    let preview = "";
    for (let i = 0; i < content.blocks.length; i++) {
      let c = content.blocks[i];
      if (c.type === "header-one") continue;
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
    const { allNotes, selectedNote, editorState } = this.state;

    const currentEditorContent = convertToRaw(editorState.getCurrentContent());
    console.log("currentEditorContent", currentEditorContent);

    const newNote = {
      title:
        currentEditorContent.blocks.find(n => n.type === "header-one").text ||
        "no title",
      content: JSON.stringify(currentEditorContent),
      preview: this.generatePreview(currentEditorContent),
      tags: selectedNote.tags || [],
      collection: selectedNote.collection || [],
      id: getNote(selectedNote._id)._id || null
    };

    /*  function getContent() 
    const strContent = window.localStorage.content;
    const currentContent = JSON.parse(strContent);
    const title = currentContent.blocks.find(n => n.type === "header-one");
    if (title) newNote.title = title.text;

    newNote.content = JSON.stringify(strContent);
    newNote.updated = new Date();
    newNote.preview = this.generatePreview(currentContent, newNote.title);
    if (!title) newNote.title = newNote.preview; */

    // existing note
    if (selectedNote) {
      allNotes.splice(allNotes.indexOf(selectedNote), 1, newNote);
      this.setState({ allNotes, selectedNote: newNote });
      return;
    }

    // if new note
    allNotes.push(newNote);
    await saveNote(newNote);
    this.setState({ allNotes, selectedNote: newNote });
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
