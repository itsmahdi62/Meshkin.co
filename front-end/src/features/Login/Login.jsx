import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../services/apiShop";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    let data = JSON.stringify({
      email,
      password,
    });
    console.log(data);
    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      // url: "127.0.0.1:8000/api/v1/users/login",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer null",
      },
      data: data,
    };
    const response = await fetch("http://127.0.0.1:8000/api/v1/users/login", {
      method: "POST",
      maxBodyLength: Infinity,
      // url: "127.0.0.1:8000/api/v1/users/login",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer null",
      },
      body: data,
    });
    const formatedResponse = response.json();
    if (formatedResponse.status === "success") {
      console.log(formatedResponse);
      setTimeout(() => navigate("/list"), 500);
    } else {
    }
    // dispatch(updateName(username));
  }
  return (
    <div className="flex flex-col items-center justify-center mt-16 bg-gray-100 ">
      <div className="max-w-md w-full bg-white shadow-md  px-8 pt-6 pb-8 mb-4 rounded-3xl">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your @Email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500  text-white font-bold py-2 px-4 rounded-xl hover:bg-blue-700 hover:px-8 transition-all
              duration-700 focus:outline-none focus:shadow-outline"
              type="submit">
              Sign In
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              to="/resetPassword">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
