const express = require("express")
const userRouter = require("./userRouter")

const rootReducer = express.Router();

rootReducer.use("/user", userRouter)

rootReducer.get("/", function (request, response) {
    response.send("Api");
});

module.exports = rootReducer