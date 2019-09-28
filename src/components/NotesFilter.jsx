import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCaretRight,
  faCaretDown,
  faUserCircle,
  faBook,
  faTags
} from "@fortawesome/free-solid-svg-icons";

const NotesFilter = ({
  handleDropdownClick,
  handleRadioSelect,
  handleCheckboxSelect,
  collectionsOpen,
  tagsOpen,
  collectionFilter,
  tagsFilter,
  collections,
  tags
}) => {
  const filterStyle = {
    background: "#112",
    display: "grid",
    gridTemplateRows: "40px 60px 300px auto",
    overflow: "auto",
    padding: "15px 5px",
    height: "100%",
    width: "100%"
  };

  const profileDivStyle = {
    background: "black",
    height: "100%",
    width: "100%",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px"
  };

  const profileContentStyle = {
    display: "grid",
    gridTemplateColumns: "20% auto",
    width: "100%",
    cursor: "pointer"
  };

  const buttonSectionStyle = {
    height: "100%",
    width: "100%",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10px"
  };

  const collectionTagStyle = {
    marginTop: "15px",
    color: "white",
    cursor: "pointer"
  };

  const dropdownTitle = {
    display: "grid",
    gridTemplateColumns: "15px auto",
    width: "100%",
    alignItems: "baseline"
  };

  return (
    <div id="filterSection" style={filterStyle}>
      <div id="profile-preview" style={profileDivStyle}>
        <div style={profileContentStyle}>
          <div style={{ display: "flex", margin: "auto" }}>
            <FontAwesomeIcon icon={faUserCircle} />
          </div>

          <div style={{ fontSize: "11px" }}>lords.austin@gmail.com</div>
        </div>
      </div>
      <div id="add-collection" style={buttonSectionStyle}>
        <button type="button" className="btn btn-secondary btn-sm">
          <FontAwesomeIcon icon={faPlus} />
          <span> Collection</span>
        </button>
      </div>
      <div
        id="collection-filter"
        style={collectionTagStyle}
        key={collections.length}
      >
        <div className="list-group clickable">
          <div
            style={dropdownTitle}
            onClick={e => handleDropdownClick(e)}
            data-toggle="collapse"
            data-target="#collections"
            aria-expanded={collectionsOpen}
            aria-controls="collections"
          >
            <div
              style={{
                height: "100%",
                width: "100%"
              }}
            >
              <FontAwesomeIcon
                icon={collectionsOpen ? faCaretDown : faCaretRight}
                className="faCaretDropdown"
              />
            </div>
            <div>
              <span>Collections </span>
              <span style={{ paddingLeft: "10px" }}>
                {" "}
                <FontAwesomeIcon
                  icon={faBook}
                  style={{ fontSize: "14px", transform: "rotate(-20deg)" }}
                />
              </span>
            </div>
          </div>
        </div>
        <div
          className="collapse multi-collapse show"
          id="collections"
          style={{ marginLeft: "10px", fontSize: "14px" }}
        >
          <div key="allCollections" className="form-check clickable">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                name="collection-choices"
                id="allCollectionInput"
                value=""
                checked={!collectionFilter}
                onChange={e => handleRadioSelect(e)}
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
                  checked={collectionFilter === c.name}
                  onChange={e => handleRadioSelect(e)}
                />
                {c.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div id="tags-filter" style={collectionTagStyle}>
        <div className="list-group">
          <div
            style={dropdownTitle}
            onClick={e => handleDropdownClick(e)}
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
                icon={tagsOpen ? faCaretDown : faCaretRight}
                className="faCaretDropdown"
              />
            </div>
            <div>
              <span>Tags </span>
              <span style={{ paddingLeft: "10px" }}>
                {" "}
                <FontAwesomeIcon icon={faTags} style={{ fontSize: "12px" }} />
              </span>
            </div>
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
                  checked={tagsFilter !== [] && tagsFilter.includes(tag)}
                  onChange={e => handleCheckboxSelect(e)}
                />
                {tag}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesFilter;
