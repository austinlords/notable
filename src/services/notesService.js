import { apiUrl } from "../config";
import {
  httpGet,
  httpPost,
  httpPut,
  httpDelete
} from "../services/httpService";

async function getNotes() {
  const notes = await httpGet(apiUrl + "notes");

  notes.forEach(n => {
    n.collection = n.col;
    delete n.col;
  });
  return notes;
}

async function postNote(note) {
  const updatedNote = await httpPost(
    apiUrl + "notes",
    JSON.stringify({
      title: note.title,
      content: note.content,
      tags: note.tags,
      collection: note.collection,
      user: note.user
    })
  );

  updatedNote.collection = updatedNote.col;
  delete updatedNote.col;

  return updatedNote;
}

async function putNote(note) {
  const updatedNote = await httpPut(
    apiUrl + "notes/" + note._id,
    JSON.stringify({
      title: note.title,
      content: note.content,
      tags: note.tags,
      collection: note.collection,
      user: note.user
    })
  );

  updatedNote.collection = updatedNote.col;
  delete updatedNote.col;

  return updatedNote;
}

async function deleteNote(id) {
  const deletedNote = await httpDelete(apiUrl + "notes/" + id);

  return deletedNote._id;
}

export { getNotes, putNote, postNote, deleteNote };
