const express = require("express");
const userRouter = require("./userRouter");

const rootRouter = express.Router();

rootRouter.use("/user", userRouter);

rootRouter.get("/", function (request, response) {
  response.send("Api");
});

module.exports = rootRouter;
