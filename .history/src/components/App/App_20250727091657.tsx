// src/App.tsx
import { useState } from "react";
import css from "./components/App/App.module.css";
import NoteList from "./components/NoteList/NoteList";
import SearchBox from "./components/SearchBox/SearchBox";
import Pagination from "./components/Pagination/Pagination";

function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={setSearch} />
        <Pagination currentPage={page} pageCount={10} onPageChange={setPage} />
        <button className={css.button}>Create note +</button>
      </header>

      <NoteList page={page} search={search} />
    </div>
  );
}

export default App;
