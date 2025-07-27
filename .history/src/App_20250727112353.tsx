// src/App.tsx
import { useState } from "react";
import styles from "./app/App.module.css";
import Modal from "./Modal/Modal";
import NoteForm from "./NoteForm/NoteForm";
import { Note } from "./types/note";
import { NoteList } from "./NoteList/NoteList";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const handleAddNote = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitNote = (note: Note) => {
    // 🚧 ТУТ ДОЛЖЕН БЫТЬ axios.post — пока временно просто лог
    console.log("Submitted note:", note);
    setIsModalOpen(false);
    // В будущем: invalidate queries и обновить список
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>NoteHub</h1>
      <button className={styles.button} onClick={handleAddNote}>
        Добавить примечание
      </button>

      <NoteList search={search} page={page} />

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} onSubmit={handleSubmitNote} />
        </Modal>
      )}
    </div>
  );
};

export default App;
