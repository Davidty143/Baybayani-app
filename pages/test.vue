<template>
  <div>
    <!-- Display the user information if it's loaded -->
    <h1 v-if="currentUser">User ID: {{ currentUser.id }}</h1>
    <p v-if="currentUser">Email: {{ currentUser.email }}</p>
    <p v-if="currentUser">Name: {{ currentUser.name }}</p>

    <!-- Display an error message if there's an error -->
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Define the `currentUser` and `error` reactive variables
const currentUser = ref(null);
const error = ref(null);

// Use `useAsyncData` to fetch user data both on SSR and client side
const { data, error: fetchError } = await useAsyncData(
  "user-data",
  async () => {
    const userId = "5699ff40-671f-4e15-aaf5-3f5daf1abb5c"; // Example user ID

    try {
      // Fetch user data from the API
      const response = await useFetch(`/api/prisma/get-user/${userId}`, {
        ssr: true, // Enable SSR
      });

      // Check for any error during the fetch
      if (response.error.value) {
        throw new Error(
          response.error.value.message || "Failed to fetch user data."
        );
      }

      // Return the user data if the fetch was successful
      return response.data.value;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to fetch user data.");
    }
  }
);

// Assign the data to the `currentUser` and handle any errors
if (data.value) {
  currentUser.value = data.value;
} else if (fetchError.value) {
  error.value = fetchError.value.message || "Failed to fetch user data.";
}
</script>

<style scoped>
.error {
  color: red;
  font-size: 14px;
}
</style>
