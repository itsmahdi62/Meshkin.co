import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "./authSlice";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  // const username = useSelector((state) => state.auth.user.name);

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  async function handleSignup(e) {
    e.preventDefault();
    let data = JSON.stringify({
      name,
      email,
      password,
      passwordConfirm,
    });
    dispatch(signup(data)).then((result) => {
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
      localStorage.setItem("user", result.name);
      console.log(localStorage.getItem("user"))
      Navigate("/list");
    });
  }

  return (
    <div className="flex flex-col items-center justify-center mt-16 bg-gray-100 ">
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={handleSignup}>
            Sign Up
          </button>
          {/* {error ? <p className="pt-10 text-center">{error}</p> : ""} */}
          {/* {username ? <Navigate to="/list" /> : null} */}
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
