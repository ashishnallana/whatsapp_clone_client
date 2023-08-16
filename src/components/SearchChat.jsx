import React, { useState } from "react";
import { useStateValue } from "../StateProvider";
import Chat from "./Chat";
import { motion, AnimatePresence } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Message from "./Message";

function SearchChat({ isOpen, onClose }) {
  const [{ uid, chatId }, dispatch] = useStateValue();
  const [msg, setmsg] = useState("");
  const [messages, setmessages] = useState([]);

  const searchMsgs = async (e) => {
    // e.preventDefault();
    setmsg(e.target.value);
    await fetch(`${process.env.REACT_APP_BASE_URL}/searchMessages`, {
      method: "POST",
      body: JSON.stringify({
        uid,
        chatId,
        message: msg,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.messages);
        setmessages(data.messages);
        console.log(messages);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "200%" }}
          animate={{ x: 0 }}
          exit={{ x: "200%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "400px",
            height: "100%",
            background: "#f0f0f0",
            boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div className="w-[400px] bg-[#1c1e21] h-[100vh] flex flex-col border-l-2 border-gray-700">
            <div className="flex bg-[#202c33] h-[70px] items-center pl-3">
              <div className="flex items-center space-x-5 text-gray-400">
                <CloseIcon fontSize="medium" onClick={() => onClose(false)} />
                <h2 className="text-lg">Search Messages</h2>
              </div>
            </div>
            {/* input */}
            <form
              method="get"
              className="flex space-x-5 bg-[#202c33] my-3 mx-5 p-3 rounded-lg text-gray-400 items-center"
              //   onSubmit={searchMsgs}
            >
              <SearchIcon />
              <input
                type="text"
                placeholder="Search..."
                value={msg}
                onChange={(e) => {
                  // searchPeople(e);
                  searchMsgs(e);
                  //   setmsg(e.target.value);
                }}
                className="outline-none bg-transparent text-white"
              />
            </form>

            {/* messages */}

            <div className="flex flex-col pl-4 overflow-y-scroll">
              {messages.map((e, i) => (
                <Message
                  key={i}
                  details={e}
                  userMsg={uid == e.fromUid ? true : false}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SearchChat;
