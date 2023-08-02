const app = require('express');
const userRouter = app.Router(); // Create a new instance of Express Router

// Middleware
const checkUserAuth = require('../middlewares/userAuth'); // Import user authentication middleware
const checkUserRoleAuth = require('../middlewares/userRole'); // Import user role authentication middleware
const protectRouteByUserID = require('../middlewares/protectRouteByUserID'); // Import user role authentication middleware

// Import user controller methods
const { getUserById, getAllUsers, addNewUser, updateUserById, updateUserPasswordById, deleteUserById } = require('../controllers/userController.js');

// User http methods
// Route for getting all users
userRouter.get('/api/users', checkUserAuth, checkUserRoleAuth(["admin"]), getAllUsers);

// Route for getting a specific user by ID
userRouter.get('/api/users/:id', checkUserAuth, checkUserRoleAuth(["admin", "user"]), protectRouteByUserID, getUserById);

// Route for adding a new user
userRouter.post('/api/users', checkUserAuth, checkUserRoleAuth(["admin"]), addNewUser);

// Route for updating a user by ID
userRouter.patch('/api/users/:id', checkUserAuth, checkUserRoleAuth(["admin", "user"]), protectRouteByUserID, updateUserById);

// Route for updating a password by ID
userRouter.patch('/api/users/:id/update-password', checkUserAuth, checkUserRoleAuth(["user"]), protectRouteByUserID, updateUserPasswordById);

// Route for deleting a user by ID
userRouter.delete('/api/users/:id', checkUserAuth, checkUserRoleAuth(["admin"]), deleteUserById);

module.exports = userRouter;