import axios from "axios";
import { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  search?: string;
}

export interface FetchNotesResponse {
  data: Note[];
  total: number;
  page: number;
  perPage: number;
}

export const fetchNotes = async ({
  page = 1,
  search = "",
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await instance.get("/notes", {
    params: { page, perPage: 12, search },
  });
  return response.data;
};

export const createNote = async (newNote: Omit<Note, "id">): Promise<Note> => {
  const response = await instance.post("/notes", newNote);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await instance.delete(`/notes/${id}`);
  return response.data;
};
