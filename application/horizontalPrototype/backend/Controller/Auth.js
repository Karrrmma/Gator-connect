/*import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import createError from 'http-errors';//ned this for createError function
import jwt from "jsonwebtoken";
import "../routes/handler.js"

export const signup = async (req,res, next)=>{
    
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)
        const query = 'INSERT INTO users(username, email, password) VALUES (?,?,?)';
        createConnection.query(query,[req.body.username, req.body.email,hash],(err, result)=>{
            if(err){
                console.error('error inserting user:', err);
                return res.status(200).json({error: 'fail to inser user'});
            }
        })

        res.status(200).send("User has been created")

        
    }catch(err){
        next(err);
    }
};


*/