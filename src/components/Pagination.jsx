// Shows a small window of page numbers around the current page,
// e.g. [Prev] 3 4 [5] 6 7 [Next]
function getPageNumbers(current, total, size = 5) {
  let start = Math.max(1, current - Math.floor(size / 2));
  let end = Math.min(total, start + size - 1);
  start = Math.max(1, end - size + 1);

  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
}

export default function Pagination({ page, totalPages, onPageChange }) {
  const pages = getPageNumbers(page, totalPages);

  const baseBtn =
    "h-10 min-w-9 px-2 text-sm font-semibold sm:min-w-10 sm:px-3 transition disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <nav aria-label="Gallery pages" className="flex items-center gap-4">
      <ul className="flex overflow-hidden rounded-lg">
        <li>
          <button
            className={`${baseBtn} bg-amber-400 hover:bg-amber-500`}
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
        </li>

        {pages.map((num) => (
          <li key={num}>
            <button
              className={`${baseBtn} ${
                num === page
                  ? "bg-gray-900 text-amber-400"
                  : "bg-amber-400 hover:bg-amber-500"
              }`}
              onClick={() => onPageChange(num)}
              aria-current={num === page ? "page" : undefined}
            >
              {num}
            </button>
          </li>
        ))}

        <li>
          <button
            className={`${baseBtn} bg-amber-400 hover:bg-amber-500`}
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </li>
      </ul>

      <p className="hidden text-lg font-semibold text-white sm:block">
        Page {page} / {totalPages}
      </p>
    </nav>
  );
}
