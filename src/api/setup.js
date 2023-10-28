const api = require("express").Router();

const userRouter = require("./routers/UserAuth");
const locationRouter = require("./routers/locationHandler");

api.use("/users", userRouter);
api.use("/users", locationRouter);

module.exports = api;
