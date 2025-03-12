import { prisma } from "../db/PrismaClient";

export const DrinkRepo = {
    async addDrink(userId: number,day: string, time: number, isOnTime: boolean, Litre: number){
        
        const drink = await prisma.drank.create({
            data: {
                userId,
                day,
                time,
                isOnTime,
                Litre,
            }
        })
        return drink;

    }
}