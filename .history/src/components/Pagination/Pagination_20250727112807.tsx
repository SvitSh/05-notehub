import React from "react";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  pageCount: number;
}

const Pagination = ({
  currentPage,
  onPageChange,
  pageCount,
}: PaginationProps) => {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      {pages.map((page) => (
        <button
          key={page}
          className={`${styles.pageButton} ${
            page === currentPage ? styles.active : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
