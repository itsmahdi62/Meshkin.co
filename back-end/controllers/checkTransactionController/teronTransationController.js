const fetch = require("node-fetch");

exports.teronTransationController = async (req, res, next) => {
  //******************************* teron correct */
  const transactionHash = req.body.hash;
  const apiUrl = `https://apilist.tronscanapi.com/api/transaction-info?hash=${transactionHash}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log(data.confirmed);
    if (data.confirmed !== "true") {
      await Order.findByIdAndUpdate(req.params.id, req.body.paid, {
        new: true,
        runValidators: true,
      });
      res.status(201).json({
        status: "success",
      });
      // console.log(
      //   `Transaction with hash ${transactionHash} is confirmed with value of ${
      //     transaction.value / 10 ** 18
      //   } ETH.`
      // );
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