import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_API_TOKEN;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
};

export const fetchNotes = async (page = 1, search = "") => {
  const response = await axios.get(`${BASE_URL}/notes`, {
    params: { page, search },
    headers,
  });
  return response.data;
};

export const createNote = async (note: { title: string; text: string }) => {
  const response = await axios.post(`${BASE_URL}/notes`, note, { headers });
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await axios.delete(`${BASE_URL}/notes/${id}`, { headers });
  return response.data;
};
