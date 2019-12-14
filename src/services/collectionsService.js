import { apiUrl } from "../config";
import {
  httpGet,
  httpPost,
  httpPut,
  httpDelete
} from "../services/httpService";

export async function getCollections() {
  const collections = await httpGet(apiUrl + "collections");
  return collections;
}

export async function postCollection(collection) {
  const updatedCollection = await httpPost(
    apiUrl + "collections",
    JSON.stringify({
      name: collection.name,
      color: collection.color,
      user: collection.user
    })
  );

  return updatedCollection;
}

export async function putCollection(collection) {
  const updatedCollection = await httpPut(
    apiUrl + "collections/" + collection._id,
    JSON.stringify({
      name: collection.name,
      color: collection.color,
      user: collection.user
    })
  );

  return updatedCollection;
}

export async function deleteCollection(id) {
  const deletedCollection = await httpDelete(apiUrl + "collections/" + id);

  return deletedCollection._id;
}
