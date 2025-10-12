import axios from "axios";
import { toast } from "react-hot-toast";

// use this to interact with our own API (/app/api folder) from the front-end side
// See https://shipfa.st/docs/tutorials/api-call
const apiClient = axios.create({
  baseURL: "/api",
});

apiClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    let message = "";

    if (error.response?.status === 401) {
      // User not authenticated
      message =
        "Du bist nicht angemeldet. Bitte kaufe den Kurs, um Zugriff zu erhalten.";
    } else if (error.response?.status === 403) {
      // User not authorized
      message = "Du hast keine Berechtigung für diese Aktion.";
    } else {
      message =
        error?.response?.data?.error || error.message || error.toString();
    }

    error.message =
      typeof message === "string" ? message : JSON.stringify(message);

    console.error(error.message);

    // Automatically display errors to the user
    if (error.message) {
      toast.error(error.message);
    } else {
      toast.error("Etwas ist schiefgelaufen...");
    }
    return Promise.reject(error);
  },
);

export default apiClient;
