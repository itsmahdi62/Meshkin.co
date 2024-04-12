const fetch = require("node-fetch");
const Order = require("../../models/orderModel");
const User = require("../../models/userModel");
exports.teronTransationController = async (req, res, next) => {
  const exampleHash =
    "81617c898f3901b886dea46512e2577d29af810c19cf4b5044bd9dd7b76e4923";
  const transactionHash = req.body.hashId;
  const apiUrl = `https://apilist.tronscanapi.com/api/transaction-info?hash=${transactionHash}`;
  const { products, email, amount } = req.body;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // console.log(data.contractData.amount/1000000);
    const dataAmount = data.contractData.amount / 1000000;
    if (dataAmount === amount) {
      const user = await User.findOne({ email });
      if (!user) {
        // Handle the error when user is not found
        res.status(404).json({ status: "error", message: "User not found" });
        return;
      }

      const productsIds = products.map((product) => product.productId);
      console.log(productsIds);
      await Order.create({ user: user._id, products: productsIds });
      res.status(201).json({
        status: "success",
      });
    } else {
      console.log(
        `Transaction with hash ${transactionHash} is not found or the value is not correct.`
      );
      res.status(402).json({
        status: "unsuccess",
      });
    }
  } catch (error) {
    console.error("Error checking transaction confirmation:", error);
  }
};
