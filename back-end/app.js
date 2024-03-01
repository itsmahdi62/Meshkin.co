const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes.js");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const AppError = require("./utils/appError.js");
const globalErrorHandler = require("./controllers/errorController");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const monogoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const reveiwRouter = require("./routes/reviewRoutes.js");
const path = require("path");
const request = require("request");
const productsRoutes = require("./routes/productsRoutes");
const purchaseRouter = require("./routes/purchaseRoutes.js");
const orderRouter = require("./routes/orderRoutes.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { initializePayment, verifyPayment } = require("./payStack")(request);
const pug = require("pug");
// console.log(process.env);
const _ = require("lodash");
dotenv.config({ path: "./config.env" });
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    // console.log(con.connections);
    // console.log('DB connection successful')
  });

const app = express();
// app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
// GLOBAL middleware

//Serving static files
app.use(express.static(path.join(__dirname, "public")));

// Body parser , reading data from body into req.body
app.use(
  express.json({
    limit: "10kb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
app.use(cookieParser());

//Set Security HETTP  headers
app.use(helmet());
app.use(cors());
// Development logging
app.use(morgan("dev"));

//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

// limit request from same api
const limiter = rateLimit({
  max: 30,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Data sanitization against NoSQL query injection
app.use(monogoSanitize());
// Data sanitization against XSS
app.use(xss());

// Prevent parameter polution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "difficulty",
      "maxGroupSize",
      "price",
    ],
  })
);

// 3) Routes
// app.use("/", viewRouter);
// app.get('/',(req, res) => {
//   res.render('index.pug');
//   });
// app.post("/paystack/pay", (req, res) => {
//   const form = _.pick(req.body, ["amount", "email", "full_name"]);
//   form.metadata = {
//     full_name: form.full_name,
//   };
//   form.amount *= 100;
//   initializePayment(form, (error, body) => {
//     if (error) {
//       //handle errors
//       console.log("error");
//       return;
//     }
//     response = JSON.parse(body);
//     res.redirect(response.data.authorization_url);
//     // res.redirect("/pay");
//   });
// });
// app.get("/paystack/callback", (req, res) => {
//   const ref = req.query.reference;
//   verifyPayment(ref, (error, body) => {
//     if (error) {
//       //handle errors appropriately
//       console.log("inja ");
//       return res.redirect("/error");
//     }
//     response = JSON.parse(body);
//     const data = _.at(response.data, [
//       "reference",
//       "amount",
//       "customer.email",
//       "metadata.full_name",
//     ]);
//     [reference, amount, email, full_name] = data;
//     newDonor = { reference, amount, email, full_name };
//     const donor = new Donor(newDonor);
//     donor
//       .save()
//       .then((donor) => {
//         if (donor) {
//           res.redirect("/receipt/" + donor._id);
//         }
//       })
//       .catch((e) => {
//         res.redirect("/error");
//       });
//   });
// });
// app.use((req , res , next)={
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
// })
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reveiwRouter);
app.use("api/v1/purchase", purchaseRouter);
// app.use("/api/v1/orders", orderRoutes);
app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can not find ${req.originalUrl} on this server`,
  // });
  // const err = new Error(`Can not find ${req.originalUrl} on this server`);
  // err.status = 'fail'
  // err.statusCode = 404;
  next(new AppError(`Can not find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

app.listen(8000, () => {
  console.log("Listening ... on port 8000");
});
