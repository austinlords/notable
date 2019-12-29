import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faMinusCircle,
  faFillDrip
} from "@fortawesome/free-solid-svg-icons";
import { Popover, OverlayTrigger } from "react-bootstrap";
import randomColor from "../../../utils/randomColor";

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

export default EditCollections;
