import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../api/noteService";
import styles from "./NoteList.module.css";

export const NoteList: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (isError) return <p>Сталася помилка при завантаженні нотаток.</p>;
  if (!data || data.length === 0) return <p>Нотаток поки немає.</p>;

  return (
    <ul className={styles.noteList}>
      {data.map((note) => (
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
%