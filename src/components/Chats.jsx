import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FriendChat from "./FriendChat";

function Chats({ uid }) {
  const [friends, setfriends] = useState(null);
  const [searchName, setsearchName] = useState("");

  const getFriends = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/friends/${uid}`
      );
      if (!response.ok) {
        throw new Error("Some error occured!");
      }
      const data = await response.json();
      console.log(data.friends);
      setfriends(data.friends);
    } catch (error) {
      console.error(error.message);
    }
  };

  const searchFriends = async (e) => {
    try {
      setsearchName(e.target.value);

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/searchFriend/${uid}/${searchName}`
      );
      if (!response.ok) {
        throw new Error("Some error occured!");
      }
      const data = await response.json();
      console.log(data.friends);
      console.log(friends);
      setfriends(null);
      setfriends(data.friends);
      console.log(friends);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getFriends();
  }, [uid]);

  return (
    <div className="flex flex-col w-[400px]">
      {/* input */}
      <form
        method="get"
        className="flex space-x-5 bg-[#202c33] my-3 mx-5 p-3 rounded-lg text-gray-400 items-center"
        onSubmit={searchFriends}
      >
        <button type="submit">
          <SearchIcon />
        </button>
        <input
          type="text"
          placeholder="Search name"
          value={searchName}
          onChange={(e) => {
            searchFriends(e);
          }}
          className="outline-none bg-transparent text-white"
        />
      </form>
      {/* chats */}
      {friends && friends.map((e, i) => <FriendChat key={i} uid={e} />)}
    </div>
  );
}

export default Chats;
