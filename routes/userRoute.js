const app = require('express');
const userRouter = app.Router(); // Create a new instance of Express Router

// Middleware
const checkUserAuth = require('../middlewares/userAuth'); // Import user authentication middleware
const checkUserRoleAuth = require('../middlewares/userRole'); // Import user role authentication middleware
const protectRouteByUserID = require('../middlewares/protectRouteByUserID'); // Import user role authentication middleware
const requiredRole = "admin"; // Define the required role for certain routes

// Import user controller methods
const { getUserById, getAllUsers, addNewUser, updateUserById, deleteUserById } = require('../controllers/userController.js');

// User http methods
// Route for getting all users
userRouter.get('/api/users', checkUserAuth, checkUserRoleAuth([requiredRole]), getAllUsers);

// Route for getting a specific user by ID
userRouter.get('/api/users/:id', checkUserAuth, checkUserRoleAuth([requiredRole, "user"]), protectRouteByUserID, getUserById);

// Route for adding a new user
userRouter.post('/api/users', checkUserAuth, checkUserRoleAuth([requiredRole]), addNewUser);

// Route for updating a user by ID
userRouter.patch('/api/users/:id', checkUserAuth, checkUserRoleAuth([requiredRole]), updateUserById);

// Route for deleting a user by ID
userRouter.delete('/api/users/:id', checkUserAuth, checkUserRoleAuth([requiredRole]), deleteUserById);

module.exports = userRouter;