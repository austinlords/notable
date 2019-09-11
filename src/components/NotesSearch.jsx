import React from "react";

const NotesSearch = props => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="btn btn-outline-secondary" type="button" disabled>
          Search
        </span>
      </div>
      <input
        type="text"
        className="form-control"
        placeholder=""
        aria-label=""
        aria-describedby="basic-addon1"
      />
    </div>
  );
};

export default NotesSearch;
