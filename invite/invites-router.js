const express = require('express');
const router = express.Router();
const Invite = require('./invites-model');

const {isValidName} = require('./invites-service');

//inviting a user with given event id
router.post('/:id',(req,res)=>{
    const {id} = req.params;
    if(isValidName(req.body)){
        Invite.findBy({username: req.body.username}).then(([invitedUser])=>{
            Invite.addGuest(id, invitedUser.id).then(ids=>{
                res.status(201).json({
                    data: ids
                })
            })
        }).catch(err=>{
            res.status(500).json({
                message: err.message
            })
        })
    } else {
        res.status(400).json({
            message: "Please provide a valid name of the person you are trying to invite"
        })
    }
})

//showing the invite with given user id
router.get('/:id',(req,res)=>{
    const {id} = req.params;
    Invite.listInviteByUserId(id).then(invites=>{
        res.status(200).json(invites)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err.message
        })
    })
})

//accepting the invite



module.exports = router;