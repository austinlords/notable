import config from "../config";
import { toast } from "react-toastify";

export async function getCollections() {
  try {
    const response = await fetch(`${config.apiUrl}collections`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const collections = await response.json();

    if (response.status !== 200) {
      return null;
    }

    return collections;
  } catch (error) {
    console.log(error);
  }
}

export async function postCollection(collection) {
  try {
    const response = await fetch(config.apiUrl + "collections", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      body: JSON.stringify({
        name: collection.name,
        color: collection.color,
        user: collection.user
      })
    });

    const updatedCollection = await response.json();

    if (response.status !== 200) {
      return null;
    }
    return updatedCollection;
  } catch (error) {
    console.log(error);
  }
}

export async function putCollection(collection) {
  try {
    const response = await fetch(
      config.apiUrl + "collections/" + collection._id,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: collection.name,
          color: collection.color,
          user: collection.user
        })
      }
    );

    const updatedCollection = await response.json();

    if (response.status !== 200) {
      return null;
    }
    return updatedCollection;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCollection(id) {
  try {
    const response = await fetch(config.apiUrl + "collections/" + id, {
      method: "DELETE",
      credentials: "include"
    });

    if (!response.ok) {
      return null;
    }

    return id;
  } catch (error) {
    console.log(error);
  }
}
