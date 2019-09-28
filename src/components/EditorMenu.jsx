import React, { Component } from "react";
import { Link } from "react-router-dom";
import EditorCollections from "./Collections";
import EditorTags from "./EditorTags";

class EditorMenu extends Component {
  state = {};

  menuStyle = {
    margin: "auto",
    width: "100%",
    height: "100%",
    display: "inline-flex",
    justifyContent: "space-between"
  };

  crudStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: "200px",
    height: "100%",
    fontSize: "12px"
  };

  metaDataStyle = {
    display: "inline-flex",
    alignItems: "center",
    height: "100%",
    fontSize: "12px"
  };

  render() {
    const { save, handleDelete, selectedNote, collections } = this.props;

    return (
      <div style={this.menuStyle}>
        <div id="crud-operations" style={this.crudStyle}>
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
          <div
            className="clickable editor-menu-option"
            onClick={() => save(selectedNote)}
          >
            <i className="fa fa-floppy-o" aria-hidden="true" />
            <span> Save</span>
          </div>
        </div>
        <div id="notes-meta-data" style={this.metaDataStyle}>
          <EditorCollections
            selectedNote={selectedNote}
            collections={collections}
            save={save}
          />
          <EditorTags selectedNote={selectedNote} save={save} />
        </div>
      </div>
    );
  }
}

export default EditorMenu;
