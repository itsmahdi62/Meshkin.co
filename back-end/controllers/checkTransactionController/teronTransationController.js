const fetch = require("node-fetch");
const Order = require("../../models/orderModel");
const User = require("../../models/userModel");
exports.teronTransationController = async (req, res, next) => {
  const transactionHash = req.body.hashId;
  const apiUrl = `https://apilist.tronscanapi.com/api/transaction-info?hash=${transactionHash}`;
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
