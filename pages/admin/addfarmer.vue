<template>
  <div class="max-w-lg mx-auto p-6">
    <h1 class="text-2xl font-semibold text-center mb-6">Create Farmer</h1>

    <!-- Farmer Form -->
    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- Farmer Name -->
      <div class="form-group">
        <label for="name" class="block text-lg font-medium">Farmer Name</label>
        <input
          type="text"
          v-model="farmer.name"
          id="name"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Contact -->
      <div class="form-group">
        <label for="contact" class="block text-lg font-medium">Contact</label>
        <input
          type="text"
          v-model="farmer.contact"
          id="contact"
          class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Product Selection (Checkboxes) -->
      <div class="form-group">
        <label class="block text-lg font-medium">Select Products</label>

        <!-- Search Bar -->
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search products"
          class="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <!-- Product List -->
        <div>
          <button
            type="button"
            @click="toggleCollapse"
            class="text-blue-500 hover:underline mb-2"
          >
            {{ collapsed ? "Show" : "Hide" }} Products
          </button>

          <div v-show="!collapsed">
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              class="flex items-center space-x-2"
            >
              <input
                type="checkbox"
                :id="'product-' + product.id"
                :value="product.id"
                v-model="selectedProducts"
                class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label :for="'product-' + product.id" class="text-lg">{{
                product.title
              }}</label>
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-center">
        <button
          type="submit"
          class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Create Farmer
        </button>
      </div>
    </form>

    <!-- Error and Success Messages -->
    <div v-if="errorMessage" class="mt-4 text-red-600 text-center">
      {{ errorMessage }}
    </div>
    <div v-if="successMessage" class="mt-4 text-green-600 text-center">
      {{ successMessage }}
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount, computed } from "vue";

export default {
  setup() {
    const farmer = ref({
      name: "",
      contact: "",
    });

    const selectedProducts = ref([]); // Array for holding selected product IDs
    const products = ref([]);
    const successMessage = ref("");
    const errorMessage = ref("");
    const searchQuery = ref("");
    const collapsed = ref(true); // Tracks whether the product list is collapsed or expanded

    // Fetch products from the API when the component is mounted
    onBeforeMount(async () => {
      try {
        const response = await fetch("/api/prisma/get-all-products");
        const result = await response.json();

        if (response.ok) {
          products.value = result; // Populate the products list
        } else {
          throw new Error("Failed to fetch products");
        }
      } catch (error) {
        errorMessage.value = "Error fetching products: " + error.message;
      }
    });

    // Computed property to filter products based on the search query
    const filteredProducts = computed(() => {
      if (!searchQuery.value) {
        return products.value;
      }
      return products.value.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    // Toggle collapse state for the product list
    const toggleCollapse = () => {
      collapsed.value = !collapsed.value;
    };

    const submitForm = async () => {
      const newFarmer = {
        name: farmer.value.name,
        contact: farmer.value.contact,
        productIds: selectedProducts.value, // Array of selected product IDs
      };

      try {
        const response = await fetch("/api/prisma/add-farmer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newFarmer),
        });

        const result = await response.json();

        if (response.ok) {
          successMessage.value = "Farmer created successfully!";
          errorMessage.value = "";
          // Reset the form
          farmer.value = { name: "", contact: "" };
          selectedProducts.value = [];
        } else {
          throw new Error(result.error || "Failed to create farmer");
        }
      } catch (error) {
        errorMessage.value = "Error: " + error.message;
        successMessage.value = "";
      }
    };

    return {
      farmer,
      selectedProducts,
      products,
      successMessage,
      errorMessage,
      submitForm,
      searchQuery,
      collapsed,
      toggleCollapse,
      filteredProducts,
    };
  },
};
</script>
