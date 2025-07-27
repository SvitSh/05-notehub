import axios from "axios";
import { FetchNotesParams, FetchNotesResponse } from "../types/note";

export const fetchNotes = async ({
  page,
  perPage,
  search,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(`/api/notes`, {
    params: { page, perPage, search },
  });
  return response.data;
};
