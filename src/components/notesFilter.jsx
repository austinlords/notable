import React from "react";

const NotesFilter = props => {
  return (
    <div
      className="btn-group py-2"
      role="group"
      aria-label="Button group with nested dropdown"
    >
      <div className="btn-group" role="group">
        <button
          id="btnGroupDrop1"
          type="button"
          className="btn btn-primary dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Collections
        </button>
        <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
          <a className="dropdown-item" href="#">
            Dropdown link
          </a>
          <a className="dropdown-item" href="#">
            Dropdown link
          </a>
        </div>
      </div>
      <div className="btn-group" role="group">
        <button
          id="btnGroupDrop1"
          type="button"
          className="btn btn-primary dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Topics
        </button>
        <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
          <a className="dropdown-item" href="#">
            Dropdown link
          </a>
          <a className="dropdown-item" href="#">
            Dropdown link
          </a>
        </div>
      </div>
      <button type="button" class="btn btn-primary">
        All
      </button>
    </div>
  );
};

export default NotesFilter;
