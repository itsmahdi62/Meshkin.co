import { useLoaderData } from "react-router-dom";
import { getList } from "../../services/apiShop";
import ProductListItem from "./ProductListItem";
import "./ProductsList.scss";
import Button from "../../ui/Button";
import SlideShow from "../../ui/SlideShow";
function ProductSList() {
  const productList = useLoaderData();
  return (
    <div className="container flex flex-col">
      {/* <div className="banner-container gap-4 p-5 min-h-[400px] max-h-[800px] mb-96 sm:mb-[500px] md:mb-0">
        <div className="grid-item-1 flex flex-col py-12 px-8 bg-blue-600 rounded-2xl text-stone-200 shadow-lg">
          <h4 className="mx-auto shadow-sm font-semibold">
            Why Should we buy from Meshkin?
          </h4>
          <ul className="mt-12">
            <li>Warranty best price</li>
            <li>24/7 online support</li>
          </ul>
          <img
            className="mt-auto"
            src="https://s200-narin.s3.ca-central-1.amazonaws.com/images/Anargift/collection/2024/2/MxtNgnTwzuiPzVindDXG5a0Khnv7VqokcVRsv4av.png"
            alt="o"
          />
        </div>

        <div className="flex shadow-md grid-item-2  border border-indigo-200 rounded-2xl py-4 px-8 hover:shadow-xl transition-all duration-500">
          <div className="flex flex-col items-start ">
            <h4 className="mb-5 font-bold text-2xl">Play Station gift cart</h4>
            <Button type="small" className="cursor-auto ">
              Instant Delivery
            </Button>
            <p className="mt-8 max-w-52">
              Buy the cheapest Play Station gift cart from Meshkin .
            </p>
          </div>
          <img
            className="h-64  ms-auto"
            src="https://s200-narin.s3.ca-central-1.amazonaws.com/images/Anargift/collection/2024/2/ISVVTLpTe21pO3vFDYF439k7D6aCxWSc9nLATSWs.png"
            alt="d"
          />
        </div>

        <div className="grid-item-3 flex shadow-md  border border-indigo-200 rounded-2xl py-5 px-8 hover:shadow-xl transition-all duration-500">
          <img
            className="h-60"
            src="https://s200-narin.s3.ca-central-1.amazonaws.com/images/Anargift/collection/2023/52/kSbLFnqwIBbASTJTDQhmBdiVwHv1KMeKkRy3NNEl.png"
            alt=""
          />
          <div className="flex flex-col ms-auto items-start">
            <h4 className="mb-5 font-bold text-2xl">Sell plato's coins</h4>
            <p className="mt-8 max-w-52">Active all plato features !</p>
          </div>
        </div>
      </div> */}
      <SlideShow slides={productList} />
      <ul className="divide-y mt-48  divide-slate-200 px-2 grid gap-6 sm:grid-cols-2 md:grid-cols-4 md:gap-10 sm:mt-12">
        {productList.map((product) => (
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

export default ProductSList;
