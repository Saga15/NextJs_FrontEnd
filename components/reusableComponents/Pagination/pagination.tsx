import React from 'react';
import PaginationComponent from 'react-js-pagination';

// Define the default values for pagination
const defaults = {
  activePage: 1,
  itemsPerPage: 10,
  totalItems: 10,
};

// Define the interface for the props of the Pagination component
interface PaginationProps {
  containerClass?: string;
  activePage?: number;
  itemsPerPage?: number;
  totalItems?: number;
  onPageChange?: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  containerClass,
  activePage = defaults.activePage,
  itemsPerPage = defaults.itemsPerPage,
  totalItems = defaults.totalItems,
  onPageChange,
}) => {
  return (
      <nav className={containerClass}>
        <PaginationComponent
          activePage={activePage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={totalItems}
          onChange={(changedPage: number) => {
            if (onPageChange) onPageChange(changedPage);
          }}
          itemClass="page-item"
          linkClass="page-link"
          hideFirstLastPages
          hideDisabled
        />
      </nav>
  );
};

export default Pagination;
