import { useState } from "react";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import css from "./App.module.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onSearch={setSearch} />
        <Pagination currentPage={page} onPageChange={setPage} />
        <button className={css.button} onClick={() => setIsOpen(true)}>
          Create note +
        </button>
      </header>

      <NoteList page={page} search={search} />

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm onSuccess={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default App;
