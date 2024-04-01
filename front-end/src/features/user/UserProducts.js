import { Link } from "react-router-dom";

const UserProducts = (props) => {
  return (
    <div
      onClick={() => props.setShowMenu(false)}
      className="py-8 my-20  text-sm text-stone-900 border border-stone-600 hover:bg-stone-100 sm:px-4 sm:py-2 sm:border-none">
      <Link to="/userProducts" className="flex items-center justify-center">
        <p className="text-stone-500 font-semibold space-x-4 sm:space-x-6 md:text-base">
          My Products
        </p>
      </Link>
    </div>
  );
};

export default UserProducts;
