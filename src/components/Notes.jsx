import React, { Component } from "react";
import { toast } from "react-toastify";
import DraftEditor from "./DraftEditor";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import SideBar from "./SideBar";
import {
  getNotes,
  putNote,
  postNote,
  deleteNote
} from "../services/notesService";
import {
  getCollections,
  putCollection,
  postCollection,
  deleteCollection
} from "../services/collectionsService";
import { DEMONOTES } from "../services/demoNotesService";
import { DEMOCOLLECTIONS } from "../services/demoCollectionsService";
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
    var COLLECTIONS;

    if (this.props.user) {
      try {
        NOTES = await getNotes();
        COLLECTIONS = await getCollections();
      } catch (err) {
        console.log(err);
      }
    } else {
      NOTES = DEMONOTES;
      COLLECTIONS = DEMOCOLLECTIONS;
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

    // if User logged out, update state to demo
    if (prevProps.user && this.props.user == null) {
      this.setState({
        allNotes: DEMONOTES,
        collections: DEMOCOLLECTIONS,
        selectedNote: null,
        editorState: EditorState.createEmpty()
      });
      return this.props.history.replace("/notes");
    }

    const id = this.props.match.params.id;

    if (!id || !this.state.allNotes) return;

    if (id === "new") {
      this.setState({
        editorState: EditorState.createEmpty(),
        selectedNote: null
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

  updateCollections = async (newCollection, action) => {
    let collections = [...this.state.collections];
    let allNotes = [...this.state.allNotes];
    let indexToUpdate = collections.findIndex(c => c._id === newCollection._id);

    newCollection.user = this.props.user.email;

    try {
      if (action === "delete") {
        const deletedId = await deleteCollection(newCollection._id);
        if (!deletedId) throw new Error("Error deleting collection. Try again");

        collections.splice(indexToUpdate, 1);
      } else if (action === "edit") {
        newCollection = await putCollection(newCollection);
        if (!newCollection)
          throw new Error("Error updated collection. Try again");

        collections.splice(indexToUpdate, 1, newCollection);
      }
    } catch (error) {
      return toast.error(error.message);
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

    console.log(notesToChange);

    try {
      notesToChange.forEach(async newNote => {
        const updatedNote = await putNote(newNote);
        if (!updatedNote)
          throw new Error("Error updating note: " + newNote.title);

        allNotes.splice(
          allNotes.findIndex(oldNote => updatedNote._id === oldNote._id),
          1,
          updatedNote
        );
      });
    } catch (error) {
      return toast.error(error.message);
    }

    if (!collections.includes(newCollection) && action === "add") {
      try {
        const postedCollection = await postCollection(newCollection);
        if (!postedCollection)
          throw new Error("Error creating new collection. Try again");

        collections.push(postedCollection);
      } catch (error) {
        return toast.error(error.message);
      }
    }

    return this.setState({ collections, allNotes });
  };

  save = async selectedNote => {
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

      // Collection changes as well
      if (
        newNote.collection._id &&
        this.state.collections.filter(c => c._id === newNote.collection._id)
          .length === 0
      ) {
        let collections = this.state.collections;
        newNote.collection.user = this.props.user.email;
        const newCollection = await postCollection(newNote.collection);
        if (!newCollection)
          throw new Error("New collection not saved. Try again.");

        collections.push(newCollection);
        this.setState({ collections });
      }
      // update (PUT) existing note
      if (existingIndex !== -1) {
        const apiPutNote = await putNote(newNote);
        if (!apiPutNote) throw new Error("Error updating note");

        allNotes.splice(existingIndex, 1, apiPutNote);
        this.setState({ allNotes, selectedNote: apiPutNote });
      } else {
        // POST new note
        const apiPostNote = await postNote(newNote);
        if (!apiPostNote) throw new Error("Error saving new note");

        allNotes.push(apiPostNote);
        this.setState({ allNotes, selectedNote: apiPostNote });
        this.props.history.replace(`/notes/${apiPostNote._id}`);
      }
    } catch (error) {
      toast.error(error.message);
      /*
      allNotes.push(newNote);
      this.setState({ allNotes, selectedNote: newNote });
      this.props.history.replace(`/notes/${newNote._id}`);
      */
    }
  };

  handleDelete = async () => {
    let id = this.props.match.params.id;

    try {
      const deleteSuccess = await deleteNote(id);

      if (!deleteSuccess) throw new Error("Could not delete note. Try again.");

      this.setState({
        allNotes: this.state.allNotes.filter(n => n._id !== id),
        editorState: EditorState.createEmpty(),
        selectedNote: null,
        title: ""
      });
      this.props.history.replace("/notes");
    } catch (error) {
      toast.error(error.message);
    }
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

    if (!allNotes || !collections) return <div></div>;

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
