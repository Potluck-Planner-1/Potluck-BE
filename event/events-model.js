const db = require('../data/dbConfig');

module.exports = {
    findEventById,
    addingEvent,
    listEventByUserId,
    //deletingPot,
    addingItem,
    listItemsByEventId,
    //deletingItem,
    
    //addingPotItems
}

function findEventById(id){
    return db('events').where({id}).first();
}

function addingEvent(user_id, event) {
    return db('events')
    .where({organizer_id: user_id})
    .insert(event={...event, organizer_id: user_id}, 'id')
    .then((ids)=>{
        return findEventById(ids[0]);
    })
}

function listEventByUserId (id){
    return db('events').where({organizer_id: id}).orderBy('id').select('event_name','date','time','location');
}

function findItemById(id){
    return db('items').where({id}).first();
}

function addingItem(event_id, item) {
    return db('items')
    .where({potluck_id:event_id})
    .insert(item={...item, potluck_id: event_id}, 'id')
    .then((ids)=>{
        return findItemById(ids[0]);
    })
}

function listItemsByEventId(id){
    return db('items').where({potluck_id: id}).orderBy('id').select('name');
}

/*
function addingPotItems(pot_id, item_id){
    console.log('pot id is ', pot_id);
    console.log('item id is ', item_id);
    return db('pot_items')
    .insert({pot_id:pot_id, items_id:item_id}, 'id');
}*/