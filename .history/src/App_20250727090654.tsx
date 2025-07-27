// src/App.tsx
import css from "./components/App/App.module.css";
import NoteList from "./components/NoteList/NoteList";
import SearchBox from "./components/SearchBox/SearchBox";
import Pagination from "./components/Pagination/Pagination";

function App() {
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Пошук */}
        <SearchBox />

        {/* Пагінація */}
        <Pagination />

        {/* Кнопка створення нотатки (додамо пізніше) */}
        <button className={css.button}>Create note +</button>
      </header>

      {/* Список нотатків */}
      <NoteList />
    </div>
  );
}

export default App;
