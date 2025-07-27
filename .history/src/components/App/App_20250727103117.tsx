import { useState } from "react";
import styles from "./App.module.css";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { Note } from "../../types/note";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <button className={styles.button} onClick={handleAddNote}>
        Add Note
      </button>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onClose={handleCloseModal} onSubmit={handleSubmitNote} />
        </Modal>
      )}
    </div>
  );
};

export default App;
