import { useLoaderData } from "react-router-dom";
import { getList } from "../../services/apiRestaurant";
import MenuItem from "../Menu/MenuItem";
function Menu() {
  const menu = useLoaderData();
  console.log(menu.data + "darya");
  return (
    <ul className="divide-y divide-slate-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}
export async function loader() {
  const menu = await getList();
  return menu;
}

export default Menu;
