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
import randomColor from "./../utils/randomColor";

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
      collectionsToUpdate.forEach(c => this.props.updateCollections(c, "edit"));
      this.setState({ editMode: !this.state.editMode });
    }
  };

  handleCollectionDelete = event => {
    const collectionId = event.currentTarget.getAttribute("data");
    let allCollections = [...this.props.collections];

    let collection = allCollections.filter(c => c._id === collectionId);
    this.props.updateCollections(collection[0], "delete");
  };

  handleCollectionChange = (collection, index, event) => {
    const collectionsToEdit = [...this.state.collectionsToEdit];
    const collectionToUpdate = { ...collection };
    collectionToUpdate.name = event.currentTarget.value;
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
          handleCollectionChange={this.handleCollectionChange}
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
    <div id="profile-preview" style={profileDivStyle}>
      <div style={profileContentStyle}>
        <div style={{ display: "flex", margin: "auto" }}>
          <FontAwesomeIcon icon={faUserCircle} />
        </div>
        <div style={{ fontSize: "11px" }}>lords.austin@gmail.com</div>
      </div>
    </div>
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
      name: newCollection,
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
            onChange={e => setNewCollection(e.target.value)}
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
  handleCollectionChange,
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
          height: "95%",
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
            handleCollectionChange={handleCollectionChange}
            handleCollectionDelete={handleCollectionDelete}
          />
        ) : (
          collections.map(c => (
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
              {tag}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

const EditCollections = ({
  collectionsToEdit,
  handleCollectionChange,
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
            onChange={e => handleCollectionChange(c, i, e)}
          />
          <EditColor color={c.color} collection={c} />
        </div>
      ))}
    </div>
  );
};

const EditColor = ({ color, collection }) => {
  const [colors, setColor] = useState([
    "#BCAAA4",
    "#EF9A9A",
    "#C5E1A5",
    "#FFCC80",
    "#CE93D8",
    "#4FC3F7"
  ]);
  const [activeColor, setActiveColor] = useState(color);

  const componentStyle = {
    width: "180px",
    height: "60px",
    display: "grid",
    gridTemplateRows: "30px 30px",
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
          <Popover id={collection._id}>
            <Popover.Title>{collection.color}</Popover.Title>
            <Popover.Content>
              <div style={componentStyle}>
                <div style={divStyle}>
                  {colors.map(c => (
                    <div style={swatchStyle} key={c}>
                      <div
                        style={{ backgroundColor: c }}
                        className="w100 h100 hover-grow-10 clickable"
                        data={c}
                        onClick={() => setActiveColor()}
                      ></div>
                    </div>
                  ))}
                </div>
                <div></div>
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
