import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";

class NotesPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  listItemStyle = {
    padding: "0.5em 0.75em",
    background: "white"
  };

  previewStyle = {
    fontSize: 12,
    margin: "3px 0px",
    lineHeight: 1.25
  };

  tagsStyle = {
    fontSize: 11,
    fontStyle: "italic",
    marginLeft: "5px",
    color: "orangered"
  };

  collectionStyle = {
    margin: "5px 5px 5px 0px",
    borderRadius: "0 8px 8px 0",
    writingMode: "vertical-rl",
    textAlign: "center",
    fontSize: "11px",
    letterSpacing: "0.5px",
    fontWeight: "bold",
    fontStyle: "oblique"
  };

  individualNotes = {
    display: "grid",
    gridTemplateColumns: "20px auto",
    width: "100%",
    padding: "0",
    backgroundColor: "white"
  };

  filter = notes =>
    notes
      ? notes.filter(
          n =>
            n.content.blocks.find(el =>
              el.text
                .toLowerCase()
                .includes(this.props.searchQuery.toLowerCase())
            ) ||
            n.tags.find(el =>
              el.toLowerCase().includes(this.props.searchQuery.toLowerCase())
            )
        )
      : null;

  generateSearchPreview = note => {
    let allContent = note.content.blocks
      .map(n => (n.type !== "header-one" ? n.text : ""))
      .join(" ");
    let indexSearchTerm = allContent
      .toLowerCase()
      .indexOf(this.props.searchQuery.toLowerCase());

    let previewText = "";
    const preSearchDistance = 15;

    if (indexSearchTerm < preSearchDistance) {
      previewText = allContent.slice(
        0,
        indexSearchTerm + 50 + preSearchDistance - indexSearchTerm
      );
    } else {
      previewText =
        "..." + allContent.slice(indexSearchTerm - 15, indexSearchTerm + 50);
    }

    return (
      <div>
        <span>{previewText.slice(0, indexSearchTerm)}</span>
        <span style={{ backgroundColor: "yellow" }}>
          {previewText.slice(
            indexSearchTerm,
            indexSearchTerm + this.props.searchQuery.length
          )}
        </span>
        <span>
          {previewText.slice(indexSearchTerm + this.props.searchQuery.length)}
        </span>
      </div>
    );
  };

  // <span style={{backgroundColor="yellow"}}>{this.props.searchQuery}</span>)
  render() {
    let filtered = this.filter(this.props.allNotes);

    return (
      <div className="list-group preview-section">
        {filtered &&
          filtered.map(n => {
            return (
              <div
                className="list-group-item"
                style={this.individualNotes}
                key={n._id}
              >
                <div
                  style={{
                    ...this.collectionStyle,
                    backgroundColor: n.collection.color
                  }}
                >
                  <span>{n.collection.name}</span>
                </div>
                <Link
                  key={n._id}
                  to={`/notes/${n._id}`}
                  style={this.listItemStyle}
                  className="list-group-item-action"
                >
                  <div>
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">{n.title}</h5>
                      <small>{moment(n.updated).format("MMM D 'YY")}</small>
                    </div>
                    <div style={this.previewStyle}>
                      {this.props.searchQuery
                        ? this.generateSearchPreview(n)
                        : n.preview}
                    </div>
                    <small>
                      <FontAwesomeIcon
                        icon={faTags}
                        style={{
                          fontSize: "10px",
                          opacity: "0.8",
                          color: "slategray"
                        }}
                      />
                      <span style={this.tagsStyle}>
                        {(n.tags && n.tags.join(", ")) || "(no tags)"}
                      </span>
                    </small>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    );
  }
}

export default NotesPreview;
