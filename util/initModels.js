// Models
const { Actors } = require('../models/actors.model');
const { ActorsInMovies } = require('../models/actorsInMovies.model');
const { Movies } = require('../models/movies.model');
const { Reviews } = require('../models/movies.model');
const { Users } = require('../models/movies.model');

const initModels = () => {
  // 1 User <----> M Reviews
  Users.hasMany(Reviews);
  Reviews.belongsTo(Users);

  // 1 movies <---> M reviews
  Movies.hasMany(Reviews);
  Reviews.belongsTo(Movies);

  // M movies <---> M actors
  Movies.belongsTo(Actor, {through: ActorsInMovies});
  Actors.belongsTo(Movies, {through: ActorsInMovies});

};

module.exports = { initModels };
