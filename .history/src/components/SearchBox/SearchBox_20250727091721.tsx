// src/components/SearchBox/SearchBox.tsx
import { ChangeEvent, useEffect, useState } from "react";
import css from "./SearchBox.module.css";

export interface SearchBoxProps {
  value: string;
  onChange: (v: string) => void;
}

const SearchBox = ({ value, onChange }: SearchBoxProps) => {
  const [local, setLocal] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => onChange(local), 400); // debounce 400ms
    return () => clearTimeout(id);
  }, [local, onChange]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocal(e.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={local}
      onChange={handleChange}
    />
  );
};

export default SearchBox;
