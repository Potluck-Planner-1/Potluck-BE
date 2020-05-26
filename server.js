const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

const authRouter = require('./auth/auth-router');

server.get('/',(req,res)=>{
    res.status(200).json({API: 'UP'});
})

server.use('/api/auth', authRouter);



module.exports = server;