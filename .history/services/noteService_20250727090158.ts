// src/services/noteService.ts
import axios, { AxiosResponse } from "axios";
import { Note, NoteTag } from "../types/note";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesParams {
  page: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  data: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page,
  perPage = 12,
  search = "",
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await instance.get(
    "/notes",
    {
      params: { page, perPage, search },
    }
  );
  return response.data;
};

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (
  noteData: CreateNotePayload
): Promise<Note> => {
  const response: AxiosResponse<Note> = await instance.post("/notes", noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await instance.delete(`/notes/${id}`);
  return response.data;
};
