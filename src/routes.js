const express = require('express');
const StartupController = require('./controllers/StartupController');
const UserController = require('./controllers/UserController');

const routes = express.Router();

//startups
routes.get('/startups', StartupController.index);
routes.get('/startupManaged', StartupController.getStartupByUser);

routes.post('/startup', StartupController.store);
routes.post('/updateStartup', StartupController.update);

//users
routes.get('/user', UserController.getUserById);

routes.post('/user', UserController.store);
routes.post('/updateUser', UserController.update);

//applies

module.exports = routes;