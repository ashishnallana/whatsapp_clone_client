import React from "react";
import { useStateValue } from "../StateProvider";
import { useNavigate } from "react-router-dom";

function Chat({ details, disabled }) {
  const [{ uid }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const addFriend = () => {
    console.log("👉⭐");
    fetch(`${process.env.REACT_APP_BASE_URL}/addContact`, {
      method: "POST",
      body: JSON.stringify({
        uid,
        friendId: details.uid,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // navigate(`/chat/${data.friendId}`);
        dispatch({
          type: "UPDATE_CHAT",
          item: details.uid,
        });
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div
      className={
        disabled
          ? "flex space-x-5 p-2 items-center cursor-pointer opacity-50"
          : "flex space-x-5 p-2 items-center cursor-pointer"
      }
      onClick={!disabled ? addFriend : () => console.log("already a friend")}
    >
      <div
        title={details.name}
        style={{
          backgroundImage: `url(${details.displayPicture})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="h-[40px] w-[40px] rounded-full"
      ></div>
      <div className="flex flex-col flex-1 border-b border-gray-700 pb-3">
        <h1 className="text-lg">{details.name}</h1>
        <p className="text-sm text-gray-500">Hey there! I am using whatsapp.</p>
      </div>
    </div>
  );
}

export default Chat;
