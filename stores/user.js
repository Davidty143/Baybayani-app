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
      if (this.user) {
        return; // Skip fetching if user is already set
      }
      console.log("FETCH USER RUNNING");
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
      this.cart = [];
      this.isMenuOverlay = false;
      client.auth.signOut();
      return navigateTo("/");
    },

    // New action to fetch the cart items
    async fetchCartItems() {
      let cartResponse = ref(null);
      console.log("FETCH READY TO RUN");
      //if (this.cart) return;
      console.log("FETCH CART RUNNING");
      const userId = this.user?.id;
      console.log("Fetching cart items for user ID:", userId);

      if (userId) {
        try {
          // Replace with your actual API endpoint
          cartResponse.value = await useFetch(
            `/api/prisma/get-cart-by-user/${userId}`
          );
          console.log("THIS IS A TEST");
          if (cartResponse.value.data) {
            this.cart = cartResponse.value.data;
          }

          if (cartResponse.value.data && cartResponse.value.data.cartItems) {
            this.cartItems = cartResponse.value.data.cartItems; // Set the fetched cart items
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
