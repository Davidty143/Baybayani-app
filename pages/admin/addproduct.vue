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
import Compressor from "compressorjs"; // Import Compressor.js
const supabase = useSupabaseClient();

// Function to generate a public URL for an asset in a public bucket
function getPublicUrl(bucketName, filePath) {
  const supabaseUrl = "https://ucijbmsogggpigwppfpu.supabase.co"; // Replace with your Supabase project URL
  return `${supabaseUrl}/storage/v1/object/public/${bucketName}/${filePath}`;
}

// Define product form data
const product = ref({
  title: "",
  description: "",
  price: 0,
  imageUrl: "", // Optional for image URL after upload
});

const imagePreview = ref(null); // For image preview
const compressedImage = ref(null); // For the compressed image file

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
        ); // Compress the image further if necessary
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

  console.log("Product title:", product.value.title); // Log product data
  console.log("Product description:", product.value.description); // Log product data
  console.log("Product url:", imageUrl); // Log product data
  console.log("Product price:", product.value.price); // Log product data

  // Save product data to Supabase
  await useFetch("/api/prisma/add-product", {
    method: "POST",
    body: {
      title: product.value.title,
      description: product.value.description,
      url: imageUrl, // Save image URL
      price: product.value.price,
    },
  });

  // Reset form after submission
  product.value = {
    title: "",
    description: "",
    price: 0,
    imageUrl: "",
  };
  imagePreview.value = null;
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
