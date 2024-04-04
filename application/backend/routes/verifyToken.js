import jwt from "jsonwebtoken";
import createError from 'http-errors';
export const verifyToken = (req, res, next) =>{
    const token = req.cookie.access_token
    if(!token ) return next(createError(401, "you are not authenticaed!"));
    
    jwt.verify(token, process.env.JWT, (err, user)=> {
        if(err) return next(createError(403, " Token is not valid!"));
        req.user = user;
        next()
});
}