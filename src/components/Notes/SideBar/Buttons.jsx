import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import randomColor from "../../../utils/randomColor";
import styles from "./buttons.module.css";
import NotesContext from "../../../context/NotesContext";

const Buttons = ({ toggleEditMode, editMode }) => {
  const [popoverOpen, togglePopover] = useState(false);
  const [newCollection, setNewCollection] = useState("");

  const _NOTES = useContext(NotesContext);

  let pressEnter = event => {
    if (event.keyCode !== 13) return;

    if (newCollection === "") return;

    const collection = {
      _id: Date.now().toString(),
      name: newCollection.trim(),
      color: randomColor()
    };
    setNewCollection("");
    _NOTES.updateCollections(collection, "add");
  };

  const editBtnSettings = {
    text: editMode ? "Done" : "Edit",
    icon: editMode ? faCheckCircle : faEdit,
    color: editMode ? "btn-primary" : "btn-danger"
  };

  return (
    <div>
      <div className={styles.buttonsDiv}>
        <button
          className={`btn btn-secondary btn-sm ${styles.indButtons}`}
          id="add-collection"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span> Collection</span>
        </button>
        <button
          className={`btn btn-sm ${styles.indButtons} ${editBtnSettings.color}`}
          onClick={() => toggleEditMode()}
        >
          <FontAwesomeIcon icon={editBtnSettings.icon} />
          <span>{` ${editBtnSettings.text}`}</span>
        </button>
      </div>
      <UncontrolledPopover
        placement="bottom"
        isOpen={popoverOpen}
        target="add-collection"
        trigger="legacy"
        toggle={() => togglePopover(!popoverOpen)}
      >
        <PopoverBody>
          <input
            type="text"
            className="form-control"
            id={styles.popoverInput}
            value={newCollection}
            onChange={e => setNewCollection(e.target.value.toLowerCase())}
            placeholder="new collection..."
            onKeyDown={pressEnter}
            autoFocus
          />
          <small>
            <em>press Enter to save</em>
          </small>{" "}
        </PopoverBody>
      </UncontrolledPopover>
    </div>
  );
};

export default Buttons;
