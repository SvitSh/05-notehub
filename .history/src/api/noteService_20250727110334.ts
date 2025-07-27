// src/api/noteService.ts
import axios from "axios";
import { Note } from "../types/note";

// ✅ тимчасово виводимо змінні середовища
console.log("✅ API_URL =", import.meta.env.VITE_API_URL);
console.log("✅ TOKEN =", import.meta.env.VITE_NOTEHUB_TOKEN);

export interface FetchNotesParams {
  page: number;
  search: string;
}

export const fetchNotes = async ({
  page,
  search,
}: FetchNotesParams): Promise<Note[]> => {
  const response = await axios.get<Note[]>(
    `${import.meta.env.VITE_API_URL}/notes`,
    {
      params: {
        _page: page,
        q: search,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`, // 👈 исправлено
      },
    }
  );
  return response.data;
};
