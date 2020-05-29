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

//showing all items picked by users given user's id
router.get('/:id',(req, res)=>{
    const {id} = req.params;
    GuestItem.listAllItemByUserId(id).then(items=>{
        res.status(200).json(items)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err.message
        })
    })

})

module.exports = router;