import axios from "axios";
import { useState } from "react";

const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");

    try {
      const response = await axios({
        method: "POST",
        url: "http://127.0.0.1:8000/api/v1/users/login",
        data: {
          email: email,
          password: password,
        },
      });
      if (response.status === 200) {
        const { data } = response;
        console.log(data);
        localStorage.setItem("token", data.token);
        console.log(localStorage.getItem("token"));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
        <form className="form" onSubmit={loginHandler}>
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              className="form__input"
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="form__input"
              type="password"
              placeholder="••••••••"
              required
              minLength="8"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form__group">
            <button className="btn btn--green" type="submit">
              Login
            </button>
          </div>
        </form>
        {localStorage.getItem("token")}
      </div>
    </main>
  );
};

export default Login;
