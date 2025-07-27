// src/components/NoteList/NoteList.tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, deleteNote } from "../../../services/noteService";
import { Note } from "../../../types/note";
import css from "./NoteList.module.css";

export interface NoteListProps {
  page: number;
  search: string;
}

const NoteList = ({ page, search }: NoteListProps) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes({ page, perPage: 12, search }),
    keepPreviousData: true,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleDelete = (id: string) => deleteMutation.mutate(id);

  if (isLoading) return <p>Loading…</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;
  if (!data || data.data.length === 0) return <p>No notes found</p>;

  return (
    <ul className={css.list}>
      {data.data.map((note: Note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              onClick={() => handleDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
