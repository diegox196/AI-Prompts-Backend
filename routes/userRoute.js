const app = require('express');
const userRouter = app.Router();

//Middleware
const checkUserAuth = require('../middlewares/userAuth');
const checkUserRoleAuth = require('../middlewares/userRole');
const requiredRole = "admin";


//Import user http methods
const { getUserById, getAllUsers, addNewUser, updateUserById, deleteUserById } = require('../controllers/userController.js');

// User http methods
userRouter.get('/api/users', checkUserAuth, checkUserRoleAuth([requiredRole]), getAllUsers);
userRouter.get('/api/users/:id', checkUserAuth, checkUserRoleAuth([requiredRole]), getUserById);

userRouter.post('/api/users', addNewUser);
userRouter.patch('/api/users/:id', checkUserAuth, checkUserRoleAuth([requiredRole]), updateUserById);
userRouter.delete('/api/users/:id', checkUserAuth, checkUserRoleAuth([requiredRole]), deleteUserById);

module.exports = userRouter;