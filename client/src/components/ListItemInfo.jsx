import Game from "./Game";

export default function ListItemInfo({ listItem, gameInfo }) {
  if (!gameInfo) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <Game game={gameInfo} loading={false}></Game>
      <h2>Id: {listItem.id}</h2>
      <h2>User:{listItem.user}</h2>
      <h3>State: {listItem.game_state}</h3>
      <p>Game score:{listItem.score ? listItem.score : " --"}/10</p>
      <p>
        Played time:{listItem.played_time ? listItem.played_time : " -- "} hs
      </p>
    </div>
  );
}
