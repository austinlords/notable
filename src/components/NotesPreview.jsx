import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import TagsPreview from "./common/TagsPreview";
import config from "../config";
import truncate from "../utils/truncate";

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
    fontSize: "12px",
    fontWeight: "bold",
    fontStyle: "italic"
  };

  individualNotes = {
    display: "grid",
    gridTemplateColumns: "20px auto",
    width: "100%",
    padding: "1px",
    marginBottom: "0px"
  };

  filterNotes = notes => {
    if (!this.props.searchQuery) return notes;
    if (!notes) return [];
    let search = this.props.searchQuery.toLowerCase();

    if (notes)
      return notes.filter(
        n =>
          n.content.blocks.find(el => el.text.toLowerCase().includes(search)) ||
          n.title.toLowerCase().includes(search)
      );
  };

  generateSearchPreview = note => {
    let searchQuery = this.props.searchQuery;

    let previewText = note.content.blocks.map(n => n.text).join(" ");
    let startIndex = previewText
      .toLowerCase()
      .indexOf(searchQuery.toLowerCase());

    if (startIndex === -1) return <div>{previewText}</div>;
    let endIndex = startIndex + searchQuery.length;

    const preLength = 20;
    const previewLength = config.notesPreviewLength;

    let pre = previewText.slice(0, startIndex);
    let highlight = previewText.slice(startIndex, endIndex);
    let post = previewText.slice(endIndex);

    if (previewText.length > previewLength) {
      if (pre.length >= previewLength + searchQuery.length + 3)
        pre = pre.slice(pre.length - preLength);
      if (post.length > previewLength - searchQuery.length - pre.length)
        post = post.slice(0, previewLength - pre.length);
    }

    return (
      <div>
        <span>{pre}</span>
        <span style={{ backgroundColor: "yellow" }}>{highlight}</span>
        <span>{post}</span>
      </div>
    );
  };

  generateTitle = note => {
    let searchQuery = this.props.searchQuery;
    let title = note.title;

    let startIndex = title.toLowerCase().indexOf(searchQuery.toLowerCase());

    if (startIndex === -1) return <div>{title}</div>;

    let endIndex = startIndex + searchQuery.length;

    let pre = title.slice(0, startIndex);
    let highlight = title.slice(startIndex, endIndex);
    let post = title.slice(endIndex);

    return (
      <div>
        <span>{pre}</span>
        <span style={{ backgroundColor: "yellow" }}>{highlight}</span>
        <span>{post}</span>
      </div>
    );
  };

  render() {
    var filtered = this.filterNotes(this.props.allNotes);

    let selectedId = this.props.selectedNote ? this.props.selectedNote._id : "";

    let { searchQuery, onSearch, onClear } = this.props;

    return (
      <div className="sidebar-preview bg-light-gray">
        <div className="input-group search-box">
          <input
            type="text"
            className="form-control"
            value={searchQuery}
            onChange={e => onSearch(e.currentTarget.value)}
            placeholder="Search..."
          />
          <div className="input-group-prepend">
            <button
              onClick={() => onClear()}
              className="btn btn-outline-secondary"
              type="button"
            >
              clear
            </button>
          </div>
        </div>
        <div className="list-group preview-section">
          {filtered.map((n, index) => (
            <div
              className="list-group-item"
              style={{
                ...this.individualNotes,
                background:
                  n._id === selectedId
                    ? (n.collection && n.collection.color) || "lightgray"
                    : "white"
              }}
              key={index}
            >
              <div
                style={{
                  ...this.collectionStyle,
                  background: n.collection.color || "none"
                }}
              >
                <span>{truncate(n.collection.name, 12)}</span>
              </div>
              <Link
                key={n._id}
                to={`/notes/${n._id}`}
                style={this.listItemStyle}
                className="list-group-item-action"
              >
                <div>
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{this.generateTitle(n)}</h5>
                    <small>{moment(n.updated).format("MMM D 'YY")}</small>
                  </div>
                  <div style={this.previewStyle}>
                    {this.generateSearchPreview(n)}
                  </div>
                  <TagsPreview
                    fontSize="11px"
                    tags={n.tags}
                    style={{ marginTop: "5px" }}
                    iconColor="darkslateblue"
                    length={n._id === selectedId ? 200 : 45}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default NotesPreview;
