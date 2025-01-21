import Game from "./Game";
import AddButton from "./AddButton";

export default function ListGames({ gamesList, loading }) {
  if (loading) {
    return <h3>loading ...</h3>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 px-4">Game Catalog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {gamesList.map((game) => (
          <div
            key={game.id}
            className="border p-4 text-start bg-gray-700 rounded flex flex-col h-full"
          >
            <Game game={game} />
            <div className="mt-auto">
              <AddButton game_id={game.id} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
