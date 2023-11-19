const AppError = require('../utils/appError');
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
  console.error('ERROR 😁 in sendErrorDev', err);
};

const sendErrorProd = (err, res) => {
  // Operational , trusted error : send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming of other unko=nown error : don't leak error details
  } else {
    // 1) Log error
    console.error('ERROR 😁😁 in sendErrorProd', err);

    // 2) send generic message
    res.status(500).json({
      status: 'error',
      message: 'Somthing went wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // internal server error
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    // let error = { ...err };
    if (err.name === 'CastError') err = handleCastErrorDB(err);
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.name === 'CastError') error = handleCastErrorDB(error);

    sendErrorProd(error, res);
  }
};
