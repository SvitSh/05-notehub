import axios, { AxiosResponse } from "axios";
import { Note, NoteTag } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
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
  page: number;
  perPage: number;
}

export const fetchNotes = async ({
  page = 1,
  search = "",
  perPage = 12,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await instance.get("", {
    params: { page, search, perPage },
  });
  return response.data;
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: NoteTag;
}): Promise<Note> => {
  const response = await instance.post<Note>("", note);
  return response.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const response = await instance.delete<Note>(`/${id}`);
  return response.data;
};
