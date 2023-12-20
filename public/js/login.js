const login = async (email, password) => {
  await axios({
    method: "POST",
    url: "http://127.0.0.1:8000/api/v1/users/login",
    data: {
      email,
      password,
    },
  });
};

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login({ email, password });
});
