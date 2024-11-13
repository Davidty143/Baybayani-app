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
    },
  });

  return res;
});
