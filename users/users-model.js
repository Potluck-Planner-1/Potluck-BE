const db = require('../data/dbConfig');

module.exports = {
    add,
    findById,
    findBy,
    find,
}

async function add(user){
    try {
        const [id] = await db('users').insert(user,'id')
        return findById(id);
    } catch (error) {
        throw error;
    }
}

function findById(id){
    return db('users').where({id}).first();
}

function findBy(filter){
    return db('user').where(filter).orderBy('id')
}

function find(){
    return db('users').select('id', 'username').orderBy('id');
}