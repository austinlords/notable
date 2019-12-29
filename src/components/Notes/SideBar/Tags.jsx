import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faCaretDown,
  faTags
} from "@fortawesome/free-solid-svg-icons";
import truncate from "../../../utils/truncate";
import "../notes.css";

const Tags = ({ tags, tagsFilter, handleCheckboxSelect }) => {
  let [dropdownOpen, setDropdownOpen] = useState(true);

  return (
    <div id="tags-filter" className="collection-tag-style">
      <div className="list-group clickable">
        <div
          className="dropdown-title"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          data-toggle="collapse"
          data-target="#tags"
          aria-expanded={dropdownOpen}
          aria-controls="tags"
        >
          <FontAwesomeIcon
            icon={dropdownOpen ? faCaretDown : faCaretRight}
            className="faCaretDropdown"
          />
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
        style={{
          marginLeft: "10px",
          fontSize: "14px",
          height: "90%",
          overflow: "auto"
        }}
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
              {truncate(tag, 18)}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;
