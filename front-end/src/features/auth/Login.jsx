import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "./authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // redux state
  const { loading, error } = useSelector((state) => state.user);

  async function handleSubmit(e) {
    e.preventDefault();
    let userCredentials = JSON.stringify({
      email,
      password,
    });
    dispatch(loginAsync(userCredentials, { dispatch })).then((result) => {
      setEmail("");
      setPassword("");
      localStorage.setItem("user", result.name);
      navigate("/list");
    });
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
              {loading ? "Loading..." : "Login"}
            </button>
            {error && (
              <div className="alert" role="alert">
                {error}
              </div>
            )}
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
