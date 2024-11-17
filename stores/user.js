import { defineStore } from "pinia";
import { fetchUserProfile } from "~/services/api.js"; // Import the function

export const useUserStore = defineStore("user", {
  state: () => ({
    isMenuOverlay: false,
    isLoading: false,
    cart: [], // Assuming this holds the main cart info
    cartItems: [], // This will hold the cart items fetched from the server
    checkout: [],
    user: null, // auth info
    profile: null, // profile info
  }),

  actions: {
    // Fetch user profile and cart items
    async fetchUser() {
      console.log("FETCH USER RUNNING");

      if (this.user) {
        return; // Skip fetching if user is already set
      }
      try {
        const client = useSupabaseClient();
        const { data, error } = await client.auth.getUser();
        if (error) {
          console.error("Error fetching user:", error);
        } else {
          this.user = data.user;
          console.log("Fetched user ID:", this.user.id);
          const profileData = await fetchUserProfile(this.user.id);
          this.profile = profileData;

          // Fetch cart items after the user profile is fetched
          await this.fetchCartItems(); // Call the new action to fetch the cart items
        }
      } catch (err) {
        console.error("Unexpected error fetching user:", err);
      }
    },

    // Logout action
    logout() {
      const client = useSupabaseClient();
      this.user = null;
      this.profile = null;
      this.cartItems = []; // Clear cart items on logout
      client.auth.signOut();
    },

    // New action to fetch the cart items
    async fetchCartItems() {
      console.log("FETCH CART RUNNING");
      const userId = this.user?.id;
      console.log("Fetching cart items for user ID:", userId);

      if (userId) {
        try {
          // Replace with your actual API endpoint
          const response = await useFetch(
            `/api/prisma/get-cart-by-user/${userId}`
          );

          if (response.data && response.data.cartItems) {
            this.cartItems = response.data.cartItems; // Set the fetched cart items
            console.log("Cart items fetched successfully");
          } else {
            console.warn("No cart items found for this user.");
          }
        } catch (error) {
          console.error("Failed to fetch cart:", error);
        }
      } else {
        console.warn("No user ID found, cannot fetch cart items.");
      }
    },
  },

  persist: true, // This will persist the store data
});
