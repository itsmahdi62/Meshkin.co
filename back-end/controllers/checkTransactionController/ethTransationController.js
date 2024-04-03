const fetch = require("node-fetch");
const Order = require("../../models/orderModel");
const User = require("../../models/userModel");
exports.ethTransationController = async (req, res, next) => {
  // does not work with the example
  const exampleHash =
    "0xda214d1b1d458e7ae0e626b69a52a59d19762c51a53ff64813c4d31256282f";
  const transactionHash = req.body.hashId;
  const apiUrl = `https://api.blockchair.com/ethereum/raw/block/${transactionHash}`;
  const { products, email, amount } = req.body;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log(data);
    if (data.data.size === amount) {
      const user = User.findOne({ email: { $gte: { email } } });
      const newOrder = new Order({ user, products });
      await newOrder.save();
      res.status(201).json({
        status: "success",
      });
    } else {
      console.log(
        `Transaction with hash ${transactionHash} is not found or the value is not correct.`
      );
      res.status(404).json({
        status: "unsuccess",
      });
    }
  } catch (error) {
    console.error("Error checking transaction confirmation:", error);
  }
};
