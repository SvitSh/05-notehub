import axios from "axios";
import { Note, NoteTag } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  search?: string;
  perPage?: number;
}

export interface FetchNotesResponse {
  data: Note[];
  total: number;
}

export const fetchNotes = async ({
  page = 1,
  search = "",
  perPage = 12,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await instance.get<FetchNotesResponse>("/notes", {
    params: { page, search, perPage },
  });
  return response.data;
};

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (newNote: CreateNoteParams): Promise<Note> => {
  const response = await instance.post<Note>("/notes", newNote);
  return response.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const response = await instance.delete<Note>(`/notes/${id}`);
  return response.data;
};
