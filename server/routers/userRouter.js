const express = require("express")

const userRouter = express.Router();  // для адресов с "/users"

userRouter.get("/", function (request, response) {
    response.send("User");
});

module.exports = userRouter

// сопоcтавляем роутер с конечной точкой "/users"
