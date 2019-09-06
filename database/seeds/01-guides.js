
exports.seed = function(knex) {
      return knex('guides').insert([
        {id: 1, username: 'Arthur', password:'mypassword1', tagline:'What an amazing Trip', age: 25, experience: 10},
        {id: 2, username: 'Ernesto', password:'mypassword2', tagline:'What an amazing Trip II', age: 42, experience: 10},
        {id: 3, username: 'Robert', password:'mypassword3', tagline:'What an amazing Trip III', age: 34, experience: 15},
        {id: 4, username: 'Eduard', password:'mypassword4', tagline:'What an amazing Trip IV', age: 37, experience: 7}
    ]);
};