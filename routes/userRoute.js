const app = require('express');
const userRouter = app.Router();

//Middleware
const checkUserAuth = require('../middlewares/userAuth');

//Import user http methods
const { getUserById, getAllUsers, addNewUser, updateUserById, deleteUserById } = require('../controllers/userController.js');

// User http methods
userRouter.get('/api/user/:id', checkUserAuth, getUserById);
userRouter.get('/api/user', checkUserAuth, getAllUsers);
userRouter.post("/api/user", addNewUser);
userRouter.patch("/api/user/:id", checkUserAuth, updateUserById);
userRouter.delete("/api/user/:id", checkUserAuth, deleteUserById);

module.exports = userRouter;