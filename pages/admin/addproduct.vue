<template>
  <AdminLayout>
    <div class="flex items-center justify-center w-full h-screen">
      <div
        id="ManageProduct"
        class="w-full h-[120vh] max-w-[1200px] bg-[#fafafa] p-6 rounded-lg"
      >
        <!-- Title -->
        <h1 class="text-2xl font-semibold text-start mb-6">Add Product</h1>

        <!-- Product Form -->
        <form @submit.prevent="addProduct">
          <div class="space-y-4">
            <!-- Title -->
            <div>
              <label
                for="title"
                class="block text-sm font-medium text-gray-700"
              >
                Product Title
              </label>
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
              >
                Product Description
              </label>
              <textarea
                v-model="product.description"
                id="description"
                rows="4"
                required
                class="w-full mt-2 p-3 border border-gray-300 rounded-md"
                placeholder="Enter product description"
              ></textarea>
            </div>

            <!-- Price -->
            <div>
              <label
                for="price"
                class="block text-sm font-medium text-gray-700"
              >
                Price (₱)
              </label>
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

            <!-- Image Upload -->
            <div>
              <label
                for="image"
                class="block text-sm font-medium text-gray-700"
              >
                Product Image
              </label>
              <input
                type="file"
                id="image"
                @change="handleFileChange"
                class="mt-2 p-3 border border-gray-300 rounded-md"
                accept="image/*"
              />
              <div v-if="imagePreview" class="mt-4">
                <p>Image Preview:</p>
                <img
                  :src="imagePreview"
                  alt="Image Preview"
                  class="w-48 h-48 object-cover mt-2"
                />
              </div>
            </div>

            <!-- Searchable and Foldable Farmers List -->
            <div>
              <label
                for="farmers"
                class="block text-sm font-medium text-gray-700"
              >
                Select Farmers
              </label>

              <!-- Search Input -->
              <input
                v-model="searchQuery"
                type="text"
                class="w-full mt-2 p-3 border border-gray-300 rounded-md"
                placeholder="Search farmers..."
              />

              <!-- Toggle Button -->
              <button
                type="button"
                @click="toggleFarmersList"
                class="mt-2 text-blue-600 hover:text-blue-700"
              >
                {{ isFarmersListVisible ? "Hide Farmers" : "Show Farmers" }}
              </button>

              <!-- Farmers List (Checkboxes) -->
              <div
                v-if="isFarmersListVisible"
                class="mt-4 max-h-60 overflow-y-auto"
              >
                <div
                  v-for="farmer in filteredFarmers"
                  :key="farmer.id"
                  class="flex items-center mb-2"
                >
                  <input
                    type="checkbox"
                    :id="'farmer-' + farmer.id"
                    :value="farmer.id"
                    v-model="selectedFarmers"
                    class="mr-2"
                  />
                  <label :for="'farmer-' + farmer.id" class="text-sm">
                    {{ farmer.name }}
                  </label>
                </div>
              </div>
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
import { ref, onBeforeMount, computed } from "vue";
import AdminLayout from "~/layouts/AdminLayout.vue";
import Compressor from "compressorjs"; // Import Compressor.js
const supabase = useSupabaseClient();

// Define product form data
const product = ref({
  title: "",
  description: "",
  price: 0,
  imageUrl: "",
});

const imagePreview = ref(null); // For image preview
const compressedImage = ref(null); // For the compressed image file
const farmers = ref([]); // List of farmers fetched from the backend
const selectedFarmers = ref([]); // Array to hold selected farmers' IDs
const searchQuery = ref(""); // For search input
const isFarmersListVisible = ref(false); // For toggling visibility of the farmers list

// Function to generate a public URL for an asset in a public bucket
function getPublicUrl(bucketName, filePath) {
  const supabaseUrl = "https://ucijbmsogggpigwppfpu.supabase.co"; // Replace with your Supabase project URL
  return `${supabaseUrl}/storage/v1/object/public/${bucketName}/${filePath}`;
}

// Fetch farmers from the API before the component is mounted
onBeforeMount(async () => {
  const response = await fetch("/api/prisma/get-all-farmers");
  const result = await response.json();

  if (response.ok) {
    farmers.value = result; // Populate the farmers list
  } else {
    console.error("Failed to fetch farmers");
  }
});

// Computed property to filter farmers based on search query
const filteredFarmers = computed(() => {
  if (!searchQuery.value) return farmers.value;
  return farmers.value.filter((farmer) =>
    farmer.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Toggle visibility of the farmers list
const toggleFarmersList = () => {
  isFarmersListVisible.value = !isFarmersListVisible.value;
};

// Handle file change and compress the image
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Compress the image using Compressor.js
  new Compressor(file, {
    quality: 0.6, // Set image quality (60%)
    maxWidth: 800, // Resize image to max width 800px (aspect ratio maintained)
    maxHeight: 800, // Resize image to max height 800px (aspect ratio maintained)
    success(result) {
      // Create a new image element to load the compressed image
      const img = new Image();
      img.onload = () => {
        // Create a canvas to crop and resize the image to 800x800
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set the canvas size to 800x800
        canvas.width = 800;
        canvas.height = 800;

        // Calculate the center crop coordinates
        const x = (img.width - 800) / 2; // Crop from the center horizontally
        const y = (img.height - 800) / 2; // Crop from the center vertically

        // Draw the image on the canvas (crop and fit to 800x800)
        ctx.drawImage(img, x, y, 800, 800, 0, 0, 800, 800);

        // Convert the canvas to Blob for uploading
        canvas.toBlob(
          (blob) => {
            // Use the Blob to create a preview URL
            compressedImage.value = blob;
            imagePreview.value = URL.createObjectURL(blob); // Display preview of the resized image
          },
          "image/jpeg",
          0.8
        );
      };
      img.src = URL.createObjectURL(result); // Load the compressed image into the img element
    },
    error(err) {
      console.error("Image compression failed", err);
    },
  });
};

// Add product to the database (with image upload to Supabase)
const addProduct = async () => {
  if (!compressedImage.value) {
    alert("Please upload a valid image.");
    return;
  }

  // Upload the compressed image to Supabase
  const fileName = `products/images/${Date.now()}_${
    compressedImage.value.name
  }`;
  const { data, error } = await supabase.storage
    .from("product-images") // Replace with your Supabase bucket name
    .upload(fileName, compressedImage.value);

  console.log("Upload response:", data); // Log upload response

  if (error) {
    console.error("Image upload failed", error);
    return;
  }

  // Construct the public URL for the uploaded image
  const imageUrl = getPublicUrl("product-images", data.path); // Use the path from the upload response

  console.log("Uploaded Image URL:", imageUrl); // This is where you check the URL

  // Save product data to Supabase, including selected farmers
  await useFetch("/api/prisma/add-product", {
    method: "POST",
    body: {
      title: product.value.title,
      description: product.value.description,
      url: imageUrl, // Save image URL
      price: product.value.price,
      farmerIds: selectedFarmers.value, // Include selected farmer IDs
    },
  });

  // Reset form after submission
  product.value = {
    title: "",
    description: "",
    price: 0,
    imageUrl: "",
  };
  selectedFarmers.value = [];
  imagePreview.value = null;
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
