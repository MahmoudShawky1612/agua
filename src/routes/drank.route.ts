import express from "express";
const router = express.Router();

import {
     getDrinks,
     addDrink
} from '../controllers/drank.controller';

router.post('/add-drink/:userId', (req, res, next) => {
    Promise.resolve(addDrink(req, res)).catch(next);
});
router.get('/get-drinks/:userId', getDrinks);

export default router;