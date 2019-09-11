import React from "react";
import NotesPreview from "./NotesPreview";
import NotesSearch from "./NotesSearch";

const SideBar = props => {
  return (
    <div className="app-sidebar">
      <NotesSearch />
      <NotesPreview
        allNotes={props.allNotes}
        populateEditor={props.populateEditor}
        selectedNote={props.selectedNote}
      />
    </div>
  );
};

export default SideBar;
