import axios from "axios";
import { FetchNotesResponse } from "../types/note";

export const fetchNotes = async (): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(
    `${import.meta.env.VITE_API_BASE_URL}/notes`
  );
  return response.data;
};
