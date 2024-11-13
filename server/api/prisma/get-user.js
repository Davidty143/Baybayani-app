import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const res = await prisma.user.findFirst({
    where: { userId: "3acea7ee-979a-4ff9-8ffe-3d7bbaf1576a" },
  });
  return res;
});
