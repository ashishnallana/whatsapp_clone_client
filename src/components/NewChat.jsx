import React, { useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SearchIcon from "@mui/icons-material/Search";
import { useStateValue } from "../StateProvider";
import Chat from "./Chat";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function NewChat({ isOpen, onClose }) {
  const [email, setemail] = useState("");
  const [people, setpeople] = useState(null);
  const [{ uid }, dispatch] = useStateValue();
  const [friends, setfriends] = useState([]);

  const searchPeople = async (e) => {
    // e.preventDefault();

    try {
      setemail(e.target.value);

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/search/${email}`
      );
      if (!response.ok) {
        throw new Error("Some error ooccured!");
      }
      const data = await response.json();
      setpeople(data.people);
      // console.log(data.people);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getFriends = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/friends/${uid}`
      );
      if (!response.ok) {
        throw new Error("Some error ooccured!");
      }
      const data = await response.json();
      console.log(data.friends);
      setfriends(data.friends);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getFriends();
  }, [uid]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "300px",
            height: "100%",
            background: "#f0f0f0",
            boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div className="w-[400px] bg-[#1c1e21] h-[100vh]">
            <div className="flex items-end bg-[#202c33] h-[125px] pb-5 pl-3">
              <div className="flex items-center space-x-5">
                <KeyboardBackspaceIcon
                  fontSize="large"
                  onClick={() => onClose(false)}
                />
                <h2 className="text-xl">New Chat</h2>
              </div>
            </div>
            {/* input */}
            <form
              method="get"
              className="flex space-x-5 bg-[#202c33] my-3 mx-5 p-3 rounded-lg text-gray-400 items-center"
              // onSubmit={searchPeople}
              onSubmit={(e) => e.preventDefault()}
            >
              <button type="submit">
                <SearchIcon />
              </button>
              <input
                type="text"
                placeholder="Search emails"
                value={email}
                onChange={(e) => {
                  searchPeople(e);
                }}
                className="outline-none bg-transparent text-white"
              />
            </form>
            {/* chats */}
            {!people && (
              <h1 className="text-center text-gray-500">
                Search to find your friends.
              </h1>
            )}
            {people &&
              people.map((e, i) => {
                if (uid !== e.uid)
                  return (
                    <Chat
                      details={e}
                      key={i}
                      disabled={friends.includes(e.uid)}
                    />
                  );
              })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default NewChat;
