import { Link } from "react-router-dom";

const UserProducts = (props) => {
  return (
    <div
      onClick={() => props.setShowMenu(false)}
      className="py-8 my-20  text-sm text-stone-900 border border-stone-400 md:hover:bg-stone-100  md:me-5 md:text-stone-500  md:bg-stone-200 md:text-sm md:py-[10px] md:my-0  md:rounded-2xl md:px-6 md:border-none">
      <Link to="/userProducts" className="flex items-center justify-center">
        <p className="text-stone-500 font-semibold space-x-4 md:space-x-6 md:text-base">
          My Products
        </p>
      </Link>
    </div>
  );
};

export default UserProducts;
