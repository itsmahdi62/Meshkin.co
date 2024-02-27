/* eslint-disable no-unused-vars */
// import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Username = () => {
  // const username = useSelector((state) => state.user.username);
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");
  const [isOpen, setIsOpen] = useState(false);
  let timeoutId;

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      if (!isOptionClicked) {
        setIsOpen(false);
      }
    }, 300);
  };

  const handleOptionClick = async () => {
    setIsOptionClicked(true);
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/users/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      sessionStorage.removeItem("auth-token");
      sessionStorage.removeItem("username");
      navigate("/");
      // return data;
    } catch (error) {
      console.error("Error during signup:", error);
      throw error;
    }
  };
  window.addEventListener("click", () => {
    timeoutId = setTimeout(() => {
      if (!isOptionClicked) {
        setIsOpen(false);
      }
    }, 100);
  });
  const [isOptionClicked, setIsOptionClicked] = useState(false);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onClick={() => setIsOptionClicked(true)}
      className="relative me-5">
      <button className="text-stone-50">{username}</button>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "160%",
            left: "5px",
            padding: "10px",
            border: "1px solid #ccc",
          }}
          className="bg-stone-100 rounded-2xl">
          <span
            onMouseEnter={handleMouseEnter}
            onClick={handleOptionClick}
            className="text-stone-800 cursor-pointer">
            Logout
          </span>
        </div>
      )}
    </div>
  );
};

export default Username;
