import React, { useState, useContext } from "react";
import EditCollections from "./EditCollections";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCaretDown,
  faCaretRight
} from "@fortawesome/free-solid-svg-icons";
import NotesContext from "../../../context/NotesContext";
import truncate from "../../../utils/truncate";
import "../notes.css";

const Collections = ({
  editMode,
  handleRadioSelect,
  handleCollectionEdit,
  handleCollectionDelete,
  collectionFilter,
  collectionsToEdit
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(true);

  const _NOTES = useContext(NotesContext);

  return (
    <div id="collection-filter" className="collection-tag-style">
      <div className="list-group clickable">
        <div
          className="dropdown-title"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          data-toggle="collapse"
          data-target="#collections"
          aria-expanded={dropdownOpen}
          aria-controls="collections"
        >
          <FontAwesomeIcon
            icon={dropdownOpen ? faCaretDown : faCaretRight}
            className="faCaretDropdown"
          />
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
      <div className="collapse multi-collapse show" id="collections">
        {editMode ? (
          <div></div>
        ) : (
          <div key="allCollections" className="form-check clickable">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                name="collection-choices"
                value=""
                checked={collectionFilter === ""}
                onChange={e => handleRadioSelect(e)}
              />
              All
            </label>
          </div>
        )}
        {editMode ? (
          <EditCollections
            collectionsToEdit={collectionsToEdit}
            handleCollectionEdit={handleCollectionEdit}
            handleCollectionDelete={handleCollectionDelete}
          />
        ) : (
          _NOTES.collections.map(c => (
            <div className="form-check" key={c._id} style={{}}>
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="radio"
                  name="collection-choices"
                  value={c.name}
                  checked={collectionFilter === c.name}
                  onChange={e => handleRadioSelect(e)}
                />
                <div
                  style={{
                    textShadow: `1px 0px #000, 0px 1px #000, -1px 0px #000, 0px -1px #000, 0px 0px 5px ${c.color}, 0px 0px 3px #FFF`,
                    color: c.color,
                    fontWeight: 600,
                    fontSize: "15px"
                  }}
                >
                  {truncate(c.name, 18)}
                </div>
              </label>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Collections;
