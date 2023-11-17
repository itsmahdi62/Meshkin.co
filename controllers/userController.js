const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUser = catchAsync( async(req, res , next) => {
  const users = await User.find();
  
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'This route its not yet defined!',
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'This route its not yet defined!',
  });
};
exports.patchUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'This route its not yet defined!',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'fail',
    message: 'This route its not yet defined!',
  });
};
