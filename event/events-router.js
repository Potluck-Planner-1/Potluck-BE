const express = require('express');
const Event = require('./events-model');
const router = express.Router();
const {isValidEvent, isValidItem} = require('./events-service');

//creating new event for user
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

//viewing current events for user
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

//adding items to event
router.post('/event/:id',(req,res)=>{
    const {id} = req.params;
    if(isValidItem(req.body)){
        Event.addingItem(id, req.body).then(ids=>{
            res.status(201).json({
                data:ids
            })
        })
    } else {
        res.status(400).json({
            message: "Please provide the name of the item"
        })
    }
})

//listing items for given event id
router.get('/event/:id',(req,res)=>{
    const {id} = req.params;
    Event.listItemsByEventId(id).then(items=>{
        res.status(200).json(items)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err.message
        })
    })
})

module.exports = router;