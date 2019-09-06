import React from "react";
import { Link } from "react-router-dom";

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
  const notes = allNotes;

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
    fontSize: 12,
    fontStyle: "italic"
  };

  return (
    <div className="list-group preview-section">
      {notes &&
        notes.map(p => (
          <Link
            key={p._id}
            to={`/notes/${p._id}`}
            style={listItemStyle}
            className="list-group-item list-group-item-action"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{p.title}</h5>
              <small>date here</small>
            </div>
            <p style={previewStyle}>{p.preview}</p>
            <small style={tagsStyle}>Donec id elit non mi porta.</small>
          </Link>
        ))}
    </div>
  );
};

export default NotesPreview;
