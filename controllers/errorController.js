const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational , trusted error : send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programmin of other unko=nown error : don't leak error details
  } else {
    // 1) Log error
    console.error('ERROR 😁😁', err);

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

  if (proccess.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (proccess.env.NODE_ENV === 'production') {
    sendErrorProd(err, res);
  }
};
