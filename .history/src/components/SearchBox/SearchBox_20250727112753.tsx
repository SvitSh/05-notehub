import React from "react";
import styles from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onSearch: (value: string) => void;
}

const SearchBox = ({ value, onSearch }: SearchBoxProps) => {
  return (
    <input
      className={styles.input}
      type="text"
      placeholder="Search notes..."
      value={value}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBox;
