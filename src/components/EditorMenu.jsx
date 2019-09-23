import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faTags } from "@fortawesome/free-solid-svg-icons";
import { UncontrolledPopover, PopoverBody, PopoverHeader } from "reactstrap";

class EditorMenu extends Component {
  state = {
    tagsPopoverOpen: false,
    collectionPopoverOpen: false
  };

  menuStyle = {
    margin: "0px auto 10px auto",
    width: "100%",
    height: "60px",
    boxShadow: "1px 1px 3px black",
    borderRadius: "5px",
    display: "grid",
    gridTemplateColumns: "50% auto"
  };

  crudStyle = {
    display: "inline-flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: "100%",
    fontSize: "14px"
  };

  metaDataStyle = {
    display: "grid",
    gridTemplateRows: "50% 50%",
    height: "100%",
    width: "100%",
    alignItems: "baseline",
    padding: "10px 30px",
    fontSize: "12px"
  };

  togglePopover = type => {
    if (type === "collection")
      this.setState({
        collectionPopoverOpen: !this.state.collectionPopoverOpen
      });
    if (type === "tags")
      this.setState({ tagsPopoverOpen: !this.state.tagsPopoverOpen });
  };

  handleCollectionSelect = event => {};
  handleTagsSelect = event => {};

  render() {
    const { save, handleDelete, selectedNote, collections } = this.props;

    return (
      <div style={this.menuStyle}>
        <div id="crud-operations" style={this.crudStyle}>
          <Link to="/notes/new">
            <div className="clickable editor-menu-option">
              <i className="fa fa-plus" aria-hidden="true" />
              <span> New Note</span>
            </div>
          </Link>
          <div className="clickable editor-menu-option" onClick={handleDelete}>
            <i className="fa fa-trash" aria-hidden="true" />
            <span> Delete</span>
          </div>
          <div className="clickable editor-menu-option" onClick={save}>
            <i className="fa fa-floppy-o" aria-hidden="true" />
            <span> Save</span>
          </div>
        </div>
        <div id="notes-meta-data" style={this.metaDataStyle}>
          <div style={{ textAlign: "right" }}>
            {selectedNote && (
              <FontAwesomeIcon
                icon={faBook}
                style={{ transform: "rotate(-20deg)" }}
              />
            )}
            <span style={{ marginLeft: "10px" }}>
              {selectedNote && (
                <>
                  <span
                    id="collection-popover-link"
                    className="link-no-underline"
                  >
                    {selectedNote.collection.name}
                  </span>
                  <UncontrolledPopover
                    placement="bottom"
                    isOpen={this.state.collectionPopoverOpen}
                    target="collection-popover-link"
                    trigger="legacy"
                    toggle={() => this.togglePopover("collection")}
                  >
                    <PopoverHeader>select collection:</PopoverHeader>
                    <PopoverBody>
                      {collections.map(c => (
                        <div className="form-check" key={c._id}>
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
                    </PopoverBody>
                  </UncontrolledPopover>
                </>
              )}
            </span>
          </div>
          <div style={{ textAlign: "right" }}>
            {selectedNote && <FontAwesomeIcon icon={faTags} />}
            <span style={{ marginLeft: "10px" }} id="tags-popover-link">
              {selectedNote && (
                <>
                  {selectedNote.tags &&
                    selectedNote.tags.map((tag, index, tags) => (
                      <span
                        key={tag}
                        className="link-no-underline"
                        style={{ color: "orangered" }}
                      >
                        {index < tags.length - 1 ? tag + ", " : tag}
                      </span>
                    ))}
                  <UncontrolledPopover
                    placement="bottom"
                    isOpen={this.state.tagsPopoverOpen}
                    target="tags-popover-link"
                    trigger="legacy"
                    toggle={() => this.togglePopover("tags")}
                  >
                    <PopoverHeader>edit tags:</PopoverHeader>
                    <PopoverBody>
                      {selectedNote.tags.map(t => (
                        <div className="form-check" key={t}>
                          <label className="form-check-label">{t}</label>
                        </div>
                      ))}
                    </PopoverBody>
                  </UncontrolledPopover>
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default EditorMenu;
