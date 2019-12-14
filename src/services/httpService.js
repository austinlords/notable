export const httpGet = async urlPath => {
  try {
    const response = await fetch(urlPath, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth": localStorage.getItem("notable-token")
      },
      credentials: "include"
    });

    if (!response.ok)
      throw new Error("Error: GET request failed on path " + urlPath);

    localStorage.setItem("notable-token", response.headers.get("x-auth"));

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const httpPost = async (urlPath, body) => {
  try {
    const response = await fetch(urlPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth": localStorage.getItem("notable-token")
      },
      credentials: "include",
      body
    });

    if (!response.ok)
      throw new Error("Error: POST request failed on path " + urlPath);

    localStorage.setItem("notable-token", response.headers.get("x-auth"));

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const httpPut = async (urlPath, body) => {
  try {
    const response = await fetch(urlPath, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth": localStorage.getItem("notable-token")
      },
      credentials: "include",
      body
    });

    if (!response.ok)
      throw new Error("Error: PUT request failed on path " + urlPath);

    localStorage.setItem("notable-token", response.headers.get("x-auth"));

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const httpDelete = async urlPath => {
  try {
    const response = await fetch(urlPath, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth": localStorage.getItem("notable-token")
      },
      credentials: "include"
    });

    if (!response.ok)
      throw new Error("Error: DELETE request failed on path " + urlPath);

    localStorage.setItem("notable-token", response.headers.get("x-auth"));

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
