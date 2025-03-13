import { prisma } from "../db/PrismaClient";

export const DrinkRepo = {
    async addDrink(userId: number,day: string, time: number, isOnTime: boolean, Litre: number){
        const totalDrinks = await prisma.drank.count({
            where: {
              userId,
            },
          });
          const drinksOnTime = await prisma.drank.count({
            where: {
                userId,
                isOnTime: true,
            },
          });
          const accuracy = (drinksOnTime*100)/totalDrinks;
        const drink = await prisma.drank.create({
            data: {
                userId,
                day,
                time,
                isOnTime,
                Litre,
            }
        })
        await prisma.user.update({
            where:{
                id: userId,
            },
            data:{
                totalDrinks,
                accuracy,
            }
        });
        return drink;
    },

    async getDrinks(userId: number) { 
        const drinks = await prisma.drank.findMany({
            where: {
                userId
            }
        });
        return drinks;
    }
}