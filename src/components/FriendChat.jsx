import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvider";

function FriendChat({ uid }) {
  const [{ chatId }, dispatch] = useStateValue();

  const [friendInfo, setfriendInfo] = useState(null);
  const navigate = useNavigate();

  const setChat = (id) => {
    dispatch({
      type: "UPDATE_CHAT",
      item: id,
    });
  };

  const getDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/${uid}`
      );
      if (!response.ok) {
        throw new Error("Some error occured!");
      }
      const data = await response.json();
      setfriendInfo(data);
      console.log(friendInfo);
      // console.log(data);
      // setfriends(data.friends);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div>
      {friendInfo && (
        <div
          className="flex space-x-5 p-2 items-center cursor-pointer"
          onClick={() => setChat(friendInfo.uid)}
        >
          <div
            title={friendInfo.displayName}
            style={{
              backgroundImage: `url(${friendInfo.displayPicture})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="h-[40px] w-[40px] rounded-full"
          ></div>
          <div className="flex flex-col flex-1 border-b border-gray-700 pb-3">
            <h1 className="text-lg">{friendInfo.displayName}</h1>
            <p className="text-sm text-gray-500">
              Hey there! I am using whatsapp.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default FriendChat;
