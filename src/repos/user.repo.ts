import { prisma } from "../db/PrismaClient";

export class userRepo {
  async createUser(username: string) {
    const user = await prisma.user.create({
      data: {
        username,
      },
    });
  }
}
