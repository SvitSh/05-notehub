import axios, { AxiosResponse } from "axios";
import { Note, NoteTag } from "../types/note";

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface CreateNoteDto {
  title: string;
  content: string;
  tag: NoteTag;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // наприклад: https://notehub-public.goit.study/api
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const { page, perPage, search = "" } = params;

  const res: AxiosResponse<FetchNotesResponse> = await api.get("/notes", {
    params: { page, perPage, search },
  });

  return res.data;
};

export const createNote = async (body: CreateNoteDto): Promise<Note> => {
  const res: AxiosResponse<Note> = await api.post("/notes", body);
  return res.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const res: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return res.data;
};
