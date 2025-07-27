// src/components/NoteList/NoteList.tsx
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { fetchNotes, deleteNote } from "../../api/noteService";
import { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  page: number;
  perPage: number;
  search?: string;
  onTotalPages: (pages: number) => void;
  renderPagination: (pageCount: number) => React.ReactNode;
}

const NoteList = ({
  page,
  perPage,
  search = "",
  onTotalPages,
  renderPagination,
}: NoteListProps) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, perPage, search],
    queryFn: () => fetchNotes({ page, perPage, search }),
    placeholderData: keepPreviousData,
  });

  const { mutate: remove } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (isError || !data) return <p>Помилка при отриманні нотаток.</p>;

  const { notes, totalPages } = data;
  onTotalPages(totalPages);

  if (!notes.length) return <p>Нічого не знайдено.</p>;

  return (
    <>
      {renderPagination(totalPages)}

      <ul className={css.list}>
        {notes.map((note: Note) => (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <button className={css.button} onClick={() => remove(note.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {renderPagination(totalPages)}
    </>
  );
};

export default NoteList;
