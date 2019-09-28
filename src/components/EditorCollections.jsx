import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { UncontrolledPopover, PopoverBody, PopoverHeader } from "reactstrap";
import randomColor from "./../utils/randomColor";

class EditorCollections extends Component {
  state = {
    collectionPopoverOpen: false,
    newCollection: ""
  };

  onChange = event => {
    this.setState({ newCollection: event.target.value });
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

  pressEnter = event => {
    if (
      event.keyCode !== 13 ||
      this.props.selectedNote.collection === this.state.newTag
    )
      return;

    let note = { ...this.props.selectedNote };
    note.collection = {
      _id: Date.now().toString(),
      name: this.state.newCollection,
      color: randomColor()
    };
    this.setState({ newCollection: "" });
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
                  <label>
                    <small>Or create a new collection!</small>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.newCollection}
                    onChange={e => this.onChange(e)}
                    placeholder="new collection..."
                    style={{
                      fontSize: ".9rem",
                      lineHeight: "1",
                      padding: "0px .75rem",
                      width: "150px",
                      height: "calc(2rem + 2px)"
                    }}
                    onKeyDown={this.pressEnter}
                  />
                  <small>
                    <em>press Enter to save</em>
                  </small>{" "}
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
