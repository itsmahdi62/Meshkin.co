import { useLoaderData } from "react-router-dom";
import { getList } from "../../services/apiShop";
import ProductListItem from "./ProductListItem"
function Menu() {
  const menu = useLoaderData();
  return (
    <ul className="divide-y divide-slate-200 px-2">
    <img src="../../../../back-end/dev-data/img/duolingo.jpg" alt="dj" />
      {menu.map((product) => (
        <ProductListItem product={product} key={product.id} />
      ))}
    </ul>
  );
}
export async function loader() {
  const list = await getList();
  return list;
}

export default Menu;
