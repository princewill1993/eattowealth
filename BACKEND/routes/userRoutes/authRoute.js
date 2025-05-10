import express from "express";
import loginUsers from "../../controllers/userController/loginUsers.js";
import registerUsers from "../../controllers/userController/registerUsers.js";
import isAuthenticated from "../../managers/isAuth.js";

const userRouter = express.Router();

// */ routes
userRouter.post("/login", isAuthenticated, loginUsers);
userRouter.post("/register", registerUsers);

export default userRouter;
