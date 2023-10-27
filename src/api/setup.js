const api = require("express").Router();

const userRouter = require("./routers/UserAuth");

api.use("/users", userRouter);

module.exports = api;
