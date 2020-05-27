exports.seed = function(knex){
  const users = [
    {
      username: 'test1',
      password: 'test1password',
    },
    {
      username: 'test2',
      password: 'test2password',
    },
    {
      username: 'test3',
      password: 'test3password',
    }
  ]
  return knex('users').insert(users).then(()=>console.log('\n Seed data for the user table added \n'));
};