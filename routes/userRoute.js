const app = require('express');
const userRouter = app.Router();

//Middleware
const checkUserAuth = require('../middlewares/userAuth');

//Import user http methods
const { userGet, userPost, userPatch, userDelete } = require('../controllers/userController.js');

// User http methods
userRouter.get("/api/user", checkUserAuth, userGet);
userRouter.post("/api/user", userPost);
userRouter.patch("/api/user", userPatch);
userRouter.delete("/api/user", userDelete);

module.exports = userRouter;