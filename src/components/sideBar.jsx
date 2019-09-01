import React from "react";
import NotesFilter from "./NotesFilter";
import NotesPreview from "./NotesPreview";
import NotesSearch from "./NotesSearch";

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
