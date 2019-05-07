const placeDestinationsRoutes = require('./place_destinations_routes');
const rolesRoutes = require('./roles_routes');
const conditionsRoutes = require('./conditions_routes');
const dealsRoutes = require('./deals_routes');
const toursRoutes = require('./tours_routes');
const tourOperatorsRoutes = require('./tour_operators_routes');
const touristDestinationsRoutes = require('./tourist_destinations_routes');
const transportRoutes = require('./transports_routes');
const usersRoutes = require('./users_routes');
const foodTypesRoutes = require('./food_types_routes');
const roomTypesRoutes = require('./room_types_routes');

module.exports = function (app, db) {
  placeDestinationsRoutes(app, db);
  rolesRoutes(app, db);
  conditionsRoutes(app, db);
  dealsRoutes(app, db);
  tourOperatorsRoutes(app, db);
  toursRoutes(app, db);
  touristDestinationsRoutes(app, db);
  transportRoutes(app, db);
  usersRoutes(app, db);
  foodTypesRoutes(app, db);
  roomTypesRoutes(app, db);
};