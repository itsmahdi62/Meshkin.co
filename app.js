const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const AppError = require('./utils/appError.js');
const globalErrorHandler = require('./controllers/errorController');

dotenv.config({ path: './config.env' });
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
// middleware
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can not find ${req.originalUrl} on this server`,
  // });
  // const err = new Error(`Can not find ${req.originalUrl} on this server`);
  // err.status = 'fail'
  // err.statusCode = 404;
  next(new AppError(`Can not find ${req.originalUrl} on this server` ,  404));
});

app.use(globalErrorHandler);

app.listen(8000, () => {
  console.log('Listening ... on port 8000');
});
