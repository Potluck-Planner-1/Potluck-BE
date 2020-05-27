exports.seed = function(knex){
  return knex('guest_item').insert([
    {
      item_id: 1,
      guest_id: 2,
    },
    {
      item_id:2,
      guest_id: 3
    },
  ])
}
