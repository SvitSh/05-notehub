import React, { useState } from "react";
import styles from "./App.module.css";
import NoteForm from "../NoteForm/NoteForm";
import Modal from "../Modal/Modal";
import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import { Note } from "../../types/note";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const totalPages = 10; // временно, потом будет с сервера

  const handleAddNote = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitNote = (note: Note) => {
    console.log("Submitted note:", note);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>NoteHub</h1>
      <SearchBox value={search} onSearch={setSearch} />
      <button className={styles.button} onClick={handleAddNote}>
        Add Note
      </button>
      <NoteList search={search} page={page} />
      <Pagination
        currentPage={page}
        onPageChange={setPage}
        pageCount={totalPages}
      />
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} onSubmit={handleSubmitNote} />
        </Modal>
      )}
    </div>
  );
};

export default App;
