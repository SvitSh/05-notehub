// src/components/NoteList.tsx
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../api/noteService";
import { Note } from "../../types/note";
import styles from "./NoteList.module.css";

interface NoteListProps {
  search: string;
  page: number;
}

export const NoteList = ({ search, page }: NoteListProps) => {
  const { data, isLoading, isError } = useQuery<Note[], Error>({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes({ page, search }),
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (isError) return <p>Помилка при завантаженні нотаток.</p>;

  if (!data || data.length === 0) {
    return <p>Нотаток не знайдено.</p>;
  }

  return (
    <ul className={styles.list}>
      {data.map((note) => (
        <li key={note.id} className={styles.item}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <small>{new Date(note.createdAt).toLocaleString()}</small>
        </li>
      ))}
    </ul>
  );
};
