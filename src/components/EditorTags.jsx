import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { UncontrolledPopover, PopoverBody, PopoverHeader } from "reactstrap";

class EditorTags extends Component {
  state = { tagsPopoverOpen: false, newTag: "" };

  togglePopover = () => {
    this.setState({ tagsPopoverOpen: !this.state.tagsPopoverOpen });
  };

  handleTagsDelete = event => {
    const tag = event.currentTarget.getAttribute("data");
    let note = { ...this.props.selectedNote };
    note.tags = note.tags.filter(t => t !== tag);
    this.props.save(note);
  };

  onChange = event => {
    this.setState({ newTag: event.target.value });
  };

  pressEnter = event => {
    if (
      event.keyCode !== 13 ||
      this.props.selectedNote.tags.includes(this.state.newTag)
    )
      return;

    let note = { ...this.props.selectedNote };
    note.tags.push(this.state.newTag);
    this.setState({ newTag: "" });
    this.props.save(note);
  };

  render() {
    const { selectedNote } = this.props;

    return (
      <div
        style={{ textAlign: "right", padding: "0px 10px" }}
        id="tags-popover-link"
      >
        <FontAwesomeIcon icon={faTags} />
        <span style={{ marginLeft: "10px" }}>
          {selectedNote && (
            <>
              {selectedNote.tags &&
                selectedNote.tags.map((tag, index, tags) => (
                  <span
                    key={tag}
                    className="link-no-underline"
                    style={{ color: "orangered" }}
                  >
                    {index < tags.length - 1 ? tag + ", " : tag}
                  </span>
                ))}
              <UncontrolledPopover
                placement="bottom"
                isOpen={this.state.tagsPopoverOpen}
                target="tags-popover-link"
                trigger="legacy"
                toggle={() => this.togglePopover()}
              >
                <PopoverHeader>edit tags:</PopoverHeader>
                <PopoverBody key={selectedNote.tags.length}>
                  {selectedNote.tags.map(tag => (
                    <div key={tag}>
                      <span data={tag} onClick={e => this.handleTagsDelete(e)}>
                        <FontAwesomeIcon
                          icon={faMinusCircle}
                          style={{ color: "red", marginRight: "10px" }}
                        />
                      </span>
                      <label className="form-check-label">{tag}</label>
                    </div>
                  ))}
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.newTag}
                    onChange={e => this.onChange(e)}
                    placeholder="new tag..."
                    style={{
                      fontSize: ".9rem",
                      lineHeight: "1",
                      padding: "0px .75rem",
                      marginTop: "10px",
                      width: "150px",
                      height: "calc(2rem + 2px)"
                    }}
                    onKeyDown={this.pressEnter}
                    autoFocus
                  />
                  <small>(type tag and press Enter)</small>
                </PopoverBody>
              </UncontrolledPopover>
            </>
          )}
        </span>
      </div>
    );
  }
}

export default EditorTags;
