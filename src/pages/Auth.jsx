import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import Login from "../components/Login";
import Register from "../components/Register";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [user, loading, error] = useAuthState(auth);
  const [registerPage, setRegisterPage] = useState(false); // for switching between login and register page
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading]);

  return (
    <div className="">
      <div className="bg-[#708253] h-[225px] pt-5"></div>
      <div className="absolute top-0 pt-5 left-[50%] -translate-x-[50%] w-[70vw] max-[700px]:w-[100vw]">
        <div className="flex space-x-3 items-center mb-8 max-[700px]:pl-10">
          <img
            className="h-[45px] w-[45px]"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/598px-WhatsApp_icon.png"
            alt="logo"
          />
          <h1 className="text-sm font-semibold text-white">WHATSAPP WEB</h1>
        </div>
        {/* login or register component */}
        <div className="bg-white rounded pt-5 min-h-[700px]">
          {/* <Login /> */}
          {/* <Register /> */}
          {registerPage ? (
            <Register setRegisterPage={setRegisterPage} />
          ) : (
            <Login setRegisterPage={setRegisterPage} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;
