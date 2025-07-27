// src/api/noteService.ts
import axios from "axios";
import { Note, FetchNotesResponse } from "../types/note";

const BASE_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
};

export const fetchNotes = async (
  page = 1,
  search = ""
): Promise<FetchNotesResponse> => {
  const response = await axios.get(`${BASE_URL}/notes`, {
    headers,
    params: { page, perPage: 12, search },
  });
  return response.data;
};

export const createNote = async (
  note: Omit<Note, "_id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  const response = await axios.post(`${BASE_URL}/notes`, note, { headers });
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axios.delete(`${BASE_URL}/notes/${id}`, { headers });
  return response.data;
};
