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
      tagsOpen: false,
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

  handleRadioSelect(event) {
    this.setState({
      collectionFilter: event.target.value
    });
  }

  handleCheckboxSelect(event) {
    let selectedTags = this.state.tagsFilter;
    let tag = event.target.value;
    console.log("current selected tags: ", selectedTags);
    console.log("clicked on tag: ", tag);

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

  render() {
    console.log("rendering...this.state.tagsFilter: ", this.state.tagsFilter);

    let {
      searchQuery,
      allNotes,
      selectedNote,
      onSearch,
      onClear,
      collections
    } = this.props;

    if (this.state.collectionFilter)
      allNotes =
        allNotes &&
        allNotes.filter(n => n.collection.name === this.state.collectionFilter);

    let tags = [];
    allNotes && allNotes.forEach(n => tags.push(...n.tags));
    tags = [...new Set(tags)];

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
            <div
              className="collapse multi-collapse"
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
                <span> Tags</span>
              </div>
            </div>
            <div
              className="collapse multi-collapse"
              id="collections"
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
