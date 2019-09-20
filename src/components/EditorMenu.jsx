import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faTags } from "@fortawesome/free-solid-svg-icons";

const EditorMenu = ({ save, handleDelete, selectedNote }) => {
  const menuStyle = {
    margin: "0px auto 10px auto",
    width: "100%",
    height: "60px",
    boxShadow: "1px 1px 3px black",
    borderRadius: "5px",
    display: "grid",
    gridTemplateColumns: "50% auto"
  };

  const crudStyle = {
    display: "inline-flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: "100%",
    fontSize: "14px"
  };

  const metaDataStyle = {
    display: "grid",
    gridTemplateRows: "50% 50%",
    height: "100%",
    width: "100%",
    alignItems: "baseline",
    padding: "10px",
    fontSize: "12px"
  };

  return (
    <div style={menuStyle}>
      <div id="crud-operations" style={crudStyle}>
        <Link to="/notes/new">
          <div className="clickable editor-menu-option">
            <i className="fa fa-plus" aria-hidden="true" />
            <span> New Note</span>
          </div>
        </Link>
        <div className="clickable editor-menu-option" onClick={handleDelete}>
          <i className="fa fa-trash" aria-hidden="true" />
          <span> Delete</span>
        </div>
        <div className="clickable editor-menu-option" onClick={save}>
          <i className="fa fa-floppy-o" aria-hidden="true" />
          <span> Save</span>
        </div>
      </div>
      <div id="notes-meta-data" style={metaDataStyle}>
        <div style={{ textAlign: "right" }}>
          {selectedNote && (
            <FontAwesomeIcon
              icon={faBook}
              style={{ transform: "rotate(-20deg)" }}
            />
          )}
          <span style={{ marginLeft: "10px" }}>
            {selectedNote && selectedNote.collection.name}
          </span>
        </div>
        <div style={{ textAlign: "right" }}>
          {selectedNote && <FontAwesomeIcon icon={faTags} />}
          <span style={{ marginLeft: "10px" }}>
            {selectedNote && selectedNote.tags.join(", ")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EditorMenu;
