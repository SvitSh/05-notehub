// src/types/note.ts

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: number; // ідентифікатор запису
  title: string; // заголовок нотатки
  content: string; // вміст нотатки
  tag: NoteTag; // тег
  createdAt: string; // дата створення
  updatedAt: string; // дата оновлення
}
