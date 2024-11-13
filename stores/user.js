import { defineStore } from "pinia";
import { fetchUserProfile } from "~/services/api.js"; // Import the function

export const useUserStore = defineStore("user", {
  state: () => ({
    isMenuOverlay: false,
    isLoading: false,
    cart: [],
    checkout: [],
    user: null, // auth info
    profile: null, // profile info
  }),

  actions: {
    async fetchUser() {
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
        }
      } catch (err) {
        console.error("Unexpected error fetching user:", err);
      }
    },

    logout() {
      const client = useSupabaseClient();
      this.user = null;
      this.profile = null;
      client.auth.signOut();
    },
  },

  persist: true,
});
