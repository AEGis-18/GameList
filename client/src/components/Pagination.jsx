export default function Pagination({
  gamesPerPage,
  totalGames,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalGames / gamesPerPage);
  const MAX_BUTTONS = 3;

  let startPage = currentPage - Math.floor(MAX_BUTTONS / 2);
  let endPage = currentPage + Math.floor(MAX_BUTTONS / 2);

  if (startPage < 1) {
    startPage = 1;
    endPage = MAX_BUTTONS;
  }

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = totalPages - MAX_BUTTONS + 1;
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt; -
          </button>
        </li>

        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              disabled={currentPage === totalPages}
              style={{
                color: currentPage === number ? "#FF6347" : "#202020",
              }}
            >
              {number}
            </button>
          </li>
        ))}

        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            - &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
}
