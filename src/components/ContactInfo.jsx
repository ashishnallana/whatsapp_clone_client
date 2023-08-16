import React, { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";

function ContactInfo({ isOpen, onClose }) {
  const [{ uid, chatId }, dispatch] = useStateValue();
  const [data, setdata] = useState(null);

  const getUserDetails = async () => {
    try {
      console.log("👉👉 into the func");
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/user/${chatId}`
      );
      if (!response.ok) {
        throw new Error("Some error ooccured!");
      }
      const UserData = await response.json();
      console.log(UserData.user, "⭐⭐⭐👉😊🔥");
      setdata(UserData.user);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUserDetails();
    console.log("⭐⭐⭐👉😊🔥");
  }, [isOpen]);

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
                <h2 className="text-lg text-white">Contact info</h2>
              </div>
            </div>
            {/*  */}
            {data && (
              <div className="flex flex-col items-center space-y-2 p-5">
                <div
                  title={data.name}
                  style={{
                    backgroundImage: `url(${data.displayPicture})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                  className="h-[200px] w-[200px] rounded-full"
                ></div>
                <h1 className="text-xl">{data.name}</h1>
                <p className="text-sm text-gray-400">{data.email}</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ContactInfo;
