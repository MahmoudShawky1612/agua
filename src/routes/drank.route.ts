import express from "express";
const router = express.Router();

import {
    addDrink,
} from '../controllers/drank.controller';

router.post('/add-drink/:userId', addDrink);

export default router;