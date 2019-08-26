import React from "react";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import "../css/editor.css";

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

export default DraftEditor;
