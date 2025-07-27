import React from "react";
import { useQuery } from "react-query";
import { fetchNotes } from "../../services/noteService";

function NoteList() {
  const { data, isLoading } = useQuery("notes", fetchNotes);

  if (isLoading) return <p>Загрузка...</p>;

  return (
    <ul>
      {data?.map((note: any) => (
        <li key={note.id}>{note.title}</li>
      ))}
    </ul>
  );
}

export default NoteList;
