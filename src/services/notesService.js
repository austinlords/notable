import config from "../config";
import { toast } from "react-toastify";

async function getNotes() {
  try {
    const response = await fetch(`${config.apiUrl}notes`, {
      method: "GET",
      credentials: "include"
    });
    const notes = await response.json();
    if (response.status !== 200) {
      toast.info("User not logged in. Demo mode activated!");
      return null;
    }
    notes.forEach(n => {
      n.collection = n.col;
      delete n.col;
    });
    return notes;
  } catch (error) {
    console.log(error);
  }
}

async function postNote(note) {
  try {
    const response = await fetch(config.apiUrl + "notes", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: note.title,
        content: note.content,
        tags: note.tags,
        collection: note.collection,
        user: note.user
      })
    });
    const updatedNote = await response.json();
    if (response.status !== 200) {
      return null;
    }

    updatedNote.collection = updatedNote.col;
    delete updatedNote.col;

    return updatedNote;
  } catch (error) {
    console.log(error);
  }
}

async function putNote(note) {
  try {
    const response = await fetch(config.apiUrl + "notes/" + note._id, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: note.title,
        content: note.content,
        tags: note.tags,
        collection: note.collection,
        user: note.user
      })
    });
    const updatedNote = await response.json();
    if (response.status !== 200) {
      return null;
    }

    updatedNote.collection = updatedNote.col;
    delete updatedNote.col;

    return updatedNote;
  } catch (error) {
    console.log(error);
  }
}

async function deleteNote(id) {
  const response = await fetch(config.apiUrl + "notes/" + id, {
    method: "DELETE",
    credentials: "include"
  });

  if (!response.ok) {
    return null;
  }

  return id;
}

export { getNotes, putNote, postNote, deleteNote };
