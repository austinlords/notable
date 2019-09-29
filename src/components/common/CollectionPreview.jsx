import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

const CollectionPreview = ({ fontSize, collection, style, length }) => {
  let len = length || 20;
  let colStr = collection.hasOwnProperty("name")
    ? collection.name
    : "(add collection)";

  if (colStr.length > len) colStr = colStr.slice(0, len) + "...";

  const linkStyle = {
    color: "blue",
    fontStyle: "italic",
    cursor: "pointer",
    fontSize
  };

  return (
    <div style={{ ...linkStyle, ...style }}>
      <FontAwesomeIcon
        icon={faBook}
        style={{
          color: "black",
          marginRight: "10px",
          transform: "rotate(-20deg)"
        }}
      />
      <span>{colStr}</span>
    </div>
  );
};

export default CollectionPreview;
