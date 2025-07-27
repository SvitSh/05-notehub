// src/components/App/App.tsx
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import css from "./App.module.css";

import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

const PER_PAGE = 12;

const queryClient = new QueryClient();

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);

  const [page, setPage] = useState(1);

  const handleCreateClick = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={search} onSearch={setSearch} />

          {/* Пагінацію рендеримо нижче, коли знатимемо totalPages, 
              але в ТЗ казано в хедері — залишаємо тут контейнер */}
          {/* Сам компонент Pagination рендеримо в NoteList через render-prop */}
          <button className={css.button} onClick={handleCreateClick}>
            Create note +
          </button>
        </header>

        <NoteList
          page={page}
          perPage={PER_PAGE}
          search={debouncedSearch}
          onTotalPages={(tp) => {
            // якщо після пошуку сторінок стало менше — повернемося на першу
            if (page > tp) setPage(1);
          }}
          renderPagination={(pageCount) =>
            pageCount > 1 ? (
              <Pagination
                currentPage={page}
                pageCount={pageCount}
                onPageChange={setPage}
              />
            ) : null
          }
        />

        {isOpen && (
          <Modal onClose={handleClose}>
            <NoteForm onClose={handleClose} />
          </Modal>
        )}
      </div>
    </QueryClientProvider>
  );
};

export default App;
