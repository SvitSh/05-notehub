import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../api/noteService";
import { Note } from "../../types/note";

import styles from "./NoteList.module.css";

const NoteList = () => {
  const page = 1;
  const search = "";

  const {
    data: notes = [],
    isLoading,
    isError,
  } = useQuery<Note[]>({
    queryKey: ["notes", page, search],
    queryFn: fetchNotes,
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (isError) return <p>Помилка при завантаженні нотаток</p>;
  if (notes.length === 0) return <p>Нотаток не знайдено</p>;

  return (
    <ul className={styles.noteList}>
      {notes.map((note) => (
        <li key={note.id} className={styles.noteItem}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <small>{note.createdAt}</small>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
