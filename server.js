const express = require('express');
const server = express();
server.use(express.json());

const authRouter = require('./auth/auth-router');

server.get('/',(req,res)=>{
    res.status(200).json({API: 'UP'});
})

server.use('/api/auth', authRouter);



module.exports = server;