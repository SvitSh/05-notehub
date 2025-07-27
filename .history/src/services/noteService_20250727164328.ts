// src/services/noteService.ts
import axios, { AxiosResponse } from "axios";
import { Note, NoteTag } from "../types/note";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

/**
 * ---- Типи ТІЛЬКИ для сервісу ----
 */
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
  id: string; // сервер повертає string
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

/**
 * ---- READ ----
 */
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

  // бекенд goit повертає також meta, але в поточному прикладі беремо з того що є
  const totalPages = Math.ceil(total / perPage);

  const notes: Note[] = results.map((n) => ({
    ...n,
    id: Number(n.id), // ⬅️ приводимо до number, бо ТЗ так вимагає
  }));

  return {
    notes,
    total,
    page,
    perPage,
    totalPages,
  };
};

/**
 * ---- CREATE ----
 */
export const createNote = async (body: CreateNoteDto): Promise<Note> => {
  const res: AxiosResponse<NoteDTO> = await api.post("/notes", body);
  const dto = res.data;
  return { ...dto, id: Number(dto.id) };
};

/**
 * ---- DELETE ----
 */
export const deleteNote = async (id: number): Promise<Note> => {
  const res: AxiosResponse<NoteDTO> = await api.delete(`/notes/${id}`);
  const dto = res.data;
  return { ...dto, id: Number(dto.id) };
};
