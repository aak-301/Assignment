import express from "express";
import {
  addUserData,
  deleteUserData,
  getRank,
  getAllUserData,
  updateUserScore,
} from "../controllers/user.js";

const router = express.Router();

router.post("/", addUserData);
router.get("/", getAllUserData);
router.get("/:name", getRank);
router.patch("/", updateUserScore);
router.delete("/", deleteUserData);

export default router;
