import { getUserData } from "../commonfuntion/getuserdata";
const apiUrl = process.env.REACT_APP_API_URL;
export const addToCart = async (data) => {
  try {
    const tokenData = localStorage.getItem("user");
    const userToken = tokenData ? JSON.parse(tokenData)?.token : null;

    const headers = {
      "Content-Type": "application/json",
    };

    if (userToken) {
      // Ensure the token is actually a string
      if (typeof userToken === "string") {
        headers["Authorization"] = `Bearer ${userToken.trim()}`;
      } else {
        console.error("Token is not a string:", userToken);
        throw new Error("Invalid token format");
      }
    }

    const response = await fetch(`${apiUrl}api/cart/addtocart`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error so calling code can handle it
  }
};

export const cardcount = async () => {
  const userid = getUserData().id;
  try {
    const tokenData = localStorage.getItem("user");
    const userToken = tokenData ? JSON.parse(tokenData)?.token : null;

    const headers = {
      "Content-Type": "application/json",
    };

    if (userToken) {
      // Ensure the token is actually a string
      if (typeof userToken === "string") {
        headers["Authorization"] = `Bearer ${userToken.trim()}`;
      } else {
        console.error("Token is not a string:", userToken);
        throw new Error("Invalid token format");
      }
    }
    const response = await fetch(`${apiUrl}/cart/cart/${userid}`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error so calling code can handle it
  }
};
