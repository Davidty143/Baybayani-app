<template>
  <AdminLayout>
    <div class="flex items-center justify-center w-full h-screen">
      <div
        id="ManageProduct"
        class="w-full h-[100vh] max-w-[1200px] bg-[#fafafa] p-6 rounded-lg"
      >
        <!-- Title -->
        <h1 class="text-2xl font-semibold text-start mb-6">
          Product Management
        </h1>

        <!-- Product Stats Boxes -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 mb-6">
          <!-- Total Products -->
          <div
            class="border border-gray-300 shadow-md p-6 rounded-lg text-start"
          >
            <p class="text-lg font-semibold">Total Products</p>
            <p class="text-3xl font-bold">{{ totalProducts }}</p>
          </div>

          <!-- Displayed Products -->
          <div
            class="border border-gray-300 shadow-md p-6 rounded-lg text-start"
          >
            <p class="text-lg font-semibold">Displayed</p>
            <p class="text-3xl font-bold">{{ displayedProducts }}</p>
          </div>

          <!-- Hidden Products -->
          <div
            class="border border-gray-300 shadow-md p-6 rounded-lg text-start"
          >
            <p class="text-lg font-semibold">Hidden</p>
            <p class="text-3xl font-bold">{{ hiddenProducts }}</p>
          </div>
        </div>

        <h1 class="text-2xl font-semibold text-start pt-5">Product Catalog</h1>

        <!-- Search Container -->
        <div class="flex justify-between w-full max-w-[1200px] py-6">
          <!-- Search Input with Icon -->
          <div class="relative w-[350px]">
            <input
              v-model="searchQuery"
              @keydown.enter="searchProducts"
              type="text"
              placeholder="Search Products"
              class="w-full p-3 border border-gray-300 rounded-lg pl- focus:outline-none focus:ring-1 focus:ring-[#0C6539]"
            />
            <!-- Search Icon -->
            <Icon
              name="ph:magnifying-glass"
              size="20"
              class="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>

          <!-- Add Product Button -->
          <button
            @click="addProduct"
            class="px-12 py-3 font-semibold border border-[#0C6539] text-[#0C6539] rounded-lg hover:bg-[#0C6539] hover:text-[#fafafa] flex items-center space-x-3 group"
          >
            <!-- Text -->
            <span>Add Product</span>

            <!-- Icon -->
            <Icon
              name="ph:plus-bold"
              size="18"
              class="text-[#0C6539] group-hover:text-[#fafafa]"
            />
          </button>
        </div>

        <!-- Product Table -->
        <div
          class="overflow-x-auto bg-[#ffffff] border border-gray-300 rounded-md shadow-sm text-lg"
        >
          <table class="w-full table-auto">
            <thead>
              <tr>
                <th class="py-2 px-4 border-b bg-gray-200 text-center">
                  Product ID
                </th>
                <th class="py-2 px-4 border-b bg-gray-200 text-left">
                  Product
                </th>
                <th class="py-2 px-4 border-b bg-gray-200 text-left">
                  Price per kg
                </th>
                <th class="py-2 px-4 border-b bg-gray-200 text-left">
                  Supplier/Farmer
                </th>
                <th class="py-2 px-4 border-b bg-gray-200 text-start">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in filteredProducts" :key="product.id">
                <!-- Product ID -->
                <td class="py-2 px-4 border-b truncate text-center">
                  {{ product.id }}
                </td>

                <!-- Product Name -->
                <td class="py-2 px-4 border-b text-left truncate">
                  {{ product.productName }}
                </td>

                <!-- Price per kg -->
                <td class="py-2 px-4 border-b text-left truncate">
                  ₱{{ product.pricePerKg }}
                </td>

                <!-- Supplier -->
                <td class="py-2 px-4 border-b text-left">
                  {{ product.supplier }}
                </td>

                <!-- Actions (e.g., View button) -->
                <td class="py-2 px-4 border-b text-start">
                  <button
                    @click="viewProduct(product.id)"
                    class="text-[#0C6539] hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import AdminLayout from "~/layouts/AdminLayout.vue";

// Sample product data for demonstration purposes
const products = ref([
  {
    id: 1,
    productName: "Apple",
    pricePerKg: 3.5,
    supplier: "Farmer 1",
    status: "Displayed",
  },
  {
    id: 2,
    productName: "Banana",
    pricePerKg: 2.2,
    supplier: "Farmer 2",
    status: "Hidden",
  },
  {
    id: 3,
    productName: "Carrot",
    pricePerKg: 1.8,
    supplier: "Farmer 3",
    status: "Displayed",
  },
  {
    id: 4,
    productName: "Tomato",
    pricePerKg: 2.5,
    supplier: "Farmer 4",
    status: "Displayed",
  },
  {
    id: 5,
    productName: "Potato",
    pricePerKg: 1.2,
    supplier: "Farmer 5",
    status: "Hidden",
  },
]);

// Stats data (replace with dynamic data if needed)
const totalProducts = computed(() => products.value.length);
const displayedProducts = computed(
  () =>
    products.value.filter((product) => product.status === "Displayed").length
);
const hiddenProducts = computed(
  () => products.value.filter((product) => product.status === "Hidden").length
);

// Search functionality
const searchQuery = ref("");
const filteredProducts = computed(() => {
  if (searchQuery.value === "") return products.value;
  return products.value.filter(
    (product) =>
      product.productName
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Methods
const addProduct = () => {
  // Handle adding a new product (e.g., open a modal or navigate to add product page)
  alert("Add Product functionality");
};

const viewProduct = (productId) => {
  // Handle viewing a product (e.g., redirect to a detailed product page or show product details)
  alert(`Viewing product with ID: ${productId}`);
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
