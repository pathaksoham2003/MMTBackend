import express from 'express';
import { createTiffinTypeContents, getTiffinTypeContents } from '../controllers/messTiffinTypeContents.js';

const router = express.Router();

router.get("/", getTiffinTypeContents);

router.post("/", createTiffinTypeContents);

export default router;