const fetch = require("node-fetch");
const Order = require("../../models/orderModel");

exports.ethTransationController = async (req, res, next) => {
  const exampleHash =
    "0xda214d1b1d458e7ae0e626b69a52a59d19762c51a53ff64813c4d31256282fdf";
  const transactionHash = req.body.hash;
  const URL = `https://api.blockchair.com/ethereum/raw/block/${transactionHash}`;
  const update = { $set: { isPaid: true } };

  try {
    const response = await fetch(URL);
    const data = await response.json();
    // console.log(data);
    if (data.data.size === req.body.amount) {
      Order.findOneAndUpdate(data.data, update, { new: true });
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
