import { Request, Response } from 'express';
import { DrinkRepo } from '../repos/drank.repo';

 
export const addDrink = async (req: Request, res: Response) => {
    try {
        const { drinkTime } = req.body;
        if (!drinkTime) {
            return res.status(400).json({ msg: "drinkTime is required" });
        }

        const frontendTime = new Date(drinkTime);
        const serverTime = new Date();

        if (isNaN(frontendTime.getTime())) {
            return res.status(400).json({ msg: "Invalid drinkTime provided" });
        }

        const frontendHour = frontendTime.getHours();
        const serverHour = serverTime.getHours();
        const isOnTime = frontendHour === serverHour;

        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const day = days[serverTime.getDay()];

        console.log("Frontend Hour:", frontendHour, "Server Hour:", serverHour, "Is on time:", isOnTime, "Day:", day);

        const drank = await DrinkRepo.addDrink(+req.params.userId, day, frontendHour, isOnTime, 1);
        return res.status(201).json({ msg: "Good Work, Keep Going", drank });
    } catch (error) {
        console.error("Error adding drink:", error);
        return res.status(400).json({ msg: "There's something wrong" });
    }
};

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