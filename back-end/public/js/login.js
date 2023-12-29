// const axios = require("axios");
// var axios = require("node_modules/axios/dist/axios.min.js");
const login = async (email, password) => {
  try {
    console.log(email);
    const res = await axios.POST('http://127.0.0.1:8000/api/v1/users/login' , {
    email: email,
    password: password,
  })
    // const res = await axios({
    //   method: "POST",
    //   url: "http://127.0.0.1:8000/api/v1/users/login",
    //   data: JSON.stringify({
    //     email: email,
    //     password: password,
    //   }),
    // });
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(email);
  console.log(password);
  login(email, password);
});
