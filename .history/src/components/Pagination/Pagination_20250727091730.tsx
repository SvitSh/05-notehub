// src/components/Pagination/Pagination.tsx
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

export interface PaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  pageCount,
  onPageChange,
}: PaginationProps) => {
  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      className={css.pagination}
      pageClassName={css.page}
      activeClassName={css.active}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onPageChange(e.selected + 1)}
      forcePage={currentPage - 1}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={pageCount}
    />
  );
};

export default Pagination;
