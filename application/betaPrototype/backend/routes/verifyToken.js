const createError = require('http-errors')
const  jwt = require('jsonwebtoken');
require('dotenv/config');

exports.verifyToken = async (req, res, next) =>{
    const token = req.headers.authorization.split(' ')[1];
    const mysecretkey = process.env.JWT;
    if (!token){
        console.log('no token provided')
        return next(createError(401, "you are not authenticaed!"));
    }
    console.log("token received", token);
   
    try{
        const decoded =jwt.verify(token, mysecretkey);
        console.log('token matched')
        req.user_id = decoded.user_id;
        next()

        
    }
    catch(error){
        return(createError(401,"invalid token"));
    }
    
}



    




/*
    const token = req.cookie.access_token
    if(!token ) return next(createError(401, "you are not authenticaed!"));
    
    jwt.verify(token, process.env.JWT, (err, user)=> {
        if(err) return next(createError(403, " Token is not valid!"));
        req.user = user;
        next()
        */
