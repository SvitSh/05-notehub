import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../api/noteService";
import { Note } from "../../types/note";
import styles from "./NoteList.module.css";

export const NoteList = () => {
  const {
    data: notes,
    isLoading,
    isError,
  } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <ul className={styles.list}>
      {notes?.map((note) => (
        <li key={note.id} className={styles.item}>
          <h3>{note.title}</h3>
          <p>{note.text}</p>
        </li>
      ))}
    </ul>
  );
};
