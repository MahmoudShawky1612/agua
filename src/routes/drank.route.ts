import express from "express";
const router = express.Router();

import {
    addDrink,
    getDrinks,
} from '../controllers/drank.controller';

router.post('/add-drink/:userId', addDrink);
router.get('/get-drinks/:userId', getDrinks);

export default router;