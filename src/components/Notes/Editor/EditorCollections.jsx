import React, { Component } from "react";
import { convertToRaw } from "draft-js";
import { UncontrolledPopover, PopoverBody, PopoverHeader } from "reactstrap";
import CollectionPreview from "../../common/CollectionPreview";
import randomColor from "../../../utils/randomColor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";

class EditorCollections extends Component {
  state = {
    collectionPopoverOpen: false,
    newCollection: ""
  };

  onChange = event => {
    this.setState({ newCollection: event.target.value.toLowerCase() });
  };

  togglePopover = () => {
    this.setState({
      collectionPopoverOpen: !this.state.collectionPopoverOpen
    });
  };

  handleCollectionSelect = event => {
    const note = { ...this.props.selectedNote };

    if (event.currentTarget.getAttribute("data") === "delete") {
      note.collection = {};
      this.props.save(note);
    } else {
      let { color, _id, name } = this.props.collections.find(
        c => c._id === event.target.value
      );
      note.collection = { _id, name, color };
      this.props.save(note);
    }
  };

  pressEnter = event => {
    if (event.keyCode !== 13) return;

    let note = this.props.selectedNote
      ? { ...this.props.selectedNote }
      : {
          _id: Date.now().toString(),
          title: "",
          content: convertToRaw(this.props.editorState.getCurrentContent()),
          tags: [],
          collection: {}
        };
    // don't allow duplicate collections
    const newCollection = this.state.newCollection.toLowerCase().trim();

    const collectionAlreadyExists = !!this.props.collections.filter(
      c => c.name === newCollection
    ).length;
    if (collectionAlreadyExists) return;

    note.collection = {
      _id: Date.now().toString(),
      name: newCollection,
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
        <CollectionPreview
          fontSize="12px"
          collection={selectedNote ? selectedNote.collection : {}}
        />
        <UncontrolledPopover
          placement="bottom"
          isOpen={this.state.collectionPopoverOpen}
          target="collection-popover-link"
          trigger="legacy"
          toggle={() => this.togglePopover()}
        >
          <PopoverHeader>select collection:</PopoverHeader>
          <PopoverBody key={selectedNote ? selectedNote.collection.name : ""}>
            {collections ? (
              collections.map(c => (
                <div className="form-check clickable" key={c._id}>
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="select-collection-choices"
                      value={c._id}
                      checked={
                        selectedNote
                          ? selectedNote.collection.name === c.name
                          : false
                      }
                      onChange={e => this.handleCollectionSelect(e)}
                    />
                    {c.name}
                  </label>
                </div>
              ))
            ) : (
              <div></div>
            )}
            {collections.length > 0 &&
            selectedNote &&
            selectedNote.collection.hasOwnProperty("_id") ? (
              <div
                className="clickable"
                style={{ color: "red" }}
                onClick={e => this.handleCollectionSelect(e)}
                data="delete"
              >
                <FontAwesomeIcon icon={faMinusCircle} />{" "}
                <span>
                  <em>clear collection</em>
                </span>
              </div>
            ) : (
              <div></div>
            )}
            <input
              type="text"
              className="form-control"
              value={this.state.newCollection}
              onChange={e => this.onChange(e)}
              placeholder="new collection..."
              style={{
                fontSize: ".9rem",
                marginTop: "10px",
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
      </div>
    );
  }
}

export default EditorCollections;
