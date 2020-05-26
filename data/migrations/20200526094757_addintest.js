
exports.up = function(knex) {
    return knex.schema
    .createTable('users', users=>{
        users.increments();
        users.string('username',255).notNullable().unique();
        users.string('password',255).notNullable();
    })
    .createTable('pot', pot=>{
        pot.increments();
        pot.string('potName').notNullable();
        pot.integer('user_id').unsigned().notNullable().references('users.id').onUpdate('CASCADE').onDelete('RESTRICT');
    })
    .createTable('items', items=>{
        items.increments();
        items.string('person', 255).notNullable().unique();
        items.string('item', 255).notNullable();
        items.integer('ammount').notNullable();
    })
    .createTable('pot_items', tbl=>{
        tbl.increments();
        tbl.integer('pot_id').unsigned().notNullable().references('pot.id').onUpdate('CASCADE').onDelete('RESTRICT');
        tbl.integer('items_id').unsigned().notNullable().references('items.id').onUpdate('CASCADE').onDelete('RESTRICT');
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('pot')
    .dropTableIfExists('items')
    .dropTableIfExists('pot_items');
};
