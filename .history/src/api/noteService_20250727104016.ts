import axios from "axios";
import { Note } from "../types/note";

export const fetchNotes = async ({
  queryKey,
}: {
  queryKey: [string, number, string];
}) => {
  const [_key, page, search] = queryKey;

  const response = await axios.get<Note[]>("/api/notes", {
    params: { page, search },
  });

  return response.data;
};
