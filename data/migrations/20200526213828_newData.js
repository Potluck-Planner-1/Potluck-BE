
exports.up = function(knex) {
    return knex.schema
    .createTable('users', users=>{
        users.increments();
        users.string('username',255).notNullable().unique();
        users.string('password',255).notNullable();
    })
    .createTable('events', events=>{
        events.increments();
        events.string('event_name', 255).notNullable();
        events.string('date', 255).notNullable();
        events.string('time', 255).notNullable();
        events.string('location', 255).notNullable();
        events.integer('organizer_id').unsigned().notNullable().references('users.id').onUpdate('CASCADE').onDelete('RESTRICT');
    })
    .createTable('items', items=>{
        items.increments();
        items.string('name', 255).notNullable();
        items.integer('potluck_id').unsigned().notNullable().references('events.id').onUpdate('CASCADE').onDelete('RESTRICT');
    })
    .createTable('invitation', invitation=>{
        invitation.increments();
        invitation.integer('potluck_id').unsigned().notNullable().references('events.id').onUpdate('CASCADE').onDelete('RESTRICT');
        invitation.integer('guest_id').unsigned().notNullable().references('users.id').onUpdate('CASCADE').onDelete('RESTRICT');
        invitation.boolean('confirmed').notNullable().defaultTo(false);
    })
    .createTable('guest_item', tbl=>{
        tbl.increments();
        tbl.integer('item_id').unsigned().notNullable().references('items.id').onUpdate('CASCADE').onDelete('RESTRICT');
        tbl.integer('guest_id').unsigned().notNullable().references('users.id').onUpdate('CASCADE').onDelete('RESTRICT');
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('events')
    .dropTableIfExists('items')
    .dropTableIfExists('invitation')
    .dropTableIfExists('guest_item');
};
