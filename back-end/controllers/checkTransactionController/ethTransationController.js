const fetch = require("node-fetch");

exports.ethTransationController = async (req, res, next) => {
  //************************************* correct eth */
  const destinationAddress = "0x5409ed021d9299bf6814279a6a1411a7e866a631"; // replace with the actual destination wallet address
  const value = req.body.amount;
  const transactionHash = req.body.hash;
  // // const apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${destinationAddress}&value=${value}&sort=desc&page=1&offset=10&startblock=0&endblock=99999999&apikey=B96DUP9C69AIVX2MQFBAZH67ZC7D33W643`;
  //// const url = `https://api.etherscan.io/api?module=transaction&action=getstatus&txhash=0xb4bc263278d3f77a652a8d73a6bfd8ec0ba1a63923bbb4f38147fb8a943da26d&apikey=B96DUP9C69AIVX2MQFBAZH67ZC7D33W643`;
  const URL = `https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${transactionHash}&apikey=B96DUP9C69AIVX2MQFBAZH67ZC7D33W643`;

  try {
    const response = await fetch(URL);
    const data = await response.json();
    // console.log(data);
    if (data.result.length !== 0) {
      const transaction = Object.values(data.result).find(
        (tx) => tx.hash === transactionHash && tx.value === value
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
        res.status(404).json({
          status: "unsuccess",
        });
        console.log(
          `Transaction with hash ${transactionHash} is not found or the value is not correct.`
        );
      }
    }
  } catch (error) {
    console.error("Error checking transaction confirmation:", error);
  }
};
