import React, { Component, useState } from "react";
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
import { Popover, OverlayTrigger } from "react-bootstrap";
import AppContext from "../context/AppContext";
import randomColor from "./../utils/randomColor";
import truncate from "./../utils/truncate";

class NotesFilter extends Component {
  state = {
    editMode: false,
    collectionsToEdit: []
  };

  toggleEditMode = () => {
    const currentCollections = [...this.props.collections];
    if (!this.state.editMode) {
      this.setState({ editMode: true, collectionsToEdit: currentCollections });
    } else {
      let collectionsToUpdate = this.state.collectionsToEdit.filter(
        (c, index) => {
          return (
            c.name !== currentCollections[index].name ||
            c.color !== currentCollections[index].color
          );
        }
      );
      collectionsToUpdate.forEach(
        async c => await this.props.updateCollections(c, "edit")
      );
      this.setState({ editMode: !this.state.editMode });
    }
  };

  handleCollectionDelete = event => {
    const collectionId = event.currentTarget.getAttribute("data");
    let allCollections = [...this.props.collections];

    let collection = allCollections.filter(c => c._id === collectionId);
    this.props.updateCollections(collection[0], "delete");
  };

  handleCollectionEdit = (type, collection, index, value) => {
    const collectionsToEdit = [...this.state.collectionsToEdit];
    const collectionToUpdate = { ...collection };

    if (type === "name") collectionToUpdate.name = value;

    if (type === "color") collectionToUpdate.color = value;

    collectionsToEdit.splice(index, 1, collectionToUpdate);

    this.setState({ collectionsToEdit });
  };

  handleColorChange = (color, event) => {
    this.setState({ colorChange: color.hex });
  };

  filterStyle = {
    display: "grid",
    gridTemplateRows: "40px 60px 200px 300px",
    overflow: "auto",
    padding: "15px 5px",
    height: "100%",
    width: "100%"
  };

  render() {
    const {
      handleRadioSelect,
      handleCheckboxSelect,
      collectionFilter,
      tagsFilter,
      collections,
      tags
    } = this.props;

    return (
      <div id="filterSection" style={this.filterStyle} className="bg-dark-blue">
        <Profile />
        <Buttons
          updateCollections={this.props.updateCollections}
          editMode={this.state.editMode}
          toggleEditMode={this.toggleEditMode}
        />
        <CollectionFilter
          toggleEditMode={this.toggleEditMode}
          editMode={this.state.editMode}
          handleRadioSelect={handleRadioSelect}
          handleCollectionEdit={this.handleCollectionEdit}
          handleCollectionDelete={this.handleCollectionDelete}
          collections={collections}
          collectionFilter={collectionFilter}
          collectionsToEdit={this.state.collectionsToEdit}
        />
        <TagFilter
          tags={tags}
          tagsFilter={tagsFilter}
          handleCheckboxSelect={handleCheckboxSelect}
        />
      </div>
    );
  }
}

const Profile = () => {
  let profileDivStyle = {
    background: "black",
    height: "100%",
    width: "100%",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px"
  };

  let profileContentStyle = {
    display: "grid",
    gridTemplateColumns: "20% auto",
    width: "100%",
    cursor: "pointer"
  };

  return (
    <AppContext.Consumer>
      {value => (
        <div id="profile-preview" style={profileDivStyle}>
          <div style={profileContentStyle}>
            <div style={{ display: "flex", margin: "auto" }}>
              <FontAwesomeIcon icon={faUserCircle} />
            </div>
            <div style={{ fontSize: "11px" }}>
              {(value.user && value.user.email) || "DEMO MODE"}
            </div>
          </div>
        </div>
      )}
    </AppContext.Consumer>
  );
};

const Buttons = ({ updateCollections, toggleEditMode, editMode }) => {
  let [popoverOpen, togglePopover] = useState(false);
  let [newCollection, setNewCollection] = useState("");

  let pressEnter = event => {
    if (event.keyCode !== 13) return;

    if (newCollection === "") return;

    const collection = {
      _id: Date.now().toString(),
      name: newCollection.trim(),
      color: randomColor()
    };
    setNewCollection("");
    updateCollections(collection, "add");
  };

  let style = {
    height: "100%",
    width: "100%",
    color: "white",
    display: "flex",
    alignItems: "flex-end",
    padding: "0 10px",
    justifyContent: "space-around"
  };

  let buttonStyle = {
    height: "25px",
    fontSize: "11px",
    padding: "2px 5px"
  };

  return (
    <div>
      <div style={style}>
        <button
          className="btn btn-secondary btn-sm"
          style={buttonStyle}
          id="add-collection"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span> Collection</span>
        </button>
        {editMode ? (
          <button
            className="btn btn-primary btn-sm"
            style={buttonStyle}
            onClick={() => toggleEditMode()}
          >
            <FontAwesomeIcon icon={faCheckCircle} />
            <span> Done</span>
          </button>
        ) : (
          <button
            className="btn btn-danger btn-sm"
            style={buttonStyle}
            onClick={() => toggleEditMode()}
          >
            <FontAwesomeIcon icon={faEdit} />
            <span> Edit</span>
          </button>
        )}
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
            value={newCollection}
            onChange={e => setNewCollection(e.target.value.toLowerCase())}
            placeholder="new collection..."
            style={{
              fontSize: ".9rem",
              marginTop: "10px",
              lineHeight: "1",
              padding: "0px .75rem",
              width: "150px",
              height: "calc(2rem + 2px)"
            }}
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

let collectionTagStyle = {
  marginTop: "10px",
  color: "white"
};

let dropdownTitle = {
  display: "grid",
  gridTemplateColumns: "15px auto",
  width: "100%",
  alignItems: "baseline"
};

const CollectionFilter = ({
  editMode,
  handleRadioSelect,
  handleCollectionEdit,
  handleCollectionDelete,
  collections,
  collectionFilter,
  collectionsToEdit
}) => {
  let [dropdownOpen, setDropdownOpen] = useState(true);

  return (
    <div id="collection-filter" style={collectionTagStyle}>
      <div className="list-group clickable">
        <div
          style={dropdownTitle}
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
      <div
        className="collapse multi-collapse show"
        id="collections"
        style={{
          marginLeft: "10px",
          fontSize: "14px",
          height: "85%",
          overflow: "auto"
        }}
      >
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
          collections.map(c => (
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

const TagFilter = ({ tags, tagsFilter, handleCheckboxSelect }) => {
  let [dropdownOpen, setDropdownOpen] = useState(true);

  return (
    <div id="tags-filter" style={collectionTagStyle}>
      <div className="list-group clickable">
        <div
          style={dropdownTitle}
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

const EditCollections = ({
  collectionsToEdit,
  handleCollectionEdit,
  handleCollectionDelete
}) => {
  return (
    <div>
      {collectionsToEdit.map((c, i) => (
        <div key={c._id} className="edit-group">
          <div
            className="edit-group-prepend"
            data={c._id}
            onClick={e => handleCollectionDelete(e)}
          >
            <FontAwesomeIcon
              icon={faMinusCircle}
              style={{
                color: "red",
                fontSize: "14px",
                margin: "auto 10px auto 0px"
              }}
              className="clickable"
            />
          </div>
          <input
            type="text"
            className="edit-form-control"
            aria-label="Small"
            value={c.name}
            onChange={e => handleCollectionEdit("name", c, i, e.target.value)}
          />
          <EditColor
            color={c.color}
            collection={c}
            handleCollectionEdit={handleCollectionEdit}
            index={i}
          />
        </div>
      ))}
    </div>
  );
};

const EditColor = ({ color, collection, handleCollectionEdit, index }) => {
  const [colors, setColors] = useState([
    "#BCAAA4",
    "#EF9A9A",
    "#C5E1A5",
    "#FFCC80",
    "#CE93D8",
    "#4FC3F7"
  ]);
  const [newColor, setNewColor] = useState("");

  const componentStyle = {
    width: "180px",
    height: "70px",
    display: "grid",
    gridTemplateRows: "30px 40px",
    gridTemplateColumns: "auto"
  };

  const divStyle = {
    width: "180px",
    height: "30px",
    display: "grid",
    gridTemplateColumns: "repeat(6, 30px)"
  };

  const swatchStyle = {
    width: "100%",
    height: "100%",
    padding: "2px"
  };

  return (
    <OverlayTrigger
      trigger="click"
      placement="top"
      rootClose
      overlay={
        <div>
          <Popover id={collection._id} style={{ border: `3px solid ${color}` }}>
            <Popover.Title>
              selected: <em>{color}</em>
            </Popover.Title>
            <Popover.Content>
              <div style={componentStyle}>
                <div style={divStyle}>
                  {colors.map(c => (
                    <div style={swatchStyle} key={c}>
                      <div
                        style={{ backgroundColor: c }}
                        className="w100 h100 hover-grow-10 clickable"
                        onClick={() =>
                          handleCollectionEdit("color", collection, index, c)
                        }
                      ></div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "grid",
                    gridTemplateColumns: "40% 60% auto"
                  }}
                >
                  <button
                    className="btn btn-small btn-info"
                    style={{
                      padding: "2px 5px",
                      fontSize: "12px",
                      margin: "auto"
                    }}
                    onClick={() => setColors(colors.map(() => randomColor()))}
                  >
                    random!
                  </button>
                  <input
                    className="form-control"
                    placeholder="hex key..."
                    value={newColor}
                    onChange={e => setNewColor(e.target.value)}
                    type="text"
                    maxLength="6"
                    style={{
                      margin: "auto",
                      padding: "2px 25px 2px 5px",
                      height: "auto",
                      fontSize: "12px"
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    style={{
                      margin: "auto",
                      position: "relative",
                      left: "-20px",
                      color: "blue",
                      fontSize: "16px"
                    }}
                    className="clickable hover-grow-10"
                    onClick={() =>
                      handleCollectionEdit(
                        "color",
                        collection,
                        index,
                        "#" + newColor
                      )
                    }
                  />
                </div>
              </div>
            </Popover.Content>
          </Popover>
        </div>
      }
    >
      <div className="edit-group-prepend">
        <FontAwesomeIcon
          icon={faFillDrip}
          style={{
            color: collection.color,
            margin: "auto 0px auto 10px",
            fontSize: "14px"
          }}
          className="clickable"
        />
      </div>
    </OverlayTrigger>
  );
};

export default NotesFilter;
