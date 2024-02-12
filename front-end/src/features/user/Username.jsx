import { useSelector } from "react-redux";
const Username = ({child}) => {
  // const username = useSelector((state) => state.user.username);

  // if (!username) return null;
  return (
    <div className="hidden text-sm me-5 font-semibold md:block">{child}</div>
  );
};

export default Username;
