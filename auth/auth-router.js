const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model');
const { isValidRegister, isValidLogin } = require('../users/users-service');
const configSecret = require('../config/secret');

router.post('/register',(req,res)=>{
    const credentials = req.body;
    if(isValidRegister(credentials)){
        const rounds = process.env.BCRYPT_ROUNDS || 8;
        const hash = bcryptjs.hashSync(credentials.password, rounds);
        credentials.password = hash;

        Users.add(credentials).then(user=>{
            res.status(201).json({
                user
            })
        }).catch(err=>{
            console.log(err);
            res.status(500).json({
                message: err.message
            })
        })
    } else {
        res.status(400).json({
            message: 'Please provide username and password (string)'
        })
    }
})

router.post('/login',(req,res)=>{
    if(isValidLogin(req.body)){
        Users.findBy({username: req.body.username}).then(([user])=>{
            if(user && bcryptjs.compareSync(req.body.password, user.password)){
                const token = generateToken(user);
                res.status(200).json({
                    message: 'Log in successful', token
                });
            } else {
                res.status(401).json({message: 'Invalid credentials'});
            }
        }).catch(err=>{
            res.status(500).json({
                message: err.message
            });
        });
    } else {
        res.status(400).json({
            message: "Please provide username and password, the password should be alphanumeric"
        });
    }
});

router.get('/',(req,res)=>{
    Users.find().then(users=>{
        res.status(200).json(users)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err.message
        })
    })
})

function generateToken(user){
    const payload = {
        subject: user.id,
        username: user.username,
    }
    const options = {
        expiresIn: '8h',
    }
    return jwt.sign(payload, configSecret.jwSecret, options)
}

module.exports = router;