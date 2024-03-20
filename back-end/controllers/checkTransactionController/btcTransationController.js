const fetch = require("node-fetch");
const Order = require("../../models/orderModel");
exports.btcTransationController = async (req, res, next) => {
  // ********************* btc correct
  const exampleHash =
    "f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16";
  const transactionHash = req.body.hash;
  const apiUrl = `https://api.blockchair.com/bitcoin/raw/transaction/${transactionHash}`;
  const update = { $set: { isPaid: true } };
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log(data);
    if (data.data) {
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
