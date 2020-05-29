const db = require('../data/dbConfig');

module.exports = {
    findBy,
    guestPickItem,
    findGuestItemById,
    listAllItemByUserId,
}

function findBy(filter){
    return db('users').where(filter).orderBy('id');
}

function guestPickItem(item_id, guest_id){
    return db('guest_item')
    .insert({guest_id: guest_id, item_id: item_id}, 'id')
    .then(ids=>{
        return findGuestItemById(ids[0]);
    })
}

function findGuestItemById(id){
    return db('guest_item').where({id}).first();
}

function listAllItemByUserId(id){
    return db('guest_item')
    .join('items', 'items.id', '=', 'guest_item.item_id')
    .where({guest_id: id})
    .select('guest_item.item_id', 'items.name', 'items.potluck_id')
}