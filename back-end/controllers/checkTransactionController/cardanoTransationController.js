const fetch = require("node-fetch");

exports.cardanoTransationController = async (req, res, next) => {
  //***************************** */ cardano
  // const transactionHash = req.body.hash;
  const transactionHash = "3947f8216288467c7d448479b20cf1c8dc38b45b7c3bdd8ab5623454dfe19140";
  const apiUrl = `https://api.cardanoscan.io/api/v1/transaction?hash=${transactionHash}`;
  try {
    const response = await fetch(apiUrl, {
      headers: {
        apiKey: "74624597-93a7-4989-ac64-dfb3d4bdfaf4",
      },
    });
    // const data = await response.json();
    console.log(response);
    // console.log(response);
    // if (data.confirmed !== "true") {
    //   console.log(
    //     `Transaction with hash ${transactionHash} is confirmed with value of ${
    //       transaction.value / 10 ** 18
    //     } ETH.`
    //   );
    // } else {
    //   console.log(
    //     `Transaction with hash ${transactionHash} is not found or the value is not correct.`
    //   );
    // }
  } catch (error) {
    console.error("Error checking transaction confirmation:", error);
  }
};
