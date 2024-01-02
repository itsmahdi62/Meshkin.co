import "./App.css";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login";
import Header from "./components/Header/Header";
import { useState } from "react";
function App() {
  const [user, setUser] = useState("");
  return (
    <div className="App">
      <Header user={user} />
      <Login user={user} setUser={setUser} />
      <Footer />
    </div>
  );
}

export default App;
