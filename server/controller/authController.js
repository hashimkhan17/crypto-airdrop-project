const bcrypt = require("bcryptjs");
const User = require("../models/user");
const createError = require("../utils/app_errors");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return next(new createError('User already exists', 400));
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    const token = jwt.sign({ _id: newUser._id }, 'secretkey123', {
      expiresIn: '90d',
    });

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      token,
      user : {
        _id : newUser.id,
        name : newUser.name,
        email : newUser.email,
        role: newUser.role
        }
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        return next(new createError('User not found', 404));
  
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword)
        return next(new createError('Invalid password', 401));

const token = jwt.sign({ _id: user._id }, 'secretkey123', { expiresIn: '90d' });

res.status(200).json({
    status: 'success',
    message: 'Logged in successfully',
    user : {
    _id : user.id,
    name : user.name,
    email : user.email,
    role: user.role
    }
  });

   
    } catch (error) {
      next(error);
    }
  };  