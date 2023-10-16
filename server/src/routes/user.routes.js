const express = require("express");
const userController = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/:id", userController.getOne);
userRouter.get("/list-friend/:id", userController.getAllFriend);
userRouter.post("/send-request", userController.sendRequest);

module.exports = userRouter;
