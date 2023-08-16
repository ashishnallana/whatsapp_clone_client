import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, logInWithEmailAndPassword } from "../Firebase";

function Login({ setRegisterPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col p-10 rounded text-center">
        <h1 className="text-5xl text-gray-500 font-thin mb-5">Login</h1>
        <p className="text-sm text-gray-400 mb-5">
          Enter your email and password or try login using your google account.
        </p>
        <input
          type="text"
          className="outline-none bg-[white] text-black p-3 rounded-lg border-2 border-gray-200 mb-3 focus:outline-none focus:border-gray-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="outline-none bg-[white] text-black p-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-gray-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="bg-[#65676b] font-semibold px-7 py-3 rounded text-white hover:bg-[#606770] mt-10 mb-5"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          LOGIN
        </button>
        <button
          className="border-2 bg-white border-gray-300 font-semibold px-5 py-2 rounded-full flex space-x-2 items-center justify-center mb-10 hover:border-gray-600"
          onClick={signInWithGoogle}
        >
          <p className="text-gray-600">Login with</p>
          <img
            className="h-5 w-5"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/706px-Google_%22G%22_Logo.svg.png"
            alt=""
          />
        </button>
        <div className="flex flex-col items-center">
          <div>
            Don't have an account?{" "}
            <button
              className="underline text-blue-500"
              onClick={() => setRegisterPage(true)}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
