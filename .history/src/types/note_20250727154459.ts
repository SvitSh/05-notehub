export interface Note {
  id: number;
  title: string;
  content: string;
  updatedAt: string;
}

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export type NoteTag = "personal" | "work" | "other"; // если используешь теги
