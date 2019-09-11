import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";

/*function shortContent(content) {
  if (content.length < 75) return content;
  return content.slice(0, 75) + "...";
}*/

/*function shortTags(tags) {
  let totalLength = tags.reduce((a, c) => (a += c.length), 0);
  if (totalLength < 25) return tags;
  for (let i = 0; i < tags.length; i++) {}
}*/

const NotesPreview = ({ allNotes }) => {
  const listItemStyle = {
    padding: "0.5em 0.75em",
    background: "white"
  };

  const previewStyle = {
    fontSize: 12,
    margin: "3px 0px",
    lineHeight: 1.25
  };

  const tagsStyle = {
    fontSize: 11,
    fontStyle: "italic",
    marginLeft: "5px",
    color: "orangered"
  };

  const collectionStyle = {
    margin: "5px 5px 5px 0px",
    borderRadius: "0 8px 8px 0",
    writingMode: "vertical-rl",
    textAlign: "center",
    fontSize: "11px",
    letterSpacing: "0.5px",
    fontWeight: "bold",
    fontStyle: "oblique"
  };

  const individualNotes = {
    display: "grid",
    gridTemplateColumns: "20px auto",
    width: "100%",
    padding: "0",
    backgroundColor: "white"
  };

  return (
    <div className="list-group preview-section">
      {allNotes &&
        allNotes.map(n => {
          return (
            <div
              className="list-group-item"
              style={individualNotes}
              key={n._id}
            >
              <div
                style={{
                  ...collectionStyle,
                  backgroundColor: n.collection.color
                }}
              >
                <span style={{}}>{n.collection.name}</span>
              </div>
              <Link
                key={n._id}
                to={`/notes/${n._id}`}
                style={listItemStyle}
                className="list-group-item-action"
              >
                <div>
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{n.title}</h5>
                    <small>{moment(n.updated).format("MMM D 'YY")}</small>
                  </div>
                  <p style={previewStyle}>{n.preview}</p>
                  <small>
                    <FontAwesomeIcon
                      icon={faTags}
                      style={{
                        fontSize: "10px",
                        opacity: "0.8",
                        color: "slategray"
                      }}
                    />
                    <span style={tagsStyle}>
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
};

export default NotesPreview;
