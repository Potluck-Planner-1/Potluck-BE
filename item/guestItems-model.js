const db = require('../data/dbConfig');

module.exports = {
    guestPickItem,
}

function guestPickItem(item_id){
    return db('guest_item')
    
}