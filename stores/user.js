import { defineStore } from "pinia";

// Refactor: Use the `useSupabaseClient` inside the action, not outside the store
export const useUserStore = defineStore("user", {
  state: () => ({
    isMenuOverlay: false,
    isLoading: false,
    cart: [],
    checkout: [],
    user: null, // Store the authenticated user
  }),

  actions: {
    // Action to fetch the authenticated user from Supabase
    async fetchUser() {
      const client = useSupabaseClient(); // Correctly using useSupabaseClient inside the action

      try {
        const { data, error } = await client.auth.getUser();

        if (error) {
          console.error("Error fetching user:", error);
        } else {
          this.user = data.user;
          console.log("Fetched user ID:", this.user.id);
        }
      } catch (err) {
        console.error("Unexpected error fetching user:", err);
      }
    },

    // Optionally, action to log out the user (clear the user state)
    logout() {
      const client = useSupabaseClient(); // Correctly using useSupabaseClient inside the action
      this.user = null;
      client.auth.signOut(); // This logs the user out of Supabase
    },
  },

  persist: true, // Optional: Persist the state (including user) across page reloads
});
