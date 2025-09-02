import express from "express";
import { createMess, getAllMess, getMessById } from "../controllers/mess.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Temporary local storage for uploaded files

// POST /api/mess
router.post("/", upload.array("photos", 5), createMess); // max 5 photos

router.get("/:messId", getMessById);

// GET /api/mess?page=1
router.get("/", getAllMess);

export default router;
