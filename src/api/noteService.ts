// src/api/noteService.ts
import axios, { AxiosResponse } from "axios";
import {
  Note,
  FetchNotesParams,
  FetchNotesResponse,
  NoteTag,
} from "../types/note";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

// --------- READ (LIST) ----------
export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const { page, perPage, search } = params;

  const res: AxiosResponse<FetchNotesResponse> = await api.get("/notes", {
    params: {
      page,
      perPage,
      search: search ?? "",
    },
  });

  return res.data;
};

// --------- CREATE ----------
export interface CreateNoteDto {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (body: CreateNoteDto): Promise<Note> => {
  const res: AxiosResponse<Note> = await api.post("/notes", body);
  return res.data;
};

// --------- DELETE ----------
export const deleteNote = async (id: string): Promise<Note> => {
  const res: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return res.data;
};
