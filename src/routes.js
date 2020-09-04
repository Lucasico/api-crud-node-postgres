const {Router} = require('express')
const routes = new Router()
const UserController = require('./app/controllers/UserController')
const asyncHandler = require('express-async-handler')



routes.post('/users',asyncHandler(UserController.store));

routes.get('/users', asyncHandler(UserController.index));

routes.put('/users/:id', asyncHandler(UserController.update));

routes.delete('/users/:id', asyncHandler(UserController.delete));


module.exports = routes