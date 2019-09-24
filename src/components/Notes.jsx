import React, { Component } from "react";
import DraftEditor from "./DraftEditor";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import SideBar from "./SideBar";
import { notes } from "../services/fakePostsService";
import { Collections } from "../services/fakeCollectionsService";
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
      collections: [],
      title: ""
    };

    this.onChange = editorState => {
      this.setState({ editorState });
    };

    this.handleTitle = this.handleTitle.bind(this);
  }

  componentDidMount() {
    this.setState({ allNotes: notes, collections: Collections });
    this.populateEditor();
  }

  componentDidUpdate() {
    this.populateEditor();
  }

  handleSearch = query => {
    this.setState({ searchQuery: query });
  };

  handleClear = () => {
    this.setState({ searchQuery: "" });
  };

  handleTitle = title => {
    this.setState({ title });
  };

  populateEditor() {
    const id = this.props.match.params.id;

    if (!id) return;
    if (!this.state.allNotes) return;

    if (
      id === "new" &&
      this.state.editorState !== EditorState.createEmpty() &&
      this.state.selectedNote !== null
    ) {
      return this.setState({
        editorState: EditorState.createEmpty(),
        selectedNote: null,
        title: ""
      });
    }

    const note = this.state.allNotes.find(n => n._id === id);

    if (!note) return this.props.history.replace("/notes");

    if (note && this.state.selectedNote !== note) {
      const editorState = EditorState.createWithContent(
        convertFromRaw(note.content)
      );

      return this.setState({
        editorState,
        selectedNote: note,
        title: note.title
      });
    }
  }

  save = () => {
    const { allNotes, selectedNote, editorState, title } = this.state;
    const currentEditorContent = convertToRaw(editorState.getCurrentContent());

    const newNote = {
      _id: Date.now().toString(),
      title: title,
      content: currentEditorContent,
      tags: (selectedNote && selectedNote.tags) || [],
      collection: (selectedNote && selectedNote.collection) || []
    };

    if (selectedNote) {
      newNote._id = selectedNote._id;
      allNotes.splice(allNotes.indexOf(selectedNote), 1, newNote);
      this.setState({ allNotes, selectedNote: newNote });
    } else {
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
          onChange={this.onChange}
          handleTitle={this.handleTitle}
          title={title}
          save={this.save}
          handleDelete={this.handleDelete}
          collections={collections}
          editorState={editorState}
          selectedNote={selectedNote}
        />
      </div>
    );
  }
}

export default Notes;
