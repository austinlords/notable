import React from "react";
import NotesFilter from "./notesFilter";
import NotesPreview from "./notesPreview";
import NotesSearch from "./notesSearch";

const SideBar = () => {
  return (
    <div className="app-sidebar">
      <NotesFilter />
      <NotesSearch />
      <NotesPreview />
    </div>
  );
};

export default SideBar;
