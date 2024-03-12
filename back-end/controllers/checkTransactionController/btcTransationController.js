const fetch = require("node-fetch");

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
        console.log(
          `Transaction with hash ${transactionHash} is confirmed with value of ${
            transaction.value / 100000000
          } BTC.`
        );
      } else {
        console.log(
          `Transaction with hash ${transactionHash} is not found or the value is not correct.`
        );
      }
    } else {
      console.log("Unable to get transaction list.");
    }
  } catch (error) {
    console.error("Error checking transaction confirmation:", error);
  }
};
