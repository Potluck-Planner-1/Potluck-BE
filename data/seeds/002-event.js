exports.seed = function(knex){
  return knex('events').insert([
    {
      event_name: "John birthday",
      date: "10/3/2020",
      time: " 8 P.M",
      location: "New York City",
      organizer_id: 1
    },
    {
      event_name: "Mike birthday",
      date: "4/2/2024",
      time: " 7 P.M",
      location: "San Jose",
      organizer_id: 2
    },
    {
      event_name: "Jake Graduation",
      date: "5/30/2021",
      time: " 11 A.M",
      location: "Houston",
      organizer_id: 2
    }
  ])
}
