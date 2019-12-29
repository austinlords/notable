import React, { useState, useContext } from "react";
import Profile from "./Profile";
import Buttons from "./Buttons";
import Collections from "./Collections";
import Tags from "./Tags";
import NotesContext from "../../../context/NotesContext";
import "../notes.css";

const NotesFilter = ({
  handleCheckboxSelect,
  handleRadioSelect,
  collectionFilter,
  tagsFilter,
  tags
}) => {
  const [editMode, setEditMode] = useState(false);
  const [collectionsToEdit, setCollectionsToEdit] = useState([]);

  // Context from Notes.jsx
  const _NOTES = useContext(NotesContext);

  const toggleEditMode = () => {
    const currentCollections = [..._NOTES.collections];
    if (!editMode) {
      setEditMode(true);
      setCollectionsToEdit(currentCollections);
    } else {
      let collectionsToUpdate = collectionsToEdit.filter((c, index) => {
        return (
          c.name !== currentCollections[index].name ||
          c.color !== currentCollections[index].color
        );
      });
      collectionsToUpdate.forEach(
        async c => await _NOTES.updateCollections(c, "edit")
      );
      setEditMode(!editMode);
    }
  };

  const handleCollectionDelete = event => {
    const collectionId = event.currentTarget.getAttribute("data");
    let allCollections = [..._NOTES.collections];

    let collection = allCollections.filter(c => c._id === collectionId);
    _NOTES.updateCollections(collection[0], "delete");
  };

  const handleCollectionEdit = (type, collection, index, value) => {
    const toEdit = [...collectionsToEdit];
    const collectionToUpdate = { ...collection };

    if (type === "name") collectionToUpdate.name = value;

    if (type === "color") collectionToUpdate.color = value;

    toEdit.splice(index, 1, collectionToUpdate);

    setCollectionsToEdit(toEdit);
  };

  return (
    <div id="filterSection" className="bg-dark-blue">
      <Profile />
      <Buttons editMode={editMode} toggleEditMode={toggleEditMode} />
      <Collections
        toggleEditMode={toggleEditMode}
        editMode={editMode}
        handleRadioSelect={handleRadioSelect}
        handleCollectionEdit={handleCollectionEdit}
        handleCollectionDelete={handleCollectionDelete}
        collectionFilter={collectionFilter}
        collectionsToEdit={collectionsToEdit}
      />
      <Tags
        tags={tags}
        tagsFilter={tagsFilter}
        handleCheckboxSelect={handleCheckboxSelect}
      />
    </div>
  );
};

export default NotesFilter;
