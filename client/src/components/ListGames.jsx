import Game from "./Game";
import AddButton from "./AddButton";

export default function ListGames({ gamesList, loading }) {
  if (loading) {
    return <h3>loading ...</h3>;
  }

  return (
    <>
      <h1>Game Catalog</h1>
      <p>{gamesList.length}</p>
      {gamesList.map((game) => (
        <div key={game.id}>
          <Game game={game} />
          <AddButton />
        </div>
      ))}
    </>
  );
}
