import React, { Component } from "react";
import NotesPreview from "./NotesPreview";
import NotesSearch from "./NotesSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCaretRight,
  faCaretDown
} from "@fortawesome/free-solid-svg-icons";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collectionsOpen: false,
      tagsOpen: false
    };
  }
  sidebarStyle = {
    display: "grid",
    gridTemplateColumns: "200px auto",
    margin: 0,
    background: "salmon",
    width: "100%",
    height: "100%"
  };

  filterStyle = {
    background: "#112",
    display: "grid",
    gridTemplateRows: "50px 60px auto",
    overflow: "auto",
    padding: "15px 5px",
    height: "100%",
    width: "100%"
  };

  profileStyle = {
    background: "black",
    height: "100%",
    width: "100%",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };

  buttonSectionStyle = {
    background: "black",
    height: "100%",
    width: "100%",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10px"
  };

  collectionTagStyle = {
    marginTop: "15px",
    color: "white",
    cursor: "pointer"
  };

  handleDropdownClick() {
    let faCaretDown = document.querySelector(".fa-caret-down");
    if (faCaretDown) {
      this.setState({ collectionsOpen: false });
    } else {
      this.setState({ collectionsOpen: true });
    }
  }

  render() {
    const {
      searchQuery,
      allNotes,
      selectedNote,
      onSearch,
      onClear
    } = this.props;
    return (
      <div style={this.sidebarStyle}>
        <div style={this.filterStyle}>
          <div style={this.profileStyle}>Profile section</div>
          <div style={this.buttonSectionStyle}>
            <button type="button" className="btn btn-secondary btn-sm">
              <FontAwesomeIcon icon={faPlus} />
              <span> Collection</span>
            </button>
            <button type="button" className="btn btn-info btn-sm">
              <FontAwesomeIcon icon={faPlus} />
              <span> Tag</span>
            </button>
          </div>
          <div style={this.collectionTagStyle}>
            <div className="list-group">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "15px auto",
                  width: "100%",
                  alignItems: "baseline"
                }}
                onClick={() => this.handleDropdownClick()}
                data-toggle="collapse"
                data-target="#collections"
                aria-expanded="false"
                aria-controls="collections"
              >
                <div
                  style={{
                    height: "100%",
                    width: "100%"
                  }}
                >
                  <FontAwesomeIcon
                    icon={
                      this.state.collectionsOpen ? faCaretDown : faCaretRight
                    }
                    className="faCaretDropdown"
                  />
                </div>
                <span> Collections</span>
              </div>
            </div>
            <div className="collapse multi-collapse" id="collections">
              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <input
                      type="radio"
                      aria-label="Radio button for following text input"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Text input with radio button"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="sidebar-preview">
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
      </div>
    );
  }
}

export default SideBar;
