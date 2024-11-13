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
            <p class="text-3xl font-bold">{{ products.length }}</p>
          </div>

          <!-- Displayed Products -->
          <div
            class="border border-gray-300 shadow-md p-6 rounded-lg text-start"
          >
            <p class="text-lg font-semibold">Displayed</p>
            <p class="text-3xl font-bold">0</p>
            <!-- Replace with actual data if available -->
          </div>

          <!-- Hidden Products -->
          <div
            class="border border-gray-300 shadow-md p-6 rounded-lg text-start"
          >
            <p class="text-lg font-semibold">Hidden</p>
            <p class="text-3xl font-bold">0</p>
            <!-- Replace with actual data if available -->
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
                <td class="py-2 px-4 border-b text-center">{{ product.id }}</td>

                <!-- Product Name and Image -->
                <td class="py-2 px-4 border-b text-left">
                  <div class="flex items-center space-x-3">
                    <img
                      :src="product.url || 'https://via.placeholder.com/50'"
                      alt="Product Image"
                      class="w-20 h-20 object-cover rounded-lg"
                    />
                    <span>{{ product.title }}</span>
                  </div>
                </td>

                <!-- Price per kg -->
                <td class="py-2 px-4 border-b text-left">
                  ₱{{ product.price }}
                </td>

                <!-- Supplier (Farmer) -->
                <td class="py-2 px-4 border-b text-left">Farmer 1</td>

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
import { ref, computed, onMounted } from "vue";
import AdminLayout from "~/layouts/AdminLayout.vue";
const client = useSupabaseClient();

const searchQuery = ref("");
const products = ref([]); // Holds the list of products fetched from API

onMounted(async () => {
  try {
    // Call the Supabase RPC function to fetch products
    const { data, error } = await client.rpc("get_products");
    if (error) {
      console.error("Error:", error);
      return;
    }
    console.log("Products:", data);
    products.value = data; // Store the response in the products ref
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});

// Computed for filtered products based on the search query
const filteredProducts = computed(() => {
  return products.value.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Handle view product action
const viewProduct = (productId) => {
  console.log(`Viewing product with ID: ${productId}`);
  // Implement the logic to navigate to a product detail page
};

// Handle search action (could be triggered by enter key)
const searchProducts = () => {
  console.log(`Searching for: ${searchQuery.value}`);
};

// Add product action (could be triggered by a button)
const addProduct = () => {
  console.log("Redirecting to Add Product Page");
  // Redirect to product add page or open a modal to add a new product
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
