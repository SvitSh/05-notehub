import axios from "axios";
import { Note } from "../types/note";

const BASE_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface CreateNotePayload {
  title: string;
  content: string;
  tag: "Todo" | "InProgress" | "Done";
}

export const fetchNotes = async (
  page: number,
  search: string,
  perPage: number
): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(`${BASE_URL}/notes`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    params: {
      page,
      search,
      perPage,
    },
  });
  return response.data;
};

export const createNote = async (note: CreateNotePayload): Promise<Note> => {
  const response = await axios.post<Note>(`${BASE_URL}/notes`, note, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};

export const deleteNote = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
};
