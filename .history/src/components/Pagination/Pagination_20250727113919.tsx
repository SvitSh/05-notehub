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
  return (
    <ReactPaginate
      className={css.pagination}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      forcePage={currentPage - 1}
      pageCount={pageCount}
      onPageChange={(e) => onPageChange(e.selected + 1)}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
    />
  );
};

export default Pagination;
