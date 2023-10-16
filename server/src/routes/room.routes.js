const express = require("express");
const roomController = require("../controllers/room.controller");
const {
  checkRoomIsExit,
  checkRoomIsEmpty,
} = require("../middlewares/room.middleware");

const roomRouter = express.Router();

roomRouter.post("/", checkRoomIsEmpty, checkRoomIsExit, roomController.create);
roomRouter.get("/list-room/:id", roomController.findRoomByUserId);

module.exports = roomRouter;
