import { useLoaderData } from "react-router-dom";
import { getList } from "../../services/apiShop";
import ProductListItem from "./ProductListItem";
import "./ProductsList.scss";
function Menu() {
  const menu = useLoaderData();
  return (
    <div className="container flex flex-col">
      <div className="banner-container gap-4 p-5">
        <div className="grid-item-1 row-span-3 py-12 px-8 bg-blue-600 rounded-lg text-stone-200 shadow-lg">
          <h4 className="mx-auto shadow-sm font-semibold">
            Wht Should we buy from Meshkin?
          </h4>
          <ul className="mt-12">
            <li>Warranty pbest price</li>
            <li>24/7 online support</li>
          </ul>
          <img
            className=""
            src="https://s200-narin.s3.ca-central-1.amazonaws.com/images/Anargift/collection/2024/2/MxtNgnTwzuiPzVindDXG5a0Khnv7VqokcVRsv4av.png"
            alt="o"
          />
        </div>

        <div className="flex shadow-xl grid-item-2 ">
          <div>
            <h4>Play Station gift cart</h4>
          </div>
          <img
            className="h-28 w-full"
            src="https://s200-narin.s3.ca-central-1.amazonaws.com/images/Anargift/collection/2024/2/ISVVTLpTe21pO3vFDYF439k7D6aCxWSc9nLATSWs.png"
            alt="d"
          />
        </div>
        <div className="grid-item-3 shadow-xl ">down</div>
      </div>
      <ul className="divide-y divide-slate-200 px-2 grid gap-6 sm:grid-cols-2 md:grid-cols-4 md:gap-8 ">
        {menu.map((product) => (
          <ProductListItem product={product} key={product.id} />
        ))}
      </ul>
    </div>
  );
}
export async function loader() {
  const list = await getList();
  return list;
}

export default Menu;
