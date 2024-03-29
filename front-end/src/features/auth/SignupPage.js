import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReturnToMenu from "../../ui/ReturnToMenu";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const Navigate = useNavigate();
  async function handleSignup(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            passwordConfirm,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.status !== "success") {
        throw new Error("Failed to signup");
      }
      sessionStorage.setItem("auth-token", data.token);
      sessionStorage.setItem("username", data.data.user.name);
      sessionStorage.setItem("email", data.data.user.email);
      Navigate("/");
      // return data;
    } catch (error) {
      console.error("Error during signup:", error);
      throw error;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center mt-16 bg-gray-100 ">
      <div className="max-w-md w-full mx-auto p-6 bg-stone-100 shadow-xl border-2 border-stone-300 rounded-md ">
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
          <div className="flex items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              onClick={handleSignup}>
              Sign Up
            </button>
            <Link
              className="inline-block font-bold ms-auto text-sm text-stone-800"
              to="/login">
              Already have an account?{" "}
              <span className=" text-blue-500 hover:text-blue-800">
                Sign in
              </span>
            </Link>
          </div>
          {/* {error ? <p className="pt-10 text-center">{error}</p> : ""} */}
          {/* {username ? <Navigate to="/list" /> : null} */}
        </form>
      </div>
      <ReturnToMenu />
    </div>
  );
};

export default SignupPage;
