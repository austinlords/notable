import axios from "axios";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/notes/";

export function saveNote(note) {
  axios.post(apiEndPoint, note);
}
