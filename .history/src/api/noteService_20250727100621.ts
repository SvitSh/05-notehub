import axios from "axios";
import { Note, NotePayload } from "../types/note";

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchNotes = async (page: number, search: string) => {
  const response = await axios.get(`${BASE_URL}/notes`, {
    params: { page, search },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
  });
  return response.data;
};

export const createNote = async (data: NotePayload) => {
  const response = await axios.post(`${BASE_URL}/notes`, data, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
  });
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await axios.delete(`${BASE_URL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
  });
  return response.data;
};
