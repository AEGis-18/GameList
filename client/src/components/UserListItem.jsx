import ListItemInfo from "./ListItemInfo";

export default function UserListItem({ userList, userGames }) {
  return (
    <>
      {userList.map((item) => {
        const gameInfo = userGames[item.game];
        console.log("elemento", gameInfo ? gameInfo[0] : "");
        return (
          <div key={item.id}>
            <ListItemInfo
              listItem={item}
              gameInfo={gameInfo ? gameInfo[0] : ""}
            ></ListItemInfo>
          </div>
        );
      })}
    </>
  );
}
