const express = require('express');
const StartupController = require('./controllers/StartupController');
const UserController = require('./controllers/UserController');
const ApplyController = require('./controllers/ApplyController');

const routes = express.Router();

//startups
routes.get('/startups', StartupController.index);
routes.get('/startupManaged', StartupController.getStartupByUser);
routes.get('/startup/:category', StartupController.getStartupByCategory)

routes.post('/startup', StartupController.store);
routes.post('/startup/:startupId/update', StartupController.update);

//applies
routes.post('/startup/:startupId/apply', ApplyController.apply);

//users
routes.get('/user', UserController.getUserById);
routes.get('/userEmail', UserController.getUserByEmail);
routes.get('/users', UserController.getUsers);

routes.post('/user', UserController.store);
routes.post('/user/:userId/update', UserController.updateUser);



module.exports = routes;