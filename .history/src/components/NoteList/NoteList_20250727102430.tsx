import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../api/noteService";
import { Note } from "../../types/note";
import styles from "./NoteList.module.css";

interface Props {
  page: number;
  search: string;
}

const NoteList = ({ page, search }: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
  });

  if (isLoading) return <p className={styles.status}>Loading...</p>;
  if (isError) return <p className={styles.status}>Error loading notes.</p>;

  return (
    <ul className={styles.list}>
      {data?.notes.map((note: Note) => (
        <li key={note.id} className={styles.item}>
          <h3 className={styles.title}>{note.title}</h3>
          <p className={styles.content}>{note.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
