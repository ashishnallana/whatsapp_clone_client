import React, { useState } from "react";
import { useEffect } from "react";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { logOut } from "../Firebase";

function Navbar({ uid, setnewChat }) {
  const [displayName, setdisplayName] = useState(null);
  const [displayPicture, setdisplayPicture] = useState(null);
  const [dropDown, setdropDown] = useState(false);

  const getUserDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/${uid}`
      );
      if (!response.ok) {
        throw new Error("Some error ooccured!");
      }
      const UserData = await response.json();
      // console.log(UserData);
      setdisplayName(UserData.displayName);
      setdisplayPicture(UserData.displayPicture);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="text-gray-500 bg-[#202c33] flex justify-between px-5 py-3 h-[70px] items-center">
      {displayPicture && (
        <div
          title={displayName}
          style={{
            backgroundImage: `url(${displayPicture})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="h-[40px] w-[40px] rounded-full"
        ></div>
      )}
      <div className="flex space-x-3">
        <div className="rounded-full h-[40px] w-[40px] flex items-center justify-center hover:text-white hover:bg-gray-700">
          <DonutLargeIcon />
        </div>
        <div
          onClick={() => setnewChat(true)}
          className="rounded-full h-[40px] w-[40px] flex items-center justify-center hover:text-white hover:bg-gray-700"
        >
          <ChatIcon />
        </div>
        <div
          onClick={() => (dropDown ? setdropDown(false) : setdropDown(true))}
          className="rounded-full h-[40px] w-[40px] flex items-center justify-center hover:text-white hover:bg-gray-700"
        >
          <MoreVertIcon />
        </div>
        {/* dropdown */}
        {dropDown && (
          <div className="flex flex-col bg-[#233138] py-2 rounded text-gray-400 absolute translate-x-[100%] top-[50px] space-y-2 px-2">
            <button onClick={logOut}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
