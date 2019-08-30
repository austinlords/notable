import React from "react";
import NotesFilter from "./notesFilter";
import NotesPreview from "./notesPreview";
import NotesSearch from "./notesSearch";

const SideBar = props => {
  return (
    <div className="app-sidebar">
      <NotesFilter />
      <NotesSearch />
      <NotesPreview
        allNotes={props.allNotes}
        populateEditor={props.populateEditor}
      />
    </div>
  );
};

export default SideBar;
