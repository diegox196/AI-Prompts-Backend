const app = require('express');
const userRouter = app.Router();

//Middleware
const checkUserAuth = require('../middlewares/userAuth');

//Import user http methods
const { getUserById, getAllUsers, addNewUser, updateUserById, deleteUserById } = require('../controllers/userController.js');

// User http methods
userRouter.get('/api/user/:id', getUserById);
userRouter.get('/api/user', getAllUsers);
userRouter.post("/api/user", addNewUser);
userRouter.patch("/api/user/:id", updateUserById);
userRouter.delete("/api/user/:id", deleteUserById);

module.exports = userRouter;