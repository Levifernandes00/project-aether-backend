const express = require('express');
const StartupController = require('./controllers/StartupController');

const routes = express.Router();

routes.get('/startups', StartupController.index);

routes.post('/startup', StartupController.store);
routes.post('/update', StartupController.update);

module.exports = routes;