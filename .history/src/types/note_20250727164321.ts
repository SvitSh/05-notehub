// src/types/note.ts
export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: number; // ⬅️ за вимогою перевірки
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string; // ⬅️ за вимогою перевірки
}
