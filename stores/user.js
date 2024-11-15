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
      this.isLoading = true; // Start loading

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
      } finally {
        console.log("Setting isLoading to false");
        this.isLoading = false; 
      }
      console.log("UserStore State after fetching:", JSON.stringify(this.$state, null, 2));    
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

