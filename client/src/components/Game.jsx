export default function Game({ game }) {
  if (game == null) {
    return (
      <div>
        <p>..loading</p>
      </div>
    );
  }
  return (
    <div>
      <h3>
        {game.id}. {game.game}
      </h3>
      <p>{game.dev}</p>
    </div>
  );
}
