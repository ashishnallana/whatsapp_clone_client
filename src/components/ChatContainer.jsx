import React, { useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import { useStateValue } from "../StateProvider";
import { useEffect } from "react";
import Message from "./Message";
import LockIcon from "@mui/icons-material/Lock";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import CircularProgress from "@mui/material/CircularProgress";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import io, { Socket } from "socket.io-client";

// Initialize socket.io-client with the server URL
const socket = io.connect(process.env.REACT_APP_BASE_URL);

function ChatContainer({ setsearchChat, setcontactTab }) {
  const [{ uid, chatId }, dispatch] = useStateValue();
  const [dropDown, setdropDown] = useState(false);
  const [msg, setmsg] = useState("");
  const [files, setfiles] = useState([]);
  const [chatDetails, setchatDetails] = useState(null);
  const [messages, setmessages] = useState([]);
  const fileInputRef = useRef(null);
  const [fileUploadingLoader, setfileUploadingLoader] = useState(false);
  // const [files, setfiles] = useState("")

  useEffect(() => {
    // Listen for incoming messages
    socket.on("message_saved", (message) => {
      console.log("msg received, 🔥🔥🔥, message");
      // Handle the incoming message, update your state, etc.
      setmessages((prevMsgs) => [...prevMsgs, message]);
    });

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      socket.off("message_saved");
    };
  }, [socket]);

  const getUserDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/${chatId}`
      );
      if (!response.ok) {
        throw new Error("Some error ooccured!");
      }
      const UserData = await response.json();
      console.log(UserData.user);
      setchatDetails(UserData.user);
    } catch (error) {
      console.error(error.message);
    }
  };

  const loadMsgs = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/messages/${uid}/${chatId}`
      );
      if (!response.ok) {
        throw new Error("Some error ooccured!");
      }
      const UserData = await response.json();
      console.log(UserData.messages);
      setmessages(UserData.messages);
    } catch (error) {
      console.error(error.message);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log("func called!!");
    // Emit the message to the server using socket
    socket.emit("chat_message", {
      content: msg,
      fromUid: uid,
      toUid: chatId,
      filesArray: files,
    });

    // Clear the input field after sending
    setmsg("");
  };

  const setMsgsToSeen = async () => {
    await fetch(`${process.env.REACT_APP_BASE_URL}/setSeen`, {
      method: "POST",
      body: JSON.stringify({
        uid,
        chatid: chatId,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // file upload
  //   * uploading images => firebase =>files
  const handleFileUpload = (event) => {
    const selectedFiles = event.target.files;

    if (selectedFiles.length > 0) {
      setfileUploadingLoader(true);
      const storageRef = firebase.storage().ref();

      const uploadPromises = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        const selectedFile = selectedFiles[i];
        const fileRef = storageRef.child(selectedFile.name);

        uploadPromises.push(fileRef.put(selectedFile));
      }

      Promise.all(uploadPromises)
        .then((snapshots) => {
          const downloadURLs = [];

          for (let i = 0; i < snapshots.length; i++) {
            const snapshot = snapshots[i];
            downloadURLs.push(snapshot.ref.getDownloadURL());
          }

          return Promise.all(downloadURLs);
        })
        .then((downloadURLs) => {
          console.log(downloadURLs);
          // setImages(downloadURLs);
          setfiles((prevItems) => [...prevItems, downloadURLs]);
          setfileUploadingLoader(false);
        })
        .catch((error) => {
          console.error("Error occurred during file upload:", error);
        });
    } else {
      console.log("No files selected. Please select one or more files!");
    }
  };

  useEffect(() => {
    getUserDetails();
    loadMsgs();
    setMsgsToSeen();
  }, [chatId]);

  return (
    // <div className="flex w-full flex-col h-full border-l-2 border-gray-700">
    <div className="w-full">
      {chatId !== null ? (
        <div className="flex w-full flex-col h-full border-l-2 border-gray-700">
          {/* header */}
          <div className="bg-[#202c33] flex justify-between w-full py-2 px-4 h-[70px] items-center">
            <div className="flex space-x-3 items-center">
              <div
                title={"username"}
                style={{
                  backgroundImage: `url(${
                    chatDetails
                      ? chatDetails.displayPicture
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  })`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                className="h-[40px] w-[40px] rounded-full "
              ></div>
              <div>
                <h1>{chatDetails && chatDetails.name}</h1>
                <p className="text-sm text-gray-500">
                  {"last seen at 11:35 AM"}
                </p>
              </div>
            </div>
            {/* right header */}
            <div className="flex space-x-3">
              <div
                onClick={() => setsearchChat(true)}
                className="rounded-full h-[40px] w-[40px] flex items-center justify-center hover:text-white hover:bg-gray-700"
              >
                <SearchIcon />
              </div>
              <div
                onClick={() =>
                  dropDown ? setdropDown(false) : setdropDown(true)
                }
                className="rounded-full h-[40px] w-[40px] flex items-center justify-center hover:text-white hover:bg-gray-700"
              >
                <MoreVertIcon />
              </div>
              {/* dropdown */}
              {dropDown && (
                <div className="flex flex-col bg-[#233138] py-2 rounded text-gray-400 absolute right-5 top-[50px] space-y-2 px-2">
                  <button
                    onClick={() => {
                      setcontactTab(true);
                      setdropDown(false);
                    }}
                  >
                    View contact info
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* messages */}

          {/* <div className="flex-1 overflow-y-auto"> */}
          <div className="flex-1 overflow-y-auto flex flex-col-reverse">
            {messages
              .slice()
              .reverse()
              .map((e, i) => (
                <Message
                  key={i}
                  details={e}
                  userMsg={uid == e.fromUid ? true : false}
                />
              ))}
          </div>
          {/* </div> */}

          {/* chat input */}
          <div className="flex items-center bg-[#202c33] px-5 mt-[auto] mb-0">
            <button onClick={() => fileInputRef.current.click()}>
              <AddIcon />
            </button>

            {fileUploadingLoader && (
              <CircularProgress className="ml-2" color="success" />
            )}
            {files.length !== 0 && <CloudDoneIcon className="ml-2" />}
            <input
              type="file"
              ref={fileInputRef}
              multiple
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
            <form
              method="post"
              className="flex flex-1 space-x-5 bg-[#2a3942] my-3 mx-5 p-3 rounded-lg text-gray-400 items-center"
              onSubmit={sendMessage}
            >
              <input
                type="text"
                placeholder="Type a message"
                value={msg}
                onChange={(e) => {
                  setmsg(e.target.value);
                }}
                className="outline-none bg-transparent text-white flex-1"
              />
              <button type="submit">
                <SendIcon />
              </button>
            </form>
            {/* <KeyboardVoiceIcon /> */}
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full bg-[#222e35]">
          <img
            className="w-[30vw]"
            src="https://firebasestorage.googleapis.com/v0/b/whatsapp-clone-ted.appspot.com/o/Screenshot%202023-08-16%20145116.png?alt=media&token=564ec15d-6fc2-43e2-a9e1-cf825b39655f"
            alt=""
          />
          <h1 className="text-4xl mb-3 font-thin">Whatsapp Web</h1>
          <p className="text-sm text-gray-400">
            Send and receive messages without keeping your phone online.
          </p>
          <p className="text-sm text-gray-400">
            Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
          </p>
          <div className="flex space-x-2 text-sm absolute bottom-5">
            <LockIcon fontSize="small" />
            <p>End-to-end encrypted</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatContainer;
