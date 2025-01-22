export default function Pagination({
  gamesPerPage,
  totalGames,
  paginate,
  currentPage,
}) {
  if (totalGames <= 30) {
    return <nav></nav>;
  }

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
    <nav className="flex justify-center pt-4 pb-8">
      <ul className="flex gap-1">
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={` text-black rounded-sm px-1 font-bold ${
              currentPage === 1 ? "bg-gray-400" : "bg-white"
            }`}
          >
            &#x2190;
          </button>
        </li>

        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={` rounded-sm px-1 font-bold ${
                currentPage === number
                  ? "bg-blue-400 text-white"
                  : "text-black bg-white"
              }`}
            >
              {number}
            </button>
          </li>
        ))}

        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={` text-black rounded-sm px-1 font-bold ${
              currentPage === totalPages ? "bg-gray-200" : "bg-white"
            }`}
          >
            &#x2192;
          </button>
        </li>
      </ul>
    </nav>
  );
}
