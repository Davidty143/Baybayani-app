import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const res = await prisma.products.create({
    data: {
      id: body.userId,
      title: body.title,
      description: body.description,
      url: body.url,
      price: body.price,
      // Corrected the map function to pass each id as an object
      farmer: {
        connect: body.farmerIds.map((id) => ({ id })), // Correctly map each ID to an object
      },
    },
  });

  return res;
});
