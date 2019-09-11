import React from "react";

const NotesSearch = ({ searchQuery, onSearch, onClear }) => {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        value={searchQuery}
        onChange={e => onSearch(e.currentTarget.value)}
        placeholder="Search..."
      />
      <div className="input-group-prepend">
        <span
          onClick={() => onClear()}
          className="btn btn-outline-secondary"
          type="button"
        >
          clear
        </span>
      </div>
    </div>
  );
};

export default NotesSearch;
