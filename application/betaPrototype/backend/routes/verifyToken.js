const createError = require('http-errors');
const jwt = require('jsonwebtoken');
require('dotenv/config');

exports.verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    console.log('No authorization header provided');
    return next(createError(401, 'You are not authenticated!'));
  }

  const token = req.headers.authorization.split(' ')[1];
  const mysecretkey = process.env.JWT;
  if (!token) {
    console.log('no token provided');
    return next(createError(401, 'you are not authenticaed!'));
  }
  console.log('token received', token);

  try {
    const decoded = jwt.verify(token, mysecretkey);
    console.log('token matched');
    req.user_id = decoded.user_id;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
        // check if the token is expired
        const err = createError(401, 'token expired');
        err.tokenExpired = true;
        return next(err);
      } else {
        return next(createError(401, 'invalid token'));
      }
  }
};

/*
    const token = req.cookie.access_token
    if(!token ) return next(createError(401, "you are not authenticaed!"));
    
    jwt.verify(token, process.env.JWT, (err, user)=> {
        if(err) return next(createError(403, " Token is not valid!"));
        req.user = user;
        next()
        */
