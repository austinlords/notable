import React from "react";
import { Editor, RichUtils, convertToRaw } from "draft-js";
import Textarea from "react-expanding-textarea";
import EditorMenu from "./EditorMenu";
import "../css/notes.css";
import "draft-js/dist/Draft.css";

class DraftEditor extends React.Component {
  constructor(props) {
    super(props);

    this.focus = () => this.editor.focus();

    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }

  handleTitle = title => {
    if (this.props.selectedNote) {
      const note = { ...this.props.selectedNote };
      note.title = title;
      return this.props.updateSelectedNote(note);
    } else {
      const currentEditorContent = convertToRaw(
        this.props.editorState.getCurrentContent()
      );
      const note = {
        _id: Date.now().toString(),
        title: title,
        content: currentEditorContent,
        tags: [],
        collection: {}
      };
      return this.props.updateSelectedNote(note);
    }
  };

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.props.onEditorChange(newState);
      return true;
    }
    return false;
  }

  _toggleBlockType(blockType) {
    this.props.onEditorChange(
      RichUtils.toggleBlockType(this.props.editorState, blockType)
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.props.onEditorChange(
      RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle)
    );
  }

  controlsStyle = {
    display: "inline-flex",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "14px",
    margin: "auto 0px"
  };

  verticalLine = {
    width: "1px",
    height: "20px",
    borderRight: "1px solid grey",
    margin: "auto 5px"
  };

  render() {
    return (
      <div className="editor-window">
        <div className="editor-menu">
          <EditorMenu
            save={this.props.save}
            handleDelete={this.props.handleDelete}
            selectedNote={this.props.selectedNote}
            collections={this.props.collections}
            updateSelectedNote={this.props.updateSelectedNote}
            editorState={this.props.editorState}
          />
          <div id="stying-controls" style={this.controlsStyle}>
            <InlineStyleControls
              editorState={this.props.editorState}
              onToggle={this.toggleInlineStyle}
            />
            <div style={this.verticalLine}></div>
            <BlockStyleControls
              editorState={this.props.editorState}
              onToggle={this.toggleBlockType}
            />
            <hr></hr>
          </div>
        </div>
        <div id="rich-text-editor">
          <div>
            <Textarea
              className="textarea"
              id="title-textarea"
              placeholder="Title..."
              value={
                this.props.selectedNote ? this.props.selectedNote.title : ""
              }
              onChange={e => this.handleTitle(e.target.value)}
            />
            <hr></hr>
          </div>
          <div className="editor-edit" onClick={this.focus}>
            <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={this.props.editorState}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.mapKeyToEditorCommand}
              onChange={this.props.onEditorChange}
              ref={ref => (this.editor = ref)}
              spellCheck={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    case "code-block":
      return "editor-code";
    default:
      return null;
  }
}

class StyleButton extends React.Component {
  constructor(props) {
    super(props);
    this.onToggle = e => {
      e.preventDefault();
      props.onToggle(props.style);
    };
  }

  render() {
    let className = "editor-styleButton";
    if (this.props.active) {
      className += " editor-activeButton";
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  { label: "Title", style: "header-one" },
  { label: "Header", style: "header-three" },
  {
    label: <i className="fa fa-list-ul" aria-hidden="true"></i>,
    style: "unordered-list-item"
  },
  {
    label: <i className="fa fa-list-ol" aria-hidden="true"></i>,
    style: "ordered-list-item"
  },
  {
    label: <i className="fa fa-code" aria-hidden="true"></i>,
    style: "code-block"
  }
];

const BlockStyleControls = ({ editorState, onToggle }) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="editor-control-row">
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.style}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: <i className="fa fa-bold" aria-hidden="true"></i>, style: "BOLD" },
  {
    label: <i className="fa fa-italic" aria-hidden="true"></i>,
    style: "ITALIC"
  },
  {
    label: <i className="fa fa-underline" aria-hidden="true"></i>,
    style: "UNDERLINE"
  },
  { label: "Monospace", style: "CODE" }
];

const InlineStyleControls = ({ editorState, onToggle }) => {
  var currentStyle = editorState.getCurrentInlineStyle();
  return (
    <div className="editor-control-row">
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.style}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default DraftEditor;
