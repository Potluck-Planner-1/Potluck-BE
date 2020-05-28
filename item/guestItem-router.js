const express = require('express');
const router = express.Router();

const GuestItem = require('./guestItems-model');
const {isValidName} = require('../invite/invites-service');

//user picking an item, body must contain username
router.post('/:id',(req,res)=>{
    const {id} = req.params;
    if(isValidName(req.body)){
        GuestItem.findBy({username: req.body.username}).then(([pickingUser])=>{
            GuestItem.guestPickItem(id, pickingUser.id).then(ids=>{
                res.status(201).json({
                    data: ids
                })
            })
        }).catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err.message
            })
        })
    } else {
        res.status(400).json({
            message: 'Please provide a valid username of the person picking item'
        })
    }
})

module.exports = router;