exports.seed = function(knex){
  return knex('invitation').insert([
    {
      potluck_id: 1,
      guest_id: 2,
      confirmed: false
    },
    {
      potluck_id: 1,
      guest_id: 3,
      confirmed: false
    },
  ])
}
