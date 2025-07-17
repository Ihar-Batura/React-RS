'use client';

import styles from './Pagination.module.scss';
import { useTheme } from '../../../shared/hooks/useTheme';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const { theme } = useTheme();

  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

  const getPages = () => {
    const delta = 2;
    const pagesToShow = [];

    for (
      let i = Math.max(2, safeCurrentPage - delta);
      i <= Math.min(totalPages - 1, safeCurrentPage + delta);
      i += 1
    ) {
      pagesToShow.push(i);
    }

    const showFirstEllipsis = safeCurrentPage - delta > 2;
    const showLastEllipsis = safeCurrentPage + delta < totalPages - 1;

    const result = [];

    result.push(1);

    if (showFirstEllipsis) {
      result.push('...');
    }

    result.push(...pagesToShow);

    if (showLastEllipsis) {
      result.push('...');
    }

    if (totalPages > 1) {
      result.push(totalPages);
    }

    return result;
  };

  const pages = getPages();

  if (totalPages <= 1) return null;

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      {pages.map((page, index) => (
        <div key={index + pages.length}>
          {typeof page === 'number' ? (
            <button
              onClick={() => onPageChange(page)}
              disabled={page === safeCurrentPage}
              className={
                page === safeCurrentPage
                  ? `${styles.page} ${styles.active}`
                  : styles.page
              }
            >
              {page}
            </button>
          ) : (
            <span className={styles.ellipsis}>{page}</span>
          )}
        </div>
      ))}
    </div>
  );
};
