export default function Game({ game }) {
  return (
    <div>
      <h3>
        {game.id}. {game.game}
      </h3>
      <p>{game.dev}</p>
    </div>
  );
}
