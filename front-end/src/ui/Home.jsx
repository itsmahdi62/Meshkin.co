import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="my-8 text-center sm:my-16">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl px-4 sm:my-16">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Continue ordering , {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
