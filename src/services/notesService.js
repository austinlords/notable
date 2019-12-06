import config from "../config";
import { toast } from "react-toastify";

export async function getNotes() {
  try {
    const response = await fetch(`${config.apiUrl}notes`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors"
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

export async function saveNote(note) {
  try {
    const response = await fetch(config.apiUrl + "notes", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      body: {
        title: note.body,
        content: note.content,
        tags: note.tags,
        col: note.collection,
        user: note.user
      }
    });
    const updatedNote = await response.json();
    if (response.status !== 200) {
      toast.error(updatedNote.message);
      return [];
    }
    return updatedNote;
  } catch (error) {
    console.log(error);
  }
}

export async function updateNote(note) {
  try {
    const response = await fetch(config.apiUrl + "notes" + note._id, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      body: {
        title: note.body,
        content: note.content,
        tags: note.tags,
        col: note.collection,
        user: note.user
      }
    });
    const updatedNote = await response.json();
    if (response.status !== 200) {
      toast.error(updatedNote.message);
      return [];
    }
    return updatedNote;
  } catch (error) {
    console.log(error);
  }
}
