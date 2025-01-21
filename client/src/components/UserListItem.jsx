import ListItemInfo from "./ListItemInfo";

export default function UserListItem({ userList, userGames }) {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4 px-4">User Games</h1>
      {console.log("usergames: ", userGames)}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        {userList.map((item) => {
          const gameInfo = userGames.find((game) => game[0].id === item.game);
          console.log("elemento", gameInfo ? gameInfo[0] : "");
          return (
            <div
              key={item.id}
              className="border p-4 text-start bg-gray-700 rounded flex flex-col h-full"
            >
              <ListItemInfo
                listItem={item}
                gameInfo={gameInfo ? gameInfo[0] : ""}
              ></ListItemInfo>
            </div>
          );
        })}
      </div>
    </>
  );
}
