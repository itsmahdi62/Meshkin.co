const fetch = require('node-fetch');
exports.checkTransactionConfirmationTeron = async (req, res, next) => {
  const transactionHash = req.body.hash;
  const apiUrl = `https://api.teronscan.org/api?module=transaction&action=gettxreceiptstatus&txhash=${transactionHash}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.status === "1") {
      console.log("Transaction is confirmed.");
    } else if (data.status === "0") {
      console.log("Transaction is pending.");
    } else {
      console.log("Unable to get confirmation status.");
    }
  } catch (error) {
    console.error("Error checking transaction confirmation:", error);
  }
};
