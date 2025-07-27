import { useState } from "react";
import styles from "./App.module.css";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { Note } from "../../types/note";
import { NoteList } from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

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
    console.log("Submitted note:", note); // ❗ временно
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>NoteHub</h1>
      <button className={styles.button} onClick={handleAddNote}>
        Add Note
      </button>

      <SearchBox onSearch={setSearch} />
      <NoteList search={search} page={page} />
      <Pagination currentPage={page} onPageChange={setPage} />

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} onSubmit={handleSubmitNote} />
        </Modal>
      )}
    </div>
  );
};

export default App;
