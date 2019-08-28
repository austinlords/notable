import React from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil
} from "draft-js";
import "../css/editor.css";

class DraftEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };

    this.focus = () => this.editor.focus();
    this.onChange = editorState => this.setState({ editorState });

    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  render() {
    const { editorState } = this.state;

    return (
      <div id="rich-text-editor">
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <div className="" onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            onChange={this.onChange}
            ref={ref => (this.editor = ref)}
            spellCheck={true}
          />
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
    default:
      return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = e => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
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
    label: <i class="fa fa-list-ul" aria-hidden="true"></i>,
    style: "unordered-list-item"
  },
  {
    label: <i class="fa fa-list-ol" aria-hidden="true"></i>,
    style: "ordered-list-item"
  },
  { label: <i class="fa fa-code" aria-hidden="true"></i>, style: "code-block" }
];

const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="editor-control-row">
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: <i class="fa fa-bold" aria-hidden="true"></i>, style: "BOLD" },
  { label: <i class="fa fa-italic" aria-hidden="true"></i>, style: "ITALIC" },
  {
    label: <i class="fa fa-underline" aria-hidden="true"></i>,
    style: "UNDERLINE"
  },
  { label: "Monospace", style: "CODE" }
];

const InlineStyleControls = props => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="editor-control-row">
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

/*
class DraftEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };

    this.focus = () => this.editor.focus();
    this.onChange = editorState => this.setState({ editorState });

    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.toggleBlockType = this._toggleBlocktype.bind(this);
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  }

  _toggleBlocktype(blocktype) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blocktype));
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  }

  render() {
    const raw = convertToRaw(this.state.editorState.getCurrentContent());
    console.log(raw);

    const BLOCK_TYPES = [
      { label: "Title (H1)", style: "header-one" },
      { label: "Heading (H3)", style: "header-two" },
      { label: "Paragraph", style: "none" },
      { label: "Blockquote", style: "blockquote" },
      { label: "<Code>", style: "code-block" },
      { label: "List", style: "" }
    ];

    return (
      <div id="rich-text-editor">
        <div className="editor-control">
          <div className="editor-control-row">
            <span className="editor-styleButton">H1</span>
            <span className="editor-styleButton">H2</span>
            <span className="editor-styleButton">H3</span>
            <span className="editor-styleButton">H4</span>
            <span className="editor-styleButton">H5</span>
            <span className="editor-styleButton">H6</span>
            <span className="editor-styleButton">Blockquote</span>
            <span className="editor-styleButton">UL</span>
            <span className="editor-styleButton">OL</span>
            <span className="editor-styleButton">Code Block</span>
            <span
              onClick={this._onBoldClick.bind(this)}
              className="editor-styleButton"
            >
              Bold
            </span>
            <span className="editor-styleButton">Italic</span>
            <span className="editor-styleButton">Underline</span>
            <span className="editor-styleButton">Monospace</span>
          </div>
        </div>
        <hr />
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          handleKeyCommand={this._handleKeyCommand}
        />
      </div>
    );
  }
}
*/

export default DraftEditor;
