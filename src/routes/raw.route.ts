import express from "express";
const router = express.Router();

import { getRaw } from '../controllers/raw.controller';

router.get('/get-raw/:userId', getRaw);

export default router;