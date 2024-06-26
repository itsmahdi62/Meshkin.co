const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes.js");
const productsRoutes = require("./routes/productsRoutes");
const orderRouter = require("./routes/orderRoutes.js");
const reveiwRouter = require("./routes/reviewRoutes.js");
const viewRoutes = require("./routes/viewRoutes");
const transactionRouter = require("./routes/transactionRoutes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const AppError = require("./utils/appError.js");
const globalErrorHandler = require("./controllers/errorController");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const monogoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const path = require("path");
const request = require("request");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const pug = require("pug");
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
app.set("view engine", "pug");
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

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reveiwRouter);
// app.use("/api/v1/purchase", purchaseRouter);
app.use("/api/v1/checktransaction", transactionRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/views", viewRoutes);

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
