import React from "react";

const NotesSearch = ({ searchQuery, onSearch }) => {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        value={searchQuery}
        onChange={e => onSearch(e.currentTarget.value)}
        placeholder="Search..."
      />
    </div>
  );
};

export default NotesSearch;
