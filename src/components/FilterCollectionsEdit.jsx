import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faFillDrip } from "@fortawesome/free-solid-svg-icons";
import { Popover, OverlayTrigger } from "react-bootstrap";
import ColorSwatch from "./ColorSwatch";
import randomColor from "./../utils/randomColor";

class FilterCollectionsEdit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      editCollections,
      handleCollectionChange,
      handleCollectionDelete
    } = this.props;

    return (
      <div>
        {editCollections.map((c, i) => (
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
            <OverlayTrigger
              trigger="click"
              placement="top"
              rootClose
              overlay={
                <div>
                  <Popover id={c._id}>
                    <Popover.Title>{c.color}</Popover.Title>
                    <Popover.Content>
                      <ColorSwatch color={c.color} />
                    </Popover.Content>
                  </Popover>
                </div>
              }
            >
              <div className="edit-group-prepend">
                <FontAwesomeIcon
                  icon={faFillDrip}
                  style={{
                    color: c.color,
                    margin: "auto 0px auto 10px",
                    fontSize: "14px"
                  }}
                  className="clickable"
                />
              </div>
            </OverlayTrigger>
          </div>
        ))}
      </div>
    );
  }
}

export default FilterCollectionsEdit;
