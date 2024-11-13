import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    console.log("Starting Prisma query to fetch products");
    const products = await prisma.products.findMany({});
    console.log("Fetched products:", products.length);

    // Additional checks (e.g., check if products array is empty)
    if (products.length === 0) {
      console.log("No products found in the database.");
    } else {
      console.log(`${products.length} products found.`);
    }

    // Return the products
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Rethrow the error if you want to handle it further up the stack
  }
});
