import { prisma } from "../db/PrismaClient";

export const userRepo = {
  async createUser(username: string) {
    const user = await prisma.user.create({
      data: {
        username,
      },
    });
  }
}
