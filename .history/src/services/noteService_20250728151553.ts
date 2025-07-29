import axios from "axios";
import { Note, NoteTag } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";

export const fetchNotes = async (
  page: number,
  search: string,
  perPage: number
): Promise<Note[]> => {
  const response = await axios.get(`${BASE_URL}/notes`, {
    params: {
      "page[page]": page,
      "page[perPage]": perPage,
      "page[search]": search,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
  });
  return response.data.results;
};
