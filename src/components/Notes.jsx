import React, { Component } from "react";
import EditorMenu from "./EditorMenu";
import DraftEditor from "./DraftEditor";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import SideBar from "./SideBar";
import { notes, getNote } from "../services/fakePostsService";
// import { saveNote } from "../services/notesService";
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
      this.setState({ editorState });
    };
  }

  componentDidMount() {
    this.setState({ allNotes: notes });
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
      return this.setState({
        editorState: EditorState.createEmpty(),
        selectedNote: null
      });
    }

    const note = getNote(id);

    if (!note) return this.props.history.replace("/notes");

    if (note && this.state.selectedNote !== note) {
      const editorState = EditorState.createWithContent(
        convertFromRaw(note.content)
      );

      return this.setState({ editorState, selectedNote: note });
    }
  }

  save = async () => {
    const { allNotes, selectedNote, editorState } = this.state;
    const currentEditorContent = convertToRaw(editorState.getCurrentContent());

    function generateTitle() {
      let h1 = currentEditorContent.blocks.find(n => n.type === "header-one");
      return h1 ? h1.text : "(no title)";
    }

    function generatePreview(content) {
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

    const newNote = {
      _id: Date.now().toString(),
      title: generateTitle(),
      content: currentEditorContent,
      preview: generatePreview(currentEditorContent),
      tags: (selectedNote && selectedNote.tags) || [],
      collection: (selectedNote && selectedNote.collection) || []
    };

    // existing note
    if (selectedNote) {
      newNote._id = selectedNote._id;
      allNotes.splice(allNotes.indexOf(selectedNote), 1, newNote);
      return this.setState({ allNotes, selectedNote: newNote });
    }

    // if new note
    allNotes.push(newNote);
    // await saveNote(newNote);
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
