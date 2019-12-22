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

    const resBody = await response.json();

    if (!response.ok) {
      throw new Error(resBody.message);
    }

    localStorage.setItem("notable-token", response.headers.get("x-auth"));

    return resBody;
  } catch (error) {
    console.log(error);
    return { message: error.message, error: true };
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

    let resBody = await response.json();

    if (!response.ok) {
      throw new Error(resBody.message);
    }

    localStorage.setItem("notable-token", response.headers.get("x-auth"));

    return resBody;
  } catch (error) {
    console.log(error);
    return { message: error.message, error: true };
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

    const resBody = await response.json();

    if (!response.ok) {
      throw new Error(resBody.message);
    }

    localStorage.setItem("notable-token", response.headers.get("x-auth"));

    return resBody;
  } catch (error) {
    console.log(error);
    return { message: error.message, error: true };
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

    const resBody = await response.json();

    if (!response.ok) {
      throw new Error(resBody.message);
    }

    localStorage.setItem("notable-token", response.headers.get("x-auth"));

    return resBody;
  } catch (error) {
    console.log(error);
    return { message: error.message, error: true };
  }
};
