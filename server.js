const { app } = require('./app');

// Utils
const { sequelize } = require('./util/database');
const { initModels } = require('./util/initModels');

sequelize
  .authenticate()
  .then(() => console.log('Database authenticated'))
  .catch((err) => console.log(err));
  
// Relations
initModels();

sequelize
  .sync()
  .sync({ force: true })
  .then(() => console.log('Database synced'))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
console.log('Movies API running!');
})