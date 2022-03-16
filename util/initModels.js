// Models
const { actors } = require('../models/actors.model');
const { actorsInMovies } = require('../models/actorsInMovies.model');
const { movies } = require('../models/movies.model');
const { reviews } = require('../models/movies.model');
const { users } = require('../models/movies.model');

const initModels = () => {
  // 1 User <----> M Reviews
  users.hasMany(reviews);
  reviews.belongsTo(users);

  // 1 movies <---> M reviews
  movies.hasMany(reviews);
  reviews.belongsTo(movies);

  // 1 movies <---> M actorsInMovies
  movies.hasMany(actorsInMovies);
  actorsInMovies.belongsTo(movies);

  // 1 actors <---> M actorsInMovies
  actors.hasMany(actorsInMovies);
  actorsInMovies.belongsTo(actors);
};

module.exports = { initModels };
