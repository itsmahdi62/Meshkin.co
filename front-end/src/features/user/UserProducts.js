import { Link } from "react-router-dom";

const UserProducts = () => {
  return (
    <div className="me-5 text-stone-500  bg-stone-200 text-sm py-[10px]  rounded-2xl sm:px-6">
      <Link to="/userProducts" className="flex items-center">
        <p className="text-stone-500 font-semibold space-x-4 sm:space-x-6 md:text-base">
          My Products
        </p>
      </Link>
    </div>
  );
};

export default UserProducts;
