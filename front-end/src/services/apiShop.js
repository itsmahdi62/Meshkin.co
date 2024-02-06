const API_URL = "http://127.0.0.1:8000/api/v1";

export async function getList() {
    const res = await fetch(`${API_URL}/products`);
    // const res = await fetch(`${API_URL}/menu`);
    // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
    if (res.status !== 200) throw Error("Failed getting menu");
  
    const { data } = await res.json();
    return data;
  }