<template>
  <div class="flex justify-start my-2">
    <!-- Check Button -->

    <div class="my-auto">
      <div
        @mouseenter="isHover = true"
        @mouseleave="isHover = false"
        class="flex items-center justify-start p-0.5 cursor-pointer"
      >
        <div
          @click="isSelected = !isSelected"
          class="flex items-center justify-center h-[20px] w-[20px] rounded-full border mr-5 ml-2"
          :class="[
            isHover ? 'border-[#0C6539]' : 'border-gray-300',
            isSelected ? 'bg-[#0C6539]' : '',
          ]"
        >
          <div class="h-[8px] w-[8px] rounded-full bg-white" />
        </div>
      </div>
    </div>

    <!-- Product Image -->
    <img class="rounded-md md:w-[150px] w-[90px]" :src="product.url" />

    <div class="overflow-hidden pl-2 w-full">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center justify-between truncate">
          <span
            class="sm:block hidden bg-[#0C6539] text-white text-[11px] font-semibold px-1.5 rounded-sm min-w-[60px] text-center"
            >Vegetables</span
          >
          <div class="truncate sm:pl-2">{{ product.title }}</div>
        </div>

        <!-- Remove From Cart -->

        <button
          @click="deleteFromCart()"
          class="mx-3 sm:block hidden -mt-0.5 hover:text-red-500"
        >
          <Icon name="material-symbols:delete-outline" size="20" />
        </button>
      </div>

      <!-- Other Text Elements -->

      <div class="text-xl font-semibold text-[#FD374F]">
        ₱
        <span class="font-bold text-[#FD374F]">{{ product.price }}</span>
      </div>

      <div class="flex items-center justify-end">
        <button
          @click="deleteFromCart()"
          class="sm:hidden block -mt-0.5 hover:text-red-500"
        >
          <Icon name="material-symbols:delete-outline" size="20" />
        </button>
      </div>
      <!-- Quantity Selector -->
      <div class="flex items-center justify-between mt-3">
        <button
          @click="decreaseQuantity"
          class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full"
        >
          -
        </button>
        <input
          type="text"
          class="mx-2 w-[50px] text-center border-gray-300 border rounded-md"
          v-model="product.quantity"
          @blur="updateQuantity"
        />
        <button
          @click="increaseQuantity"
          class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/user"; // Import the user store to interact with the global state (e.g., cart)
const userStore = useUserStore(); // Initialize the user store, allowing access to the cart and other user-related data

const props = defineProps(["product", "selectedArray"]); // Define props for `product` and `selectedArray` that will be passed from the parent
const { product, selectedArray } = toRefs(props); // Create reactive references for `product` and `selectedArray` for use in the component

const emit = defineEmits(["selectedRadio"]); // Define the event `selectedRadio` that this component can emit to its parent

let isHover = ref(false);
let isSelected = ref(false);

// const removeFromCart = () => {
//   userStore.cartItems.forEach((prod, index) => {
//     // Iterate over the products in the cart
//     if (prod.id === product.value.id) {
//       // Check if the product in the cart matches the current product
//       userStore.cartItems.splice(index, 1); // If it matches, remove the product from the cart using splice
//     }
//   });
// };

// Function to remove a product from the cart using Supabase
const deleteFromCart = async () => {
  const userId = userStore.user.id; // Assuming userStore holds user data
  const productId = props.product.id; // Assuming props.product holds the product to delete

  console.log("Deleting product:", productId);

  userStore.cartItems = userStore.cartItems.filter(
    (item) => item.productId !== productId
  );

  try {
    const response = await fetch(
      `/api/prisma/remove-product-to-cart/${userId}/${productId}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (data.success === 1) {
      console.log("Product successfully removed from cart!");
      // Optionally update the store or UI here
    } else {
      console.log("Error:", data.message);
    }
  } catch (error) {
    console.error("Error deleting product from cart:", error);
  }
};

watch(
  () => isSelected.value,
  (val) => {
    // Watch for changes in `isSelected` (whether the product is selected)
    emit("selectedRadio", { id: product.value.id, val: val }); // Emit the `selectedRadio` event with the product's `id` and its selection state
  }
);

console.log("testttttt", userStore.cartItems);

// Function to update quantity in the store
const updateQuantity = () => {
  console.log("Updating quantity for product", props.product.id);
  const cartIndex = userStore.cartItems.findIndex(
    (item) => item.productId === props.product.id
  );
  console.log("curent quantity", userStore.cartItems[index].quantity);
  if (cartIndex !== -1) {
    userStore.cartItems[cartIndex].quantity = props.product.quantity; // Update cart item quantity
  }
};

// Function to increase quantity
const increaseQuantity = () => {
  product.value.quantity++; // Increment quantity
  updateQuantity(); // Update the quantity in the store
};

// Function to decrease quantity
const decreaseQuantity = () => {
  if (product.value.quantity > 1) {
    // Prevent decreasing quantity below 1
    product.value.quantity--; // Decrement quantity
    updateQuantity(); // Update the quantity in the store
  }
};
</script>
