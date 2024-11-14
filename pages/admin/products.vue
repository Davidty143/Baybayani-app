<template>
  <LayoutAdmin>
    <!-- Wrapper to hold everything -->
    <div class="relative min-h-screen flex">
      <!-- Sidebar Section -->
      <div
        id="ManageProductSidebar"
        class="fixed top-0 left-0 h-full bg-[#fafafa] shadow-lg z-10 overflow-hidden transition-all duration-300"
        :class="{ 'w-64': sidebarOpen, 'w-20': !sidebarOpen }"
      >
        <!-- Sidebar Content -->
        <div class="flex flex-col w-full h-full p-6 space-y-6">
          <h1
            class="text-xl sm:text-2xl font-semibold text-start mb-6 transition-all duration-300"
            :class="{ 'opacity-0': !sidebarOpen }"
          >
            Product Management
          </h1>

          <!-- Product Stats Boxes -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6"
          >
            <div
              class="border border-gray-300 shadow-md p-4 sm:p-6 rounded-lg text-start"
            >
              <p class="text-sm sm:text-lg font-semibold">Total Products</p>
              <p class="text-2xl sm:text-3xl font-bold">
                {{ products.length }}
              </p>
            </div>
            <div
              class="border border-gray-300 shadow-md p-4 sm:p-6 rounded-lg text-start"
            >
              <p class="text-sm sm:text-lg font-semibold">Displayed</p>
              <p class="text-2xl sm:text-3xl font-bold">0</p>
            </div>
            <div
              class="border border-gray-300 shadow-md p-4 sm:p-6 rounded-lg text-start"
            >
              <p class="text-sm sm:text-lg font-semibold">Hidden</p>
              <p class="text-2xl sm:text-3xl font-bold">0</p>
            </div>
          </div>

          <!-- Search and Add Product Button -->
          <div
            class="flex flex-col sm:flex-row sm:justify-between w-full max-w-[1200px] py-6 space-y-4 sm:space-y-0"
          >
            <div class="relative w-full sm:w-[350px]">
              <input
                v-model="searchQuery"
                @keydown.enter="searchProducts"
                type="text"
                placeholder="Search Products"
                class="w-full p-2 sm:p-3 border border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-1 focus:ring-[#0C6539] text-sm sm:text-base"
              />
              <Icon
                name="ph:magnifying-glass"
                size="20"
                class="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>

            <button
              @click="addProduct"
              class="px-8 sm:px-12 py-2 pl-10 sm:py-3 font-semibold flex justify-between border border-[#0C6539] text-[#0C6539] rounded-lg hover:bg-[#0C6539] hover:text-[#fafafa] flex items-center space-x-3 group text-sm sm:text-base"
            >
              <span>Add Product</span>
              <Icon
                name="ph:plus-bold"
                size="18"
                class="text-[#0C6539] group-hover:text-[#fafafa]"
              />
            </button>
          </div>

          <!-- Product Table -->
          <div
            class="overflow-x-auto bg-[#ffffff] border border-gray-300 rounded-md shadow-sm text-sm sm:text-base"
          >
            <table class="w-full sm:table-auto lg:table-fixed min-w-[600px]">
              <thead>
                <tr>
                  <th
                    class="py-4 px-6 sm:px-8 border-b bg-gray-200 text-center"
                  >
                    Product ID
                  </th>
                  <th
                    class="py-4 px-6 sm:px-8 border-b bg-gray-200 sm:text-center lg:text-left"
                  >
                    Product
                  </th>
                  <th class="py-4 px-6 sm:px-8 border-b bg-gray-200 text-left">
                    Price per kg
                  </th>
                  <th class="py-4 px-6 sm:px-8 border-b bg-gray-200 text-left">
                    Supplier/Farmer
                  </th>
                  <th class="py-4 px-6 sm:px-8 border-b bg-gray-200 text-start">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in filteredProducts" :key="product.id">
                  <td class="py-4 px-6 sm:px-8 border-b text-center">
                    {{ product.id }}
                  </td>
                  <td class="py-4 px-6 sm:px-8 border-b text-left">
                    <div class="flex items-center space-x-4 sm:space-x-6">
                      <img
                        :src="product.url || 'https://via.placeholder.com/50'"
                        alt="Product Image"
                        class="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                      />
                      <span class="text-sm sm:text-base">{{
                        product.title
                      }}</span>
                    </div>
                  </td>
                  <td class="py-4 px-6 sm:px-8 border-b text-left">
                    ₱{{ product.price }}
                  </td>
                  <td class="py-4 px-6 sm:px-8 border-b text-left">Farmer 1</td>
                  <td class="py-4 px-6 sm:px-8 border-b text-start">
                    <button
                      @click="viewProduct(product.id)"
                      class="text-[#0C6539] hover:underline text-xs sm:text-sm"
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

      <!-- Main Content Area (Rest of the page) -->
      <div class="flex-1 ml-20 sm:ml-64 p-6">
        <!-- This is where the rest of the content would go -->
        <!-- You can add your other components here -->
      </div>
    </div>
  </LayoutAdmin>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import LayoutAdmin from "~/layouts/LayoutAdmin.vue";
const client = useSupabaseClient();

const searchQuery = ref("");
const products = ref([]); // Holds the list of products fetched from API

// Sidebar control state
const sidebarOpen = ref(true); // Whether the sidebar is expanded or collapsed

// Fetch products (mocked as previously discussed)
onMounted(async () => {
  try {
    const { data, error } = await client.rpc("get_products");
    if (error) {
      console.error("Error fetching products:", error);
      return;
    }
    products.value = data; // Store the response in the products ref
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});

// Filter products based on the search query
const filteredProducts = computed(() => {
  return products.value.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Handle view product action
const viewProduct = (productId) => {
  console.log(`Viewing product with ID: ${productId}`);
};

// Handle search action
const searchProducts = () => {
  console.log(`Searching for: ${searchQuery.value}`);
};

// Add product action
const addProduct = () => {
  console.log("Redirecting to Add Product Page");
};
</script>

<style scoped>
/* Sidebar hover animation */
#ManageProductSidebar {
  transition: all 0.3s ease;
}

/* Sidebar expand/collapse states */
#ManageProductSidebar.w-20 {
  width: 5rem;
}

#ManageProductSidebar.w-64 {
  width: 16rem;
}

#ManageProductSidebar .opacity-0 {
  opacity: 0;
}

/* Main content should adjust with sidebar */
.ml-20 {
  margin-left: 5rem;
}

.ml-64 {
  margin-left: 16rem;
}

/* Responsive styling for the table and text sizes */
@media (max-width: 640px) {
  table {
    min-width: 500px;
  }
}

@media (min-width: 640px) {
  th,
  td {
    font-size: 14px;
  }
}

@media (min-width: 1024px) {
  .text-xl {
    font-size: 1.25rem;
  }
}
</style>
