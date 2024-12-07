<template>
  <AdminLayout>
    <div id="ShoppingCartPage" class="mt-4 max-w-[1200px] mx-auto px-2">
      <div
        v-if="!userStore.cartItems.length"
        class="h-[500px] flex items-center justify-center"
      >
        <div class="pt-20">
          <img class="mx-auto" width="250" src="/cart-empty.png" />

          <div class="text-xl text-center mt-4">No items yet?</div>

          <!-- If not logged, goto login page -->
          <div v-if="!user" class="flex text-center">
            <NuxtLink
              to="/auth"
              class="bg-[#FD374F] w-full text-white text-[21px] font-semibold p-1.5 rounded-full mt-4"
            >
              Sign in
            </NuxtLink>
          </div>
        </div>
      </div>

      <div v-else class="md:flex gap-4 justify-between mx-auto w-full">
        <div class="md:w-[65%]">
          <div class="bg-white rounded-lg p-4">
            <div class="text-2xl font-bold mb-2">
              Shopping Cart ({{ userStore.cartItems.length }})
            </div>
          </div>

          <div class="bg-[#FEEEEF] rounded-lg p-4 mt-4">
            <div class="text-red-500 font-bold">
              Always ask for the availability of each item before adding to
              checkout!
            </div>
          </div>

          <!-- The code dynamically renders a list of CartItem components from the user's cart, passing each product's data and selection state, and listens for selection changes to handle updates in the parent component. -->

          <div id="Items" class="bg-white rounded-lg p-4 mt-4">
            <div
              v-for="(cartItem, index) in userStore.cartItems"
              :key="cartItem.id"
            >
              <CartItem
                :product="userStore.cartItems[index].product"
                :selectedArray="selectedArray"
                @selectedRadio="selectedRadioFunc"
              />
            </div>
          </div>
        </div>

        <div class="md:hidden block my-4" />
        <div class="md:w-[35%]">
          <div id="Summary" class="bg-white rounded-lg p-4">
            <div class="text-2xl font-extrabold mb-2">Summary</div>
            <div class="flex items-center justify-between my-4">
              <div class="font-semibold">Total</div>
              <div class="text-2xl font-semibold text-[#FD374F]">
                ₱
                <span class="font-extrabold text-[#FD374F]">{{
                  totalPriceComputed
                }}</span>
              </div>
            </div>
            <button
              @click="goToCheckout"
              class="flex items-center justify-center bg-[#0C6539] w-full text-white text-[21px] font-semibold p-1.5 rounded-full mt-4"
            >
              Checkout
            </button>
          </div>

          <div id="OrderDetails" class="bg-white rounded-lg p-4 mt-4">
            <div class="text-lg font-semibold mb-2">Order Details</div>

            <div class="border-b my-5" />
            <p class="my-2">Total Items: {{ selectedItemsCount }}</p>
            <p class="my-2">Total Unit: {{ totalWeight }} kg</p>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from "~/layouts/AdminLayout.vue";
import { useUserStore } from "~/stores/user";
const userStore = useUserStore();
const user = useSupabaseUser();

let selectedArray = ref([]);

const selectedItemsCount = computed(() => selectedArray.value.length);
const totalWeight = computed(() => {
  return selectedArray.value.reduce((sum, item) => sum + item.quantity, 0);
});

const totalPriceComputed = computed(() => {
  console.log("PRICE COMPUTE FLAG");

  // Log the selectedArray and individual item details
  console.log("Selected Array:", selectedArray.value);

  const total = selectedArray.value.reduce((sum, item) => {
    console.log(
      `Item: ${JSON.stringify(item)}, Price: ${item.price}, Quantity: ${
        item.quantity
      }`
    );
    return sum + item.price * item.quantity;
  }, 0);

  console.log("Total Price:", total);

  return total;
});

// const totalPriceComputed = computed(() => {
//   console.log("PRICE COMPUTE FLAG");

//   return selectedArray.value.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );
// });

const selectedRadioFunc = (e) => {
  const existingIndex = selectedArray.value.findIndex(
    (item) => item.id === e.id
  );

  if (e.val) {
    if (existingIndex === -1) {
      selectedArray.value.push({ ...e, quantity: e.quantity });
    } else {
      selectedArray.value[existingIndex].quantity = e.quantity;
    }
  } else {
    if (existingIndex !== -1) {
      selectedArray.value.splice(existingIndex, 1);
    }
  }
};

const goToCheckout = () => {
  // Step 1: Get the list of selected item IDs
  const ids = selectedArray.value.map((item) => item.id);
  console.log("Selected Item IDs:", ids);

  if (ids.length === 0) {
    console.log("No items selected.");
    return;
  }

  if (!userStore.cartItems || userStore.cartItems.length === 0) {
    console.log("No items in cart.");
    return;
  }

  userStore.checkout = [];
  console.log("Checkout array initialized:", userStore.checkout);

  let res = userStore.cartItems.filter((item) => ids.includes(item.productId));
  console.log("Filtered Cart Items:", res);

  if (res.length === 0) {
    console.log("No matching items found in the cart.");
    return;
  }

  res.forEach((item) => {
    console.log("Adding item to checkout:", item.product);
    userStore.checkout.push(toRaw(item)); // Add the entire item to checkout
  });

  console.log("Checkout array after addition:", userStore.checkout);

  console.log("Navigating to checkout...");
  return navigateTo("/checkout");
};

// const goToCheckout = () => {
//   let ids = [];
//   userStore.checkout = [];
//   selectedArray.value.forEach((item) => ids.push(item.id));
//   let res = userStore.cart.filter((item) => {
//     //   return ids.indexOf(item.id) != -1;
//   });
//   res.forEach((item) => userStore.checkout.push(toRaw(item)));

//   return navigateTo("/checkout");
// };

watchEffect(async () => {
  if (!user.value) {
    await navigateTo("/login");
  }
});
</script>
