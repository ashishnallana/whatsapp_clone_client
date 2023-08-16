import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logOut } from "../Firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import StartingLoader from "./StartingLoader";
import Chats from "../components/Chats";
import NewChat from "../components/NewChat";
import { useStateValue } from "../StateProvider";
import ChatContainer from "../components/ChatContainer";
import SearchChat from "../components/SearchChat";
import ContactInfo from "../components/ContactInfo";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [{ uid }, dispatch] = useStateValue();
  const [newChat, setnewChat] = useState(false);
  const [searchChat, setsearchChat] = useState(false);
  const [contactTab, setcontactTab] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/auth");
    if (user)
      dispatch({
        type: "UPDATE_UID",
        item: user.uid,
      });
  }, [user, loading]);

  if (loading) {
    return <StartingLoader />;
  }

  return (
    <div className="text-white">
      {user && (
        <div className="">
          <NewChat uid={user.uid} isOpen={newChat} onClose={setnewChat} />
          <SearchChat isOpen={searchChat} onClose={setsearchChat} />
          <ContactInfo isOpen={contactTab} onClose={setcontactTab} />
          <div className="flex h-[100vh]">
            <div className="">
              <Navbar uid={user.uid} setnewChat={setnewChat} />
              <Chats uid={user.uid} />
            </div>

            {/* <div className="flex-1"> */}
            <ChatContainer
              className="flex-1"
              setsearchChat={setsearchChat}
              setcontactTab={setcontactTab}
            />

            {/* </div> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
