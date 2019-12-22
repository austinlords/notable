import { apiUrl } from "../config";
import {
  httpGet,
  httpPost,
  httpPut,
  httpDelete
} from "../services/httpService";

async function getNotes() {
  const response = await httpGet(apiUrl + "notes");

  if (response.error) {
    throw new Error(response.message);
  }

  response.forEach(n => {
    n.collection = n.col;
    delete n.col;
  });
  return response;
}

async function postNote(note) {
  const response = await httpPost(
    apiUrl + "notes",
    JSON.stringify({
      title: note.title,
      content: note.content,
      tags: note.tags,
      collection: note.collection,
      user: note.user
    })
  );

  if (response.error) {
    throw new Error(response.message);
  }

  response.collection = response.col;
  delete response.col;

  return response;
}

async function putNote(note) {
  const response = await httpPut(
    apiUrl + "notes/" + note._id,
    JSON.stringify({
      title: note.title,
      content: note.content,
      tags: note.tags,
      collection: note.collection,
      user: note.user
    })
  );

  if (response.error) {
    throw new Error(response.message);
  }

  response.collection = response.col;
  delete response.col;

  return response;
}

async function deleteNote(id) {
  const response = await httpDelete(apiUrl + "notes/" + id);

  if (response.error) {
    throw new Error(response.message);
  }

  return response._id;
}

export { getNotes, putNote, postNote, deleteNote };
