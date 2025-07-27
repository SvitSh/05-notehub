import { useQuery } from "react-query";
import { fetchNotes } from "../../api/noteService";
import { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  page: number;
  search: string;
}

function NoteList({ page, search }: NoteListProps) {
  const { data, isLoading, isError } = useQuery(["notes", page, search], () =>
    fetchNotes(page, search)
  );

  if (isLoading) return <p>Loading notes...</p>;
  if (isError) return <p>Error loading notes.</p>;
  if (!data || data.notes.length === 0) return null;

  return (
    <ul className={css.list}>
      {data.notes.map((note: Note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.button}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
