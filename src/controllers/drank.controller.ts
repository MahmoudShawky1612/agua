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
        const onTimeHours = [3, 9, 12, 15, 18, 21];
        const isOnTime = onTimeHours.includes(time);
        const day = days[now.getDay()];
        const drank = await DrinkRepo.addDrink(+req.params.userId, day, time, isOnTime, 1);
        res.status(201).json({ msg: "Drink logged successfully", drank: drank });
    } catch (error) {
        
    }
}