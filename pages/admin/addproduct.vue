<template>
  <AdminLayout>
    <div class="flex items-center justify-center w-full h-screen">
      <div
        id="ManageProduct"
        class="w-full h-[100vh] max-w-[1200px] bg-[#fafafa] p-6 rounded-lg"
      >
        <!-- Title -->
        <h1 class="text-2xl font-semibold text-start mb-6">Add Product</h1>

        <!-- Product Form -->
        <form @submit.prevent="addProduct">
          <div class="space-y-4">
            <!-- Title -->
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700"
                >Product Title</label
              >
              <input
                v-model="product.title"
                id="title"
                type="text"
                required
                class="w-full mt-2 p-3 border border-gray-300 rounded-md"
                placeholder="Enter product title"
              />
            </div>

            <!-- Description -->
            <div>
              <label
                for="description"
                class="block text-sm font-medium text-gray-700"
                >Product Description</label
              >
              <textarea
                v-model="product.description"
                id="description"
                rows="4"
                required
                class="w-full mt-2 p-3 border border-gray-300 rounded-md"
                placeholder="Enter product description"
              ></textarea>
            </div>

            <!-- URL -->
            <div>
              <label for="url" class="block text-sm font-medium text-gray-700"
                >Product URL</label
              >
              <input
                v-model="product.url"
                id="url"
                type="text"
                required
                class="w-full mt-2 p-3 border border-gray-300 rounded-md"
                placeholder="Enter product URL"
              />
            </div>

            <!-- Price -->
            <div>
              <label for="price" class="block text-sm font-medium text-gray-700"
                >Price (in cents)</label
              >
              <input
                v-model="product.price"
                id="price"
                type="number"
                required
                min="0"
                class="w-full mt-2 p-3 border border-gray-300 rounded-md"
                placeholder="Enter product price"
              />
            </div>

            <!-- Submit Button -->
            <div class="mt-6 text-right">
              <button
                type="submit"
                class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
              >
                Add Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from "vue";
import AdminLayout from "~/layouts/AdminLayout.vue";

// Define product form data
const product = ref({
  title: "",
  description: "",
  url: "",
  price: 0,
});
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
