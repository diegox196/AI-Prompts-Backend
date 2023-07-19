const app = require('express');
const userRouter = app.Router();

//Middleware
const checkUserAuth = require('../middlewares/userAuth');
const checkUserRoleAuth = require('../middlewares/userRole');
const requiredRole = "admin";


//Import user http methods
const { getUserById, getAllUsers, addNewUser, updateUserById, deleteUserById } = require('../controllers/userController.js');

// User http methods
userRouter.get('/api/user/:id', checkUserAuth, checkUserRoleAuth([requiredRole]), getUserById);
userRouter.get('/api/user', checkUserAuth, checkUserRoleAuth([requiredRole]), getAllUsers);
userRouter.post("/api/user", addNewUser);
userRouter.patch("/api/user/:id", checkUserAuth, checkUserRoleAuth([requiredRole]), updateUserById);
userRouter.delete("/api/user/:id", checkUserAuth, checkUserRoleAuth([requiredRole]), deleteUserById);

module.exports = userRouter;