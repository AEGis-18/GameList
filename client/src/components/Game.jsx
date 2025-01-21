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
      <h2 className="font-bold text-center">{game.game}</h2>
      <h3>
        <strong>Release year: </strong>
        {game.year}
      </h3>

      <p>
        <strong>Developed by: </strong>
        {game.dev}
      </p>
      <p>
        <strong>Published by:</strong> {game.publisher}
      </p>
      <p>
        <strong>Platform:</strong> {game.platform}
      </p>
    </div>
  );
}
