import React from "react";

const EditorMenu = props => {
  return (
    <div className="editor-menu">
      <div className="clickable editor-menu-option">
        <i class="fa fa-pencil-square-o" aria-hidden="true" />
        <span> Edit</span>
      </div>
      <div className="clickable editor-menu-option">
        <i class="fa fa-plus" aria-hidden="true" />
        <span> New Note</span>
      </div>
      <div className="clickable editor-menu-option">
        <i class="fa fa-floppy-o" aria-hidden="true" />
        <span> Save</span>
      </div>
    </div>
  );
};

export default EditorMenu;
