import React, { Component } from "react";
import DraftEditor from "./DraftEditor";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import SideBar from "./SideBar";
import { getNotes } from "../services/notesService";
import { DEMONOTES } from "../services/demoNotesService";
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

  async componentDidMount() {
    const id = this.props.match.params.id || null;

    var NOTES;

    if (this.props.user) {
      try {
        NOTES = await getNotes();
      } catch (err) {
        console.log(err);
      }
    } else {
      NOTES = DEMONOTES;
    }

    if (!id || !NOTES)
      return this.setState({ allNotes: NOTES, collections: COLLECTIONS });

    const note = NOTES.find(n => n._id === id) || null;
    if (note && !note.content.entityMap) {
      note.content.entityMap = Object.create({});
    }
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

  async componentDidUpdate(prevProps) {
    var { allNotes } = this.state;

    // if User logged in, update notes
    if (prevProps.user !== this.props.user) {
      try {
        allNotes = await getNotes();
        if (!allNotes) {
          this.setState({ allNotes: DEMONOTES });
        } else {
          this.setState({ allNotes });
        }
      } catch (err) {
        console.log(err);
      }
    }

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

    const note = await allNotes.find(n => n._id === id);

    if (note && !note.content.entityMap) {
      note.content.entityMap = Object.create({});
    }
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

  updateCollections = (newCollection, action) => {
    let collections = [...this.state.collections];
    let allNotes = [...this.state.allNotes];
    let indexToUpdate = collections.findIndex(c => c._id === newCollection._id);

    if (action === "delete") {
      collections.splice(indexToUpdate, 1);
    } else if (action === "edit") {
      collections.splice(indexToUpdate, 1, newCollection);
    }
    let notesToChange = allNotes
      .filter(n => n.collection._id === newCollection._id)
      .map(n => ({
        _id: n._id,
        title: n.title,
        content: n.content,
        tags: n.tags,
        collection: action === "edit" ? newCollection : {},
        updated: n.updated
      }));

    notesToChange.forEach(newNote => {
      allNotes.splice(
        allNotes.findIndex(oldNote => newNote._id === oldNote._id),
        1,
        newNote
      );
    });

    if (!collections.includes(newCollection) && action === "add")
      collections.push(newCollection);

    return this.setState({ collections, allNotes });
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

    if (
      newNote.collection._id &&
      this.state.collections.filter(c => c._id === newNote.collection._id)
        .length === 0
    ) {
      let collections = this.state.collections;
      collections.push(newNote.collection);
      this.setState({ collections });
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
          updateCollections={this.updateCollections}
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
