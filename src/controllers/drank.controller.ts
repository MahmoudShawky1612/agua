import { Request, Response } from "express";
import { DrinkRepo } from "../repos/drank.repo";

export const addDrink = async (req: Request, res: Response) => {
  try {
    const { drinkTime } = req.body; // e.g. { '2025-07-07T15:00:00.000': 3 }

    const isoString = Object.keys(drinkTime)[0]; // '2025-07-07T15:00:00.000'
    const drinkHour = new Date(isoString).getHours(); // 15
    const drinkValue = Object.values(drinkTime)[0]; // 3

    const serverTime = new Date();

    const onTime: { [key: number]: number } = {
      3: 0,
      9: 1,
      12: 2,
      15: 3,
      18: 4,
      23: 5,
    };

    const isOnTime = onTime[drinkHour] === drinkValue;

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = days[serverTime.getDay()];

    console.log(
      "Frontend Hour:",
      drinkHour,
      "Value:",
      drinkValue,
      "Is on time:",
      isOnTime,
      "Day:",
      day
    );

    const drank = await DrinkRepo.addDrink(
      +req.params.userId,
      day,
      drinkHour,
      isOnTime,
      1
    );

    return res.status(201).json({ msg: "Good Work, Keep Going", drank });
  } catch (error) {
    console.error("Error adding drink:", error);
    return res.status(400).json({ msg: "There's something wrong" });
  }
};

export const getDrinks = async (req: Request, res: Response) => {
  try {
    const drinks = await DrinkRepo.getDrinks(+req.params.userId);
    res.status(200).json({ msg: "Success", drank: drinks });
  } catch (error) {
    res.status(404).json({ msg: "There's something wrong" });
  }
};
