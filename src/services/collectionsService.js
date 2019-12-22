import { apiUrl } from "../config";
import {
  httpGet,
  httpPost,
  httpPut,
  httpDelete
} from "../services/httpService";

export async function getCollections() {
  const response = await httpGet(apiUrl + "collections");

  if (response.error) {
    throw new Error(response.message);
  }

  return response;
}

export async function postCollection(collection) {
  const response = await httpPost(
    apiUrl + "collections",
    JSON.stringify({
      name: collection.name,
      color: collection.color,
      user: collection.user
    })
  );

  if (response.error) {
    throw new Error(response.message);
  }

  return response;
}

export async function putCollection(collection) {
  const response = await httpPut(
    apiUrl + "collections/" + collection._id,
    JSON.stringify({
      name: collection.name,
      color: collection.color,
      user: collection.user
    })
  );

  if (response.error) {
    throw new Error(response.message);
  }

  return response;
}

export async function deleteCollection(id) {
  const response = await httpDelete(apiUrl + "collections/" + id);

  if (response.error) {
    throw new Error(response.message);
  }

  return response._id;
}
