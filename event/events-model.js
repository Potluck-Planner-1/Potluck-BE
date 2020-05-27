const db = require('../data/dbConfig');

module.exports = {
    addingEvent,
    //deletingPot,
    addingItem,
    //deletingItem,
    findEventById,
    listEventByUserId,
    addingPotItems
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
    return db('events').where({organizer_id: id}).orderBy('id');
}

function addingItem(pot_id, item) {
    return db('items')
    .insert(item, 'id')
    .then(ids=>{
        addingPotItems(pot_id, ids[0]);
    })
}

function addingPotItems(pot_id, item_id){
    console.log('pot id is ', pot_id);
    console.log('item id is ', item_id);
    return db('pot_items')
    .insert({pot_id:pot_id, items_id:item_id}, 'id');
}