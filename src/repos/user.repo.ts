import { prisma } from "../db/PrismaClient";

import { Gender } from "@prisma/client";
export const userRepo = {
  async createUser(username: string, gender: Gender) {
    const user = await prisma.user.create({
      data: {
        username,
        gender,
      },
    });
    return user;
  },
  async getUser(userId: number){
    const user = await prisma.user.findUnique({
      where: {
        id:userId,
      }
    });
    return user;
  }
};
