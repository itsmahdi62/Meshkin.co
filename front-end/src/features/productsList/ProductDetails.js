const ProductDetails = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-3xl p-4 mx-auto bg-white rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              src="product-image.jpg"
              alt="Product"
              className="w-full rounded-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h1 className="text-2xl font-bold">Product Name</h1>
            <p className="text-gray-600">Product Description</p>
            <div className="flex items-center mt-4">
              <span className="text-lg font-bold">$99.99</span>
              <button className="ml-4 px-4 py-2 text-white bg-blue-500 rounded-lg">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
