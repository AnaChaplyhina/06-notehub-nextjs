import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  totalPages: number;
  currentPage: number; 
  onPageChange: (page: number) => void;
}

const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }


  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={totalPages}
      forcePage={currentPage - 1} 
      renderOnZeroPageCount={null}
      
      containerClassName={css.pagination}
      pageLinkClassName={css.pageLink}
      activeClassName={css.active}
      disabledClassName={css.disabled}
      previousClassName={css.previous}
      nextClassName={css.next}
    />
  );
};

export default Pagination;