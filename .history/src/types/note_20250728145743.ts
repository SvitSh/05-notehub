// src/types/note.ts

export interface Note {
  id: number;
  title: string;
  text: string;
  tag: "Todo" | "InProgress" | "Done";
  createdAt: string;
  updatedAt: string;
}

export interface NoteResponse {
  data: Note[];
  totalPages: number;
}
