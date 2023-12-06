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

// console.log(process.env.NODE_ENV);

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
// GLOBAL middleware

// Body parser , reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

//Set Security HETTP  headers
app.use(helmet());

// Development logging
app.use(morgan("dev"));

//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
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
app.use("/api/v1/users", userRouter);

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
