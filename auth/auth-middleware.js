const jwt = require('jsonwebtoken');
const secrets = require('../config/secret');

module.exports = (req,res,next) => {
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, secrets.jwSecret,(error, decodedToken)=>{
            if(error){
                res.status(401).json({
                    YOU: 'SHALL NOT PASS'
                })
            } else {
                next();
            }
        });
    } else {
        res.status(400).json({
            message: 'Please provide the authentication information'
        })
    }
}