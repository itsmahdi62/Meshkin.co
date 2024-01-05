/* eslint-disable no-unused-vars */
import "./App.css";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login";
import Header from "./components/Header/Header";
import Overview from "./pages/Overview";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import User from "./pages/User";
function App() {
  // const [user, setUser] = useState("");
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate replace to="/overview" />}></Route>
          <Route path="/overview" element={<Overview />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/user" element={<User />}></Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
