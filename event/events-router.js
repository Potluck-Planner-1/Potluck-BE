const express = require('express');
const Event = require('./events-model');
const router = express.Router();
const {isValidEvent, isValidItem} = require('./events-service');

//creating new pot for user
router.post('/:id',(req,res)=>{
    const {id} = req.params;
    if(isValidEvent(req.body)){
        Event.addingEvent(id, req.body).then(ids=>{
            res.status(201).json({
                data: ids
            })
        })
    } else {
        res.status(400).json({
            message: "Please provide the name of the event, date, time, and location"
        })
    }
})

//viewing current pot for user
router.get('/:id',(req,res)=>{
    const {id} = req.params;
    Event.listEventByUserId(id).then(pots=>{
        res.status(200).json(pots)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err.message
        })
    })
})

//adding items to pot
router.post('/pot/:id',(req,res)=>{
    const {id} = req.params;
    if(isValidItem(req.body)){
        Event.addingItem(id, req.body).then(ids=>{
            res.status(201).json({
                data:ids
            })
        })
    } else {
        res.status(400).json({
            message: "Please provide person name, the item they are bringing and the amount of said item"
        })
    }
})

module.exports = router;