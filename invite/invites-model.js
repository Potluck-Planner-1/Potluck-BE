const db = require('../data/dbConfig');

module.exports = {
    findBy,
    addGuest,
    findInviteById,

    listInviteByUserId,
}

//use to find user data with given usename
function findBy (filter){
    return db('users').where(filter).orderBy('id');
}

//addding guest to invitation data
function addGuest (event_id, guest_id){
    return db('invitation')
    .insert({potluck_id: event_id, guest_id: guest_id}, 'id')
    .then((ids)=>{
        return findInviteById(ids[0]);
    })
}

//showing the invitation data when returning
function findInviteById(id){
    return db('invitation').where({id}).first();
}

//showing the logged in user their invitation if any
function listInviteByUserId(user_id){
    return db('invitation')
    .join('events', 'events.id', '=', 'invitation.potluck_id')
    .where({guest_id: user_id})
    .select('events.event_name')
}