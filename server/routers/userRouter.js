const express = require("express");
const userRouter = express.Router();

const { getUser, test } = require("../controllers/userController");

userRouter.get("/", getUser);
userRouter.get("/test", test);

module.exports = userRouter;
