import Game from "./Game";

export default function ListItemInfo({ listItem, gameInfo }) {
  if (!gameInfo) {
    return <p>loading...</p>;
  }

  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  return (
    <div className="flex flex-col h-full">
      <Game game={gameInfo} loading={false}></Game>

      <div className="text-2xl mt-auto ">
        {" "}
        <h3>
          <strong>State: </strong>
          {capitalize(listItem.game_state)}
        </h3>
        <p>
          <strong>Game score: </strong>
          {listItem.score ? listItem.score : " --"}/10
        </p>
        <p>
          <strong>Played time: </strong>
          {listItem.played_time ? listItem.played_time : " -- "} hs
        </p>
      </div>
    </div>
  );
}
