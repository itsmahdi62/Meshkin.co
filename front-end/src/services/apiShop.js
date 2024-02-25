const API_URL = "http://127.0.0.1:8000/api/v1";

export async function getList() {
  const res = await fetch(`${API_URL}/products/`);
  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (res.status !== 200) throw Error("Failed getting List");

  const { data } = await res.json();
  return data;
}
// export async function getUsers() {
//   const res = await fetch(`${API_URL}/users/`);
//   // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  // if (res.status !== 200) throw Error("Failed getting List");

//   const { data } = await res.json();
//   return data;
// }

// export async function getProduct(userId) {
// const res = fetch(`http://127.0.0.1:8000/api/v1/products/${userId.id}`)
// console.log(res)
// if (res.status !== 200) throw Error("Failed getting product");

// }
// export async function loginUser(username, password) {
//   try {
//     const res = await fetch(`${API_URL}/users/login`, {
//       method: "POST",
//       body: JSON.stringify({ username, password }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     // if (!res.ok) throw Error();
//     const { data } = await res.json();
//     console.log(res)
//     return data;
//   } catch {
//     throw Error("Failed creating your loging in");
//   }
// }
