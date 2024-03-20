const fetch = require("node-fetch");
const Order = require("../../models/orderModel");

exports.ethTransationController = async (req, res, next) => {
  const exampleHash =
    "5641a3c38fd200aa49df75690e9ea48526da874b336913868cd4b7aebfeb4107";
  const transactionHash = req.body.hash;
  const URL = `https://api.blockchair.com/cardano/raw/transaction/${transactionHash}`;
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
