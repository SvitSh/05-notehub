import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styles from "./App.module.css";
import { Note } from "../../types/note";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

const queryClient = new QueryClient();

function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePageChange = (newPage: number) => setPage(newPage);
  const handleSearch = (value: string) => setSearch(value);
  const handleModalToggle = () => setIsModalOpen((prev) => !prev);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.container}>
        <h1 className={styles.title}>NoteHub</h1>
        <button className={styles.button} onClick={handleModalToggle}>
          Add note
        </button>
        <SearchBox value={search} onSearch={handleSearch} />
        <NoteList page={page} search={search} />
        <Pagination
          currentPage={page}
          onPageChange={handlePageChange}
          pageCount={10}
        />
        {isModalOpen && (
          <Modal onClose={handleModalToggle}>
            <NoteForm onClose={handleModalToggle} />
          </Modal>
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;
