import React, { Component } from "react";
import NotesPreview from "./NotesPreview";
import NotesSearch from "./NotesSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCaretRight,
  faCaretDown,
  faUserCircle
} from "@fortawesome/free-solid-svg-icons";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collectionsOpen: true,
      tagsOpen: true,
      collectionFilter: "",
      tagsFilter: []
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
    gridTemplateRows: "40px 60px 300px auto",
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
    justifyContent: "center",
    borderRadius: "10px"
  };

  buttonSectionStyle = {
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

  handleDropdownClick(e) {
    const dataTarget = e.currentTarget.getAttribute("data-target");
    const isExpanded = e.currentTarget.getAttribute("aria-expanded");

    switch (dataTarget) {
      case "#collections":
        if (isExpanded === "false") {
          this.setState({ collectionsOpen: false });
        } else {
          this.setState({ collectionsOpen: true });
        }
        break;
      case "#tags":
        if (isExpanded === "false") {
          this.setState({ tagsOpen: false });
        } else {
          this.setState({ tagsOpen: true });
        }
        break;
      default:
        break;
    }
  }

  handleRadioSelect(event) {
    this.setState({
      collectionFilter: event.target.value,
      tagsFilter: []
    });
  }

  handleCheckboxSelect(event) {
    let selectedTags = this.state.tagsFilter;
    let tag = event.target.value;

    if (selectedTags.includes(tag)) {
      let newTags = selectedTags;
      newTags.splice(selectedTags.indexOf(tag), 1);
      this.setState({
        tagsFilter: newTags
      });
    } else {
      this.setState({
        tagsFilter: [...this.state.tagsFilter, tag]
      });
    }
  }

  filter(notes) {
    let filteredNotes = notes;

    if (this.state.collectionFilter)
      filteredNotes = filteredNotes.filter(
        n => n.collection.name === this.state.collectionFilter
      );

    let tags = [];
    filteredNotes.forEach(n => tags.push(...n.tags));
    tags = [...new Set(tags)];

    if (this.state.tagsFilter.length > 0) {
      let lowerTags = this.state.tagsFilter.map(t => t.toLowerCase());

      filteredNotes = filteredNotes.filter(n => {
        let combinedTags = [...n.tags.map(n => n.toLowerCase()), ...lowerTags];
        let setTags = [...new Set(combinedTags)];
        return setTags.length !== combinedTags.length;
      });
    }

    return { filteredNotes, tags };
  }

  render() {
    let {
      searchQuery,
      allNotes,
      selectedNote,
      onSearch,
      onClear,
      collections
    } = this.props;

    let tags = [];

    if (allNotes) {
      let obj = this.filter(allNotes);
      allNotes = obj.filteredNotes;
      tags = obj.tags;
    }

    return (
      <div style={this.sidebarStyle}>
        <div style={this.filterStyle}>
          <div style={this.profileStyle} className="clickable">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "20% auto",
                width: "100%"
              }}
            >
              <div style={{ display: "flex", margin: "auto" }}>
                <FontAwesomeIcon icon={faUserCircle} />
              </div>

              <div style={{ fontSize: "11px" }}>lords.austin@gmail.com</div>
            </div>
          </div>
          <div style={this.buttonSectionStyle}>
            <button type="button" className="btn btn-secondary btn-sm">
              <FontAwesomeIcon icon={faPlus} />
              <span> Collection</span>
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
                onClick={e => this.handleDropdownClick(e)}
                data-toggle="collapse"
                data-target="#collections"
                aria-expanded={this.state.collectionsOpen}
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
            <div
              className="collapse multi-collapse show"
              id="collections"
              style={{ marginLeft: "10px", fontSize: "14px" }}
            >
              <div key="allCollections" className="form-check">
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="collection-choices"
                    id="allCollectionInput"
                    value=""
                    checked={!this.state.collectionFilter}
                    onChange={e => this.handleRadioSelect(e)}
                  />
                  All
                </label>
              </div>
              {collections.map(c => (
                <div className="form-check" key={c._id}>
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="collection-choices"
                      id={c._id}
                      value={c.name}
                      checked={this.state.collectionFilter === c.name}
                      onChange={e => this.handleRadioSelect(e)}
                    />
                    {c.name}
                  </label>
                </div>
              ))}
            </div>
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
                onClick={e => this.handleDropdownClick(e)}
                data-toggle="collapse"
                data-target="#tags"
                aria-expanded="false"
                aria-controls="tags"
              >
                <div
                  style={{
                    height: "100%",
                    width: "100%"
                  }}
                >
                  <FontAwesomeIcon
                    icon={this.state.tagsOpen ? faCaretDown : faCaretRight}
                    className="faCaretDropdown"
                  />
                </div>
                <span> Tags</span>
              </div>
            </div>
            <div
              className="collapse multi-collapse show"
              id="tags"
              style={{ marginLeft: "10px", fontSize: "14px" }}
            >
              {tags.map(tag => (
                <div className="form-check" key={tag}>
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="tag-choices"
                      id={tag}
                      value={tag}
                      checked={
                        this.state.tagsFilter !== [] &&
                        this.state.tagsFilter.includes(tag)
                      }
                      onChange={e => this.handleCheckboxSelect(e)}
                    />
                    {tag}
                  </label>
                </div>
              ))}
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
