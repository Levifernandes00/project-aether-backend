const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const StartupController = require('./controllers/StartupController');
const UserController = require('./controllers/UserController');
const ApplyController = require('./controllers/ApplyController');
const PostController = require('./controllers/PostController');

const routes = express.Router();

//startups
routes.get('/startups', StartupController.index);
routes.get('/startupManaged', StartupController.getStartupByUser);
routes.get('/startups/:category', StartupController.getStartupByCategory);
routes.get('/startups/search/:search', StartupController.getStartupBySearch)

routes.post('/startup', StartupController.store);
routes.post('/startup/:startupId/update', StartupController.update);

//applies
routes.post('/startup/:startupId/apply', ApplyController.apply);
routes.post('/startup/:startupId/deleteApply', ApplyController.deleteApply);

//users
routes.get('/user', UserController.getUserById);
routes.get('/userEmail', UserController.getUserByEmail);
routes.get('/users', UserController.getUsers);

routes.post('/user', UserController.store);
routes.post('/user/:userId/update', UserController.updateUser);


routes.post('/postProfile', multer(multerConfig).single('file'), PostController.postProfile);
routes.post('/postStartup', multer(multerConfig).single('file'), PostController.postStartup);
routes.get('/posts', PostController.find);

module.exports = routes;