const fetch = require("node-fetch");

exports.checkTransactionConfirmationTeron = async (req, res, next) => {
  // const transactionHash = req.body.hash;
  // const apiUrl = `https://api.teronscan.org/api?module=transaction&action=gettxreceiptstatus&txhash=${transactionHash}`;
  // try {
  //   const response = await fetch(apiUrl);
  //   const data = await response.json();
  //   console.log(data);
  //   if (data.status === "1") {
  //     console.log("Transaction is confirmed.");
  //   } else if (data.status === "0") {
  //     console.log("Transaction is pending.");
  //   } else {
  //     console.log("Unable to get confirmation status.");
  //   }
  // } catch (error) {
  //   console.error("Error checking transaction confirmation:", error);
  // }
  // const contractaddress = "TV63SGWfJmwsuu1aLZf1rzu59gmMmySM9M"; // replace with the actual destination wallet address
  // const value = 25; // replace with the actual amount of Teron
  // const transactionHash = req.body.hash;
  // const apiUrl = `https://api.teronscan.org/api?module=account&action=txlist&address=${contractaddress}&value=${value}&sort=desc&page=1&offset=10&startblock=0&endblock=99999999&apikey=YourApiKeyTest`;

  // try {
  //   const response = await fetch(apiUrl);
  //   const data = await response.json();
  //   console.log(data);
  //   if (data.result.length > 0) {
  //     const transaction = data.result.find((tx) => tx.hash === transactionHash);
  //     if (transaction) {
  //       console.log(
  //         `Transaction with hash ${transactionHash} is confirmed with value of ${transaction.value} Teron.`
  //       );
  //     } else {
  //       console.log(`Transaction with hash ${transactionHash} is not found.`);
  //     }
  //   } else {
  //     console.log("Unable to get transaction list.");
  //   }
  // } catch (error) {
  //   console.error("Error checking transaction confirmation:", error);
  // }
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
