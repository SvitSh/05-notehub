import axios from "axios";
import type { Note, NoteTag } from "../types/note";

// Extract base API URL and user-specific token from environment variables.  These
// values should be defined in a `.env` file at the project root.  See
// `/notehub/05-notehub/.env` for an example.  Never commit your token to
// version control.
const BASE_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

/**
 * Shape of the paginated list response returned by the backend.  The API
 * returns an object containing an array of notes and the total number of
 * available pages.  See the Swagger documentation for details:
 * https://notehub-public.goit.study/api/docs/#/Notes/getNotes
 */
export interface FetchNotesResponse {
  /** The notes for the current page */
  notes: Note[];
  /** Total number of pages available */
  totalPages: number;
}

/**
 * Parameters used when requesting a paginated list of notes.  All fields
 * correspond directly to query string parameters supported by the API.  The
 * `search` field may be omitted or left empty to fetch all notes without
 * filtering.
 */
export interface FetchNotesParams {
  /** Page number (1‑based) */
  page: number;
  /** Number of notes to return per page */
  perPage: number;
  /** Optional text to search by title or content */
  search?: string;
  /** Optional tag filter (not used in the current UI but supported by the API) */
  tag?: NoteTag;
  /** Optional sort field; accepts "created" or "updated" */
  sortBy?: "created" | "updated";
}

/**
 * Request a paginated list of notes from the backend.  Supports optional
 * filtering by search keyword, tag or sort field.  Only non-empty optional
 * parameters are sent to the server to avoid invalid requests (the API will
 * return a 400 error if it receives unexpected values).
 *
 * @param params Query parameters for pagination and filtering
 * @returns The list of notes and pagination metadata
 */
export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const { page, perPage, search, tag, sortBy } = params;
  // Build query parameters, omitting undefined or empty values.  Using
  // conditional spreading prevents sending keys with empty strings which the
  // backend treats as invalid.
  const query: Record<string, string | number> = {
    page,
    perPage,
  };
  if (search && search.trim().length > 0) {
    query.search = search.trim();
  }
  if (tag) {
    query.tag = tag;
  }
  if (sortBy) {
    query.sortBy = sortBy;
  }
  const response = await axios.get<FetchNotesResponse>(`${BASE_URL}/notes`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    params: query,
  });
  return response.data;
};

/**
 * Payload used when creating a new note.  Matches the fields required by the
 * backend.  See the NoteTag type for the list of allowed tag values.
 */
export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

/**
 * Create a new note on the server.  Returns the created note including its
 * assigned ID and timestamps.
 *
 * @param note The note data to create
 * @returns The newly created note
 */
export const createNote = async (note: CreateNotePayload): Promise<Note> => {
  const response = await axios.post<Note>(`${BASE_URL}/notes`, note, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};

/**
 * Delete a note by its identifier.  The API returns the deleted note in
 * the response body so that clients can update their state accordingly.
 *
 * @param id The ID of the note to delete
 * @returns The deleted note
 */
export const deleteNote = async (id: number): Promise<Note> => {
  const response = await axios.delete<Note>(`${BASE_URL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};
