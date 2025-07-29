// src/services/noteService.ts

import axios from "axios";
import { Note, NoteResponse } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";

export const fetchNotes = async (
  page: number,
  search: string,
  perPage: number
): Promise<NoteResponse> => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    perPage: perPage.toString(),
  });

  if (search) {
    queryParams.append("search", search);
  }

  const response = await axios.get<NoteResponse>(
    `${BASE_URL}/notes?${queryParams}`
  );
  return response.data;
};
