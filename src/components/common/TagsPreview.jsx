import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";

const TagsPreview = ({ fontSize, tags, style, length, iconColor }) => {
  let tagLen = length || 40;
  let tagsStr = tags.length > 0 ? tags.join(", ") : "(add tags)";

  if (tagsStr.length > tagLen) tagsStr = tagsStr.slice(0, tagLen) + "...";

  const linkStyle = {
    color: "orangered",
    fontStyle: "italic",
    cursor: "pointer",
    fontSize
  };

  return (
    <div style={{ ...linkStyle, ...style }}>
      <FontAwesomeIcon
        icon={faTags}
        style={{ color: iconColor, marginRight: "10px" }}
      />
      <span>{tagsStr}</span>
    </div>
  );
};

export default TagsPreview;
