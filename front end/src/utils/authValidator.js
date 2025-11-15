import axios from "axios";

export default async function isAuthenticated() {
  try {
    const response = await axios.get("http://localhost:3000/userIsAuthenticated", {
      withCredentials: true,
    });
    return response.status == 200;
  } catch (error) {
    console.log(`you are not authenticated: ${error}`);
    return false;
  }
}
