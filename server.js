const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

const authRouter = require('./auth/auth-router');
const eventRouter = require('./event/events-router');
const inviteRouter = require('./invite/invites-router');
const guestItemRouter = require('./item/guestItem-router');

const authenticate = require('./auth/auth-middleware');

server.get('/',(req,res)=>{
    res.status(200).json({API: 'UP'});
})

server.use('/api/auth', authRouter);
server.use('/api/user',authenticate, eventRouter);
server.use('/api/invite', authenticate, inviteRouter);
server.use('/api/guestItem', guestItemRouter);

module.exports = server;