import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { loginAsync } from "./authSlice";
import ReturnToMenu from "../../ui/ReturnToMenu";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // redux state
  const { loading, error } = useSelector((state) => state.user);

  async function handleSubmit(e) {
    e.preventDefault();
    // let userCredentials = JSON.stringify({
    //   email,
    //   password,
    // });
    // dispatch(loginAsync(userCredentials, { dispatch })).then((result) => {
    //   setEmail("");
    //   setPassword("");
    //   navigate("/list");
    // });
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.status !== "success") {
        // throw new Error("Failed to login");
        alert(data.message);
      }
      // dispatch(setName(data.data.user.name));
      // console.log(data);
      // console.log(data.data.user.name);
      sessionStorage.setItem("auth-token", data.token);
      sessionStorage.setItem("username", data.data.user.name);
      if (data.data.user.role !== "admin") {
        navigate("/");
      } else {
        navigate("/productsTable");
      }
      // return data;
    } catch (error) {
      console.error("Error during signup:", error);
      throw error;
    }
  }
  return (
    <div className="flex flex-col items-center justify-center mt-16 bg-gray-100 ">
      <div className="max-w-md w-full bg-stone-100 shadow-xl border-2 border-stone-300  px-8 pt-6 pb-8 mb-4 rounded-3xl ">
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
            <div className="flex flex-col justify-end">
              <Link
                className="inline-block text-end align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                to="/resetPassword">
                Forgot Password?
              </Link>
              <Link
                className="inline-block font-bold text-sm text-stone-800"
                to="/signup">
                Don't have an account?{" "}
                <span className=" text-blue-500 hover:text-blue-800">
                  Sign up
                </span>
              </Link>
            </div>
          </div>
        </form>
      </div>
      <ReturnToMenu />
    </div>
  );
};

export default Login;
