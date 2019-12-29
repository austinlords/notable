import React, { Component } from "react";
import Preview from "./Preview";
import Filter from "./Filter";
import styles from "./sidebar.module.css";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagsOpen: true,
      collectionFilter: "",
      tagsFilter: []
    };

    this.handleCheckboxSelect = this.handleCheckboxSelect.bind(this);
    this.handleRadioSelect = this.handleRadioSelect.bind(this);
    this.handleDropdownClick = this.handleDropdownClick.bind(this);
  }

  handleDropdownClick(e) {
    const dataTarget = e.currentTarget.getAttribute("data-target");
    const isExpanded = e.currentTarget.getAttribute("aria-expanded");

    switch (dataTarget) {
      case "#collections":
        if (isExpanded === "false") {
          this.setState({ collectionsOpen: false });
        } else {
          this.setState({ collectionsOpen: true });
        }
        break;
      case "#tags":
        if (isExpanded === "false") {
          this.setState({ tagsOpen: false });
        } else {
          this.setState({ tagsOpen: true });
        }
        break;
      default:
        break;
    }
  }

  handleRadioSelect(event) {
    this.setState({
      collectionFilter: event.target.value,
      tagsFilter: []
    });
  }

  handleCheckboxSelect(event) {
    let selectedTags = this.state.tagsFilter;
    let tag = event.target.value;

    if (selectedTags.includes(tag)) {
      let newTags = selectedTags;
      newTags.splice(selectedTags.indexOf(tag), 1);
      this.setState({
        tagsFilter: newTags
      });
    } else {
      this.setState({
        tagsFilter: [...this.state.tagsFilter, tag]
      });
    }
  }

  filterNotes(notes) {
    let filteredNotes = notes;

    if (this.state.collectionFilter)
      filteredNotes = filteredNotes.filter(
        n => n.collection.name === this.state.collectionFilter
      );

    let tags = [];
    filteredNotes.forEach(n => tags.push(...n.tags));
    tags = [...new Set(tags)];

    if (this.state.tagsFilter.length > 0) {
      let lowerTags = this.state.tagsFilter.map(t => t.toLowerCase());

      filteredNotes = filteredNotes.filter(n => {
        let combinedTags = [...n.tags.map(n => n.toLowerCase()), ...lowerTags];
        let setTags = [...new Set(combinedTags)];
        return setTags.length !== combinedTags.length;
      });
    }

    return { filteredNotes, tags };
  }

  render() {
    let {
      searchQuery,
      allNotes,
      selectedNote,
      onSearch,
      onClear,
      collections
    } = this.props;

    let tags = [];

    if (allNotes) {
      let notes = this.filterNotes(allNotes);
      allNotes = notes.filteredNotes;
      tags = notes.tags.sort();
    }

    return (
      <div className={styles.wholeSidebar}>
        <Filter
          handleDropdownClick={this.handleDropdownClick}
          handleRadioSelect={this.handleRadioSelect}
          handleCheckboxSelect={this.handleCheckboxSelect}
          collectionFilter={this.state.collectionFilter}
          tagsFilter={this.state.tagsFilter}
          tags={tags}
          key={collections.length}
        />
        <Preview
          allNotes={allNotes}
          selectedNote={selectedNote}
          searchQuery={searchQuery}
          collections={collections}
          onSearch={onSearch}
          onClear={onClear}
        />
      </div>
    );
  }
}

export default SideBar;
