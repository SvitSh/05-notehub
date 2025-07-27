// src/api/noteService.ts
import axios from "axios";
import { Note } from "../types/note";

export interface FetchNotesParams {
  page: number;
  search: string;
}

export const fetchNotes = async ({
  page,
  search,
}: FetchNotesParams): Promise<Note[]> => {
  const response = await axios.get<Note[]>("https://your-api-url.com/notes", {
    params: {
      _page: page,
      q: search,
    },
  });
  return response.data;
};
