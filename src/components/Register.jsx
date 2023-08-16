import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerWithEmailAndPassword, signInWithGoogle } from "../Firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

function Register({ setRegisterPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setimage] = useState(null);
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);

      fileRef.put(selectedFile).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log(downloadURL);
          setimage(downloadURL);
        });
      });
    } else {
      console.log("No file Selected, soo select one!");
    }
  };

  const register = () => {
    registerWithEmailAndPassword(name, email, password, image);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center pt-5">
      <div className="flex flex-col text-center">
        <h1 className="text-5xl text-gray-500 font-thin mb-5">Register</h1>
        <p className="text-sm text-gray-400 mb-10">
          Create an account using email & password or google.
        </p>
        <div className="flex space-x-2 items-center mb-5">
          <p className="font-semibold">Profile Picture : </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="block text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"
          />
        </div>
        <input
          type="text"
          className="outline-none bg-[white] text-black p-3 rounded-lg border-2 border-gray-200 mb-3 focus:outline-none focus:border-gray-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          className="outline-none bg-[white] text-black p-3 rounded-lg border-2 border-gray-200 mb-3 focus:outline-none focus:border-gray-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="outline-none bg-[white] text-black p-3 rounded-lg border-2 border-gray-200 mb-3 focus:outline-none focus:border-gray-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="bg-[#65676b] font-semibold px-7 py-3 rounded text-white hover:bg-[#606770] mt-10 mb-5"
          onClick={register}
        >
          Register
        </button>
        <button onClick={signInWithGoogle}>
          <div className="border-2 bg-white border-gray-300 font-semibold px-5 py-2 rounded-full flex space-x-2 items-center justify-center mb-10 hover:border-gray-600">
            <p>Register with Google</p>
            <img
              className="h-5 w-5"
              src="https://www.transparentpng.com/thumb/google-logo/google-logo-png-icon-free-download-SUF63j.png"
              alt=""
            />
          </div>
        </button>
        <div style={{ marginTop: "20px" }} className="text-center">
          Already have an account?{" "}
          <button
            className="underline text-blue-500"
            onClick={() => setRegisterPage(false)}
          >
            Login
          </button>{" "}
          now.
        </div>
      </div>
    </div>
  );
}

export default Register;
