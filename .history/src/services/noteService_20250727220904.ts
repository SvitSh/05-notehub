// src/api/noteService.ts
import axios, { AxiosResponse } from "axios";
import { Note, NoteTag } from "../types/note";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  total: number;
  totalPages: number;
  page: number;
  perPage: number;
}

interface NoteDTO {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteDto {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async ({
  page,
  perPage,
  search = "",
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const res: AxiosResponse<{
    results: NoteDTO[];
    total: number;
    page: number;
    perPage: number;
  }> = await api.get("/notes", {
    params: { page, perPage, search },
  });

  const { results, total } = res.data;
  const totalPages = Math.ceil(total / perPage);

  const notes: Note[] = results.map((n) => ({
    ...n,
    id: Number(n.id),
  }));

  return {
    notes,
    total,
    page,
    perPage,
    totalPages,
  };
};

export const createNote = async (body: CreateNoteDto): Promise<Note> => {
  const res: AxiosResponse<NoteDTO> = await api.post("/notes", body);
  const dto = res.data;
  return { ...dto, id: Number(dto.id) };
};

export const deleteNote = async (id: number): Promise<Note> => {
  const res: AxiosResponse<NoteDTO> = await api.delete(`/notes/${id}`);
  const dto = res.data;
  return { ...dto, id: Number(dto.id) };
};
