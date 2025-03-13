import { prisma } from "../db/PrismaClient";

export const RawRepo = {
  async updateRawStreak(userId: number) {
    // Get today's date in the format you're using
    const today = new Date().toISOString().split("T")[0]; // Assuming day is stored as "YYYY-MM-DD"

    // Get yesterday's date
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayFormatted = yesterday.toISOString().split("T")[0];

    // Check if user has completed all 5 times for today
    const todayDrinks = await prisma.drank.findMany({
      where: {
        userId,
        day: today,
      },
    });

    // Count the distinct time values (assuming time is 1-5 representing the 5 daily periods)
    const timeValues = new Set(todayDrinks.map((drink) => drink.time));
    const hasAllFiveTimesToday = timeValues.size === 5;

    // Get or create Raw record
    let rawRecord = await prisma.raw.findUnique({
      where: {
        userId,
      },
    });

    if (!rawRecord) {
      // Create a new Raw record if it doesn't exist
      rawRecord = await prisma.raw.create({
        data: {
          userId,
          raw: 0,
        },
      });
    }

    // Check if yesterday was also complete (all 5 times)
    const yesterdayDrinks = await prisma.drank.findMany({
      where: {
        userId,
        day: yesterdayFormatted,
      },
    });

    const yesterdayTimeValues = new Set(
      yesterdayDrinks.map((drink) => drink.time)
    );
    const completedAllYesterday = yesterdayTimeValues.size === 5;

    // Update the streak based on conditions
    if (hasAllFiveTimesToday) {
      // If yesterday was complete or this is the first successful day, increment streak
      if (completedAllYesterday || rawRecord.raw === 0) {
        await prisma.raw.update({
          where: {
            userId,
          },
          data: {
            raw: rawRecord.raw + 1,
          },
        });
        return rawRecord.raw + 1;
      } else {
        // If today is complete but yesterday wasn't, reset streak to 1
        await prisma.raw.update({
          where: {
            userId,
          },
          data: {
            raw: 1,
          },
        });
        return 1;
      }
    } else {
      // If today is incomplete, leave the current streak as is
      // (We might reset it at the end of the day with the checkAndResetStreak function)
      return rawRecord.raw;
    }
  },

  // Call this at the end of each day to reset streak if user missed drinking that day
  async checkAndResetStreak(userId: number) {
    const today = new Date().toISOString().split("T")[0];

    // Check if user completed all 5 times today
    const todayDrinks = await prisma.drank.findMany({
      where: {
        userId,
        day: today,
      },
    });

    const timeValues = new Set(todayDrinks.map((drink) => drink.time));

    // If user didn't complete all 5 times, reset streak to 0
    if (timeValues.size < 5) {
      await prisma.raw.update({
        where: {
          userId,
        },
        data: {
          raw: 0,
        },
      });
      return 0;
    }

    // Otherwise, keep current streak
    const rawRecord = await prisma.raw.findUnique({
      where: {
        userId,
      },
    });

    return rawRecord?.raw || 0;
  },
};
