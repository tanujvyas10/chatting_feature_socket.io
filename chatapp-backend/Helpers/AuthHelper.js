// const jwt=require("jsonwebtoken")
// const dbConfig=require("../config/secret")
// const HttpStatus=require("http-status-codes")


// module.exports={
//     VerifyToken:(req,res,next)=>{
//         const token=req.cookies.auth || req.headers.authorization.split('')[1]
//         console.log("In headeers",req.headers);
//         console.log("the token",token)

//         if(!token){
//             return res.status(HttpStatus.FORBIDDEN).json({message:"NO TOKEN PROVIDED"})
//         }

//         return jwt.verify(token,dbConfig.secret,(err,decoded)=>{
//             if(err){
//                 if(err.expiredAt< new Date()){
//                     return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
//                         {message:"Token is expired.Please login again",
//                         token:null
//                     })
//                 }
//                 next();
//             }

//             req.user=decoded.data;
//             next();
//         })
//     }

//     }

const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status-codes');

const dbConfig = require('../config/secret');

module.exports = {
  VerifyToken: (req, res, next) => {
    if (!req.headers.authorization) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'No Authorization' });
    }
    const token = req.cookies.auth || req.headers.authorization.split(' ')[1];
 console.log(token)
    if (!token) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'No token provided' });
    }

    return jwt.verify(token, dbConfig.secret, (err, decoded) => {
      if (err) {
        if (err.expiredAt < new Date()) {
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'Token has expired. Please login again',
            token: null
          });
        }
        next();
      }
      req.user = decoded.data;
      next();
    });
  }
};