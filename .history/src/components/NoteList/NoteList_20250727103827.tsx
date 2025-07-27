import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../api/noteService";
import styles from "./NoteList.module.css";

export const NoteList: React.FC = () => {
  const { data, isLoading, isError } = useQuery(["notes"], fetchNotes);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notes</p>;

  // Якщо даних немає
  if (!data || !Array.isArray(data)) return <p>No notes found.</p>;

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
