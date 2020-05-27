exports.seed = function(knex){
  return knex('items').insert([
    {
      name: "Pizza",
      potluck_id: 1
    },
    {
      name: "Soda",
      potluck_id: 1
    },
    {
      name: "Cake",
      potluck_id: 1
    },
    {
      name: "Cake",
      potluck_id: 2
    },
    {
      name: "Chips",
      potluck_id: 2
    },
    {
      name: "Pepsi",
      potluck_id: 2
    },
    {
      name: "Beer",
      potluck_id: 3
    },
    {
      name: "Hamburger",
      potluck_id: 3
    },
    {
      name: "Hot dog",
      potluck_id: 3
    }
  ])
}
