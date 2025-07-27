import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../api/noteService";
import styles from "./NoteList.module.css";

const NoteList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (error instanceof Error) return <p>Ошибка: {error.message}</p>;

  return (
    <div className={styles.noteList}>
      {data?.notes.map((note) => (
        <div key={note.id} className={styles.noteCard}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
