import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { UncontrolledPopover, PopoverBody, PopoverHeader } from "reactstrap";

class EditorCollections extends Component {
  state = {
    collectionPopoverOpen: false
  };

  togglePopover = () => {
    this.setState({
      collectionPopoverOpen: !this.state.collectionPopoverOpen
    });
  };

  handleCollectionSelect = event => {
    let name = event.target.value;
    let { color, _id } = this.props.collections.find(c => c.name === name);
    const note = { ...this.props.selectedNote };
    note.collection = { _id, name, color };
    this.props.save(note);
  };

  render() {
    const { selectedNote, collections } = this.props;

    return (
      <div
        style={{ textAlign: "right", padding: "0px 10px" }}
        id="collection-popover-link"
        className="link-no-underline"
      >
        <FontAwesomeIcon
          icon={faBook}
          style={{ transform: "rotate(-20deg)", color: "black" }}
        />
        <span style={{ marginLeft: "10px" }}>
          {selectedNote && (
            <>
              <span>{selectedNote.collection.name}</span>
              <UncontrolledPopover
                placement="bottom"
                isOpen={this.state.collectionPopoverOpen}
                target="collection-popover-link"
                trigger="legacy"
                toggle={() => this.togglePopover()}
              >
                <PopoverHeader>select collection:</PopoverHeader>
                <PopoverBody key={selectedNote.collection.name}>
                  {collections.map(c => (
                    <div className="form-check clickable" key={c._id}>
                      <label className="form-check-label">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="collection-choices"
                          id={c._id}
                          value={c.name}
                          checked={selectedNote.collection.name === c.name}
                          onChange={e => this.handleCollectionSelect(e)}
                        />
                        {c.name}
                      </label>
                    </div>
                  ))}
                  <small>(note will save on selection)</small>
                </PopoverBody>
              </UncontrolledPopover>
            </>
          )}
        </span>
      </div>
    );
  }
}

export default EditorCollections;
