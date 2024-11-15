import { PrismaClient } from "@prisma/client";
import { readBody } from "h3"; // Import readBody from h3

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const userId = event.context.params.id; // Get userId from the request params
  const { productId } = await readBody(event); // Use readBody to get the body of the request

  if (!userId || !productId) {
    return { success: false, message: "User ID or Product ID is missing" };
  }

  try {
    // First, check if the cart exists for this user
    let cart = await prisma.cart.findUnique({
      where: { userId: userId },
      include: { cartItems: true }, // Include cart items in the cart
    });

    // If no cart exists, create a new cart for the user
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: userId, // Create a cart with the user's ID
        },
      });
    }

    // Check if the product already exists in the cart
    const existingCartItem = cart.cartItems.find(
      (item) => item.productId === productId
    );

    if (!existingCartItem) {
      // If the product isn't already in the cart, add it with a quantity of 0
      await prisma.cartItem.create({
        data: {
          cartId: cart.id, // Link the cart item to the cart
          productId: productId, // Link the product to the cart item
          quantity: 0, // Initial quantity is set to 0
        },
      });

      console.log("Product successfully added to cart!");
      return { success: true, message: "Product added to cart!" };
    } else {
      // If the product is already in the cart, return a message
      console.log("Product is already in the cart.");
      return { success: false, message: "Product is already in the cart" };
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return { success: false, message: "Failed to add product to cart" };
  }
});
