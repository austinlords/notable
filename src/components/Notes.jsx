import React, { Component } from "react";
import DraftEditor from "./DraftEditor";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import SideBar from "./SideBar";
import { NOTES } from "../services/fakePostsService";
import { COLLECTIONS } from "../services/fakeCollectionsService";
import "../css/notes.css";

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allNotes: null,
      errors: {},
      editorState: EditorState.createEmpty(),
      selectedNote: null,
      searchQuery: "",
      collections: []
    };

    this.onEditorChange = editorState => {
      this.setState({ editorState });
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id || null;

    if (!id || !NOTES)
      return this.setState({ allNotes: NOTES, collections: COLLECTIONS });

    const note = NOTES.find(n => n._id === id) || null;
    const editorState = note
      ? EditorState.createWithContent(convertFromRaw(note.content))
      : EditorState.createEmpty();

    this.setState({
      allNotes: NOTES,
      collections: COLLECTIONS,
      selectedNote: note,
      editorState
    });
  }

  componentDidUpdate() {
    const id = this.props.match.params.id;

    if (!id || !this.state.allNotes) return;

    if (id === "new") {
      this.setState({
        editorState: EditorState.createEmpty(),
        selectedNote: null,
        title: ""
      });
      return this.props.history.replace("/notes");
    }

    const note = this.state.allNotes.find(n => n._id === id);
    if (!note) return this.props.history.replace("/notes");
    const editorState = EditorState.createWithContent(
      convertFromRaw(note.content)
    );

    if (this.state.selectedNote && id !== this.state.selectedNote._id)
      return this.setState({ selectedNote: note, editorState });

    if (!this.state.selectedNote)
      return this.setState({ selectedNote: note, editorState });
  }

  handleSearch = query => {
    this.setState({ searchQuery: query });
  };

  handleClear = () => {
    this.setState({ searchQuery: "" });
  };

  updateSelectedNote = note => {
    this.setState({ selectedNote: note });
  };

  save = selectedNote => {
    const { allNotes, editorState } = this.state;
    const currentEditorContent = convertToRaw(editorState.getCurrentContent());

    const newNote = {
      _id: (selectedNote && selectedNote._id) || Date.now().toString(),
      title: (selectedNote && selectedNote.title) || "",
      content: currentEditorContent,
      tags: (selectedNote && selectedNote.tags) || [],
      collection: (selectedNote && selectedNote.collection) || {}
    };

    try {
      const existingIndex = allNotes.findIndex(n => n._id === selectedNote._id);
      if (existingIndex !== -1) {
        allNotes.splice(existingIndex, 1, newNote);
        this.setState({ allNotes, selectedNote: newNote });
      } else {
        allNotes.push(newNote);
        this.setState({ allNotes, selectedNote: newNote });
        this.props.history.replace(`/notes/${newNote._id}`);
      }
    } catch {
      allNotes.push(newNote);
      this.setState({ allNotes, selectedNote: newNote });
      this.props.history.replace(`/notes/${newNote._id}`);
    }
  };

  handleDelete = () => {
    let id = this.props.match.params.id;

    this.setState({
      allNotes: this.state.allNotes.filter(n => n._id !== id),
      editorState: EditorState.createEmpty(),
      selectedNote: null,
      title: ""
    });
    this.props.history.replace("/notes");
  };

  render() {
    let {
      editorState,
      allNotes,
      searchQuery,
      collections,
      selectedNote,
      title
    } = this.state;

    return (
      <div className="app-page">
        <SideBar
          editorState={editorState}
          allNotes={allNotes}
          onSearch={this.handleSearch}
          searchQuery={searchQuery}
          onClear={this.handleClear}
          collections={collections}
          selectedNote={selectedNote}
        />
        <DraftEditor
          onEditorChange={this.onEditorChange}
          handleTitle={this.handleTitle}
          title={title}
          save={this.save}
          handleDelete={this.handleDelete}
          updateSelectedNote={this.updateSelectedNote}
          collections={collections}
          editorState={editorState}
          selectedNote={selectedNote}
        />
      </div>
    );
  }
}

export default Notes;
