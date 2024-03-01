const axios = require("axios");
const crypto = require("crypto");

exports.checkOut =  async (req, res ,next) => {
  const { amount, currency } = req.body;
  const data = {
    amount,
    currency,
    order_id: crypto.randomBytes(12).toString("hex"),
    url_callback: "http://localhost:8000/api/v1/purchase/callback",
  };

  const sign = crypto
    .createHash("md5")
    .update(
      Buffer.from(JSON.stringify(data)).toString("base") + process.env.API_KEY
    )
    .digest("hex");

  const response = await axios.post(
    "https://api.cryptomus.com/v1/payment",
    data,
    {
      headers: {
        merchant: process.env.MERCHANT_ID,
        sign: sign,
      },
    }
  );

  res.send(response.data);
  next()
}

exports.callback =  async (req, res) => {
  const { sign } = req.body;
  if (!sign) {
    return res.status(400).send("invalid payload");
  }
  const data = JSON.parse(req.rawBody);
  delete data.sign;
  const hash = crypto
    .createHash("md5")
    .update(
      Buffer.from(JSON.stringify(data)).toString("base") + process.env.API_KEY
    )
    .digest("hex");

  if (hash !== sign) {
    return res.status(400).send("invalid sign");
  }

  console.log(req.body);
  res.sendStatus(200);
};

