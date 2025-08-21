import express from "express";
import TiffinTypes from "../models/TiffinTypes.js";
import {createType,getTypes} from "../controllers/tiffinType.js"
const router = express.Router();

router.post("/", createType);

router.get("/", getTypes);

export default router;
