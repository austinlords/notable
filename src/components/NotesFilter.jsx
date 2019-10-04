import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCaretRight,
  faCaretDown,
  faUserCircle,
  faBook,
  faTags,
  faEdit,
  faCheckCircle,
  faMinusCircle,
  faFillDrip
} from "@fortawesome/free-solid-svg-icons";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import randomColor from "./../utils/randomColor";

class NotesFilter extends Component {
  state = {
    collectionPopoverOpen: false,
    newCollection: "",
    editMode: false,
    editCollections: []
  };

  onChange = event => {
    this.setState({ newCollection: event.target.value });
  };

  togglePopover = () => {
    this.setState({
      collectionPopoverOpen: !this.state.collectionPopoverOpen
    });
  };

  toggleEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  };

  pressEnter = event => {
    if (event.keyCode !== 13) return;

    if (this.state.newCollection === "") return;

    const collection = {
      _id: Date.now().toString(),
      name: this.state.newCollection,
      color: randomColor()
    };
    this.setState({ newCollection: "" });
    this.props.updateCollections(collection, "add");
  };

  handleCollectionDelete = event => {
    const collectionId = event.currentTarget.getAttribute("data");
    let allCollections = [...this.props.collections];

    let collection = allCollections.filter(c => c._id === collectionId);
    this.props.updateCollections(collection[0], "delete");
  };

  filterStyle = {
    display: "grid",
    gridTemplateRows: "40px 60px 200px 300px",
    overflow: "auto",
    padding: "15px 5px",
    height: "100%",
    width: "100%"
  };

  profileDivStyle = {
    background: "black",
    height: "100%",
    width: "100%",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px"
  };

  profileContentStyle = {
    display: "grid",
    gridTemplateColumns: "20% auto",
    width: "100%",
    cursor: "pointer"
  };

  buttonSectionStyle = {
    height: "100%",
    width: "100%",
    color: "white",
    display: "flex",
    alignItems: "flex-end",
    padding: "0 10px",
    justifyContent: "space-around"
  };

  collectionTagStyle = {
    marginTop: "10px",
    color: "white"
  };

  dropdownTitle = {
    display: "grid",
    gridTemplateColumns: "15px auto",
    width: "100%",
    alignItems: "baseline"
  };

  render() {
    const {
      handleDropdownClick,
      handleRadioSelect,
      handleCheckboxSelect,
      collectionsOpen,
      tagsOpen,
      collectionFilter,
      tagsFilter,
      collections,
      tags
    } = this.props;

    return (
      <div id="filterSection" style={this.filterStyle} className="bg-dark-blue">
        <div id="profile-preview" style={this.profileDivStyle}>
          <div style={this.profileContentStyle}>
            <div style={{ display: "flex", margin: "auto" }}>
              <FontAwesomeIcon icon={faUserCircle} />
            </div>

            <div style={{ fontSize: "11px" }}>lords.austin@gmail.com</div>
          </div>
        </div>
        <div style={this.buttonSectionStyle}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            style={{ height: "25px", fontSize: "11px" }}
            padding="2px"
            id="add-collection"
          >
            <FontAwesomeIcon icon={faPlus} />
            <span> Collection</span>
          </button>
          {this.state.editMode ? (
            <button
              className="btn btn-primary btn-sm"
              style={{ height: "25px", fontSize: "11px" }}
              padding="2px"
              onClick={this.toggleEditMode}
            >
              <FontAwesomeIcon icon={faCheckCircle} />
              <span> Done</span>
            </button>
          ) : (
            <button
              className="btn btn-danger btn-sm"
              style={{ height: "25px", fontSize: "11px" }}
              padding="2px"
              onClick={this.toggleEditMode}
            >
              <FontAwesomeIcon icon={faEdit} />
              <span> Edit</span>
            </button>
          )}
        </div>
        <UncontrolledPopover
          placement="bottom"
          isOpen={this.state.collectionPopoverOpen}
          target="add-collection"
          trigger="legacy"
          toggle={() => this.togglePopover()}
        >
          <PopoverBody>
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
              autoFocus
            />
            <small>
              <em>press Enter to save</em>
            </small>{" "}
          </PopoverBody>
        </UncontrolledPopover>
        <div id="collection-filter" style={this.collectionTagStyle}>
          <div className="list-group clickable">
            <div
              style={this.dropdownTitle}
              onClick={e => handleDropdownClick(e)}
              data-toggle="collapse"
              data-target="#collections"
              aria-expanded={collectionsOpen}
              aria-controls="collections"
            >
              <FontAwesomeIcon
                icon={collectionsOpen ? faCaretDown : faCaretRight}
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
          <div
            className="collapse multi-collapse show"
            id="collections"
            style={{
              marginLeft: "10px",
              fontSize: "14px",
              height: "95%",
              overflow: "auto"
            }}
          >
            {this.state.editMode ? (
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
            {collections.map(c =>
              this.state.editMode ? (
                <div key={c._id} className="edit-group">
                  <div
                    className="edit-group-prepend"
                    data={c._id}
                    onClick={e => this.handleCollectionDelete(e)}
                  >
                    <FontAwesomeIcon
                      icon={faMinusCircle}
                      style={{
                        color: "red",
                        fontSize: "14px",
                        margin: "auto 10px auto 0px"
                      }}
                    />
                  </div>
                  <input
                    type="text"
                    className="edit-form-control"
                    aria-label="Small"
                    value={c.name}
                  />
                  <div className="edit-group-prepend">
                    <FontAwesomeIcon
                      icon={faFillDrip}
                      style={{
                        color: c.color,
                        margin: "auto 0px auto 10px",
                        fontSize: "14px"
                      }}
                    />
                  </div>
                  {
                    <span>
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        style={{
                          color: "#007bff",
                          margin: "auto 0px auto 10px",
                          fontSize: "14px",
                          position: "absolute",
                          left: "115px",
                          top: "5px"
                        }}
                      />
                    </span>
                  }
                </div>
              ) : (
                <div className="form-check" key={c._id}>
                  <label className="form-check-label">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="collection-choices"
                      value={c.name}
                      checked={collectionFilter === c.name}
                      onChange={e => handleRadioSelect(e)}
                    />
                    {c.name}
                  </label>
                </div>
              )
            )}
          </div>
        </div>
        <div id="tags-filter" style={this.collectionTagStyle}>
          <div className="list-group">
            <div
              style={this.dropdownTitle}
              onClick={e => handleDropdownClick(e)}
              data-toggle="collapse"
              data-target="#tags"
              aria-expanded="false"
              aria-controls="tags"
            >
              <FontAwesomeIcon
                icon={tagsOpen ? faCaretDown : faCaretRight}
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
                  {tag}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default NotesFilter;
