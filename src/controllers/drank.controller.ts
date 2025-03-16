import { Request, Response } from 'express';
import { DrinkRepo } from '../repos/drank.repo';

export const addDrink = async(
    req: Request,
    res: Response,
) => {
    try {
        const now = new Date();
        const time = now.getHours();
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const onTimeHours = [1, 7, 10, 13, 16, 19];
        const isOnTime = onTimeHours.includes(time)?true:false;
        const day = days[now.getDay()];
        const drank = await DrinkRepo.addDrink(+req.params.userId, day, time, isOnTime, 1);
         res.status(201).json({ msg: "Good Work, Keep Going", drank: drank });
    } catch (error) {
         res.status(400).json({msg:"There's something wrong"})
    }
}

export const getDrinks = async(
    req: Request,
    res: Response,
) => {
    try {
        const drinks = await DrinkRepo.getDrinks(+req.params.userId);
        res.status(200).json({ msg: "Success", drank: drinks });
    } catch (error) {
        res.status(404).json({msg:"There's something wrong"})
    }
}