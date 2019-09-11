import React from "react";
import NotesPreview from "./NotesPreview";
import NotesSearch from "./NotesSearch";

const SideBar = ({
  searchQuery,
  allNotes,
  selectedNote,
  onSearch,
  onClear
}) => {
  return (
    <div className="app-sidebar">
      <NotesSearch
        onSearch={onSearch}
        searchQuery={searchQuery}
        onClear={onClear}
      />
      <NotesPreview
        allNotes={allNotes}
        selectedNote={selectedNote}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default SideBar;
