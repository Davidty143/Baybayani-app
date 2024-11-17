// /server/api/prisma/get-cart-by-user/[userId].js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const userId = event.context.params.id; // Get userId from the request params
  //console.log(userId);

  try {
    // First, check if a cart already exists for this user
    let cart = await prisma.cart.findFirst({
      where: { userId: userId }, // Pass the userId to find the cart
      include: { cartItems: true },
    });

    if (!cart) {
      // If no cart exists, create a new cart for the user
      cart = await prisma.cart.create({
        data: {
          userId: userId, // Create a cart with the user's ID
        },
      });
      console.log("CREATED NEW CART FOR USER: " + userId);
    }
    return cart;
  } catch (error) {
    console.error("Error fetching or creating cart1:", error);
    return { success: false, message: "Failed to fetch or create cart2" };
  }
});
