const fetch = require("node-fetch");
const Order = require("../../models/orderModel");
exports.btcTransationController = async (req, res, next) => {
  // ********************* btc correct
  const destinationAddress = "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"; // replace with the actual destination wallet address
  const value = 0.001; // replace with the actual amount of Bitcoin
  const transactionHash = req.body.hash;
  const apiUrl = `https://api.blockchair.com/bitcoin/raw/transaction/${transactionHash}?apikey=YourApiKeyTest`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    if (data.out && data.out.length > 0) {
      const transaction = data.out.find(
        (output) =>
          output.addr === destinationAddress &&
          output.value === value * 100000000
      );
      if (transaction) {
        await Order.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
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
    } else {
      console.log("Unable to get transaction list.");
    }
  } catch (error) {
    console.error("Error checking transaction confirmation:", error);
  }
};
