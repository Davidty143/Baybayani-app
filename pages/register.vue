<template>
  <div id="RegisterPage" class="w-full h-[100vh] bg-white">
    <div
      class="w-full flex items-center justify-center p-5 border-b border-b-gray-300"
    >
      <NuxtLink to="/" class="min-w-[170px]">
        <img width="170" src="/baybayani-logo.png" />
      </NuxtLink>
    </div>

    <div class="max-w-[400px] mx-auto px-4 py-6">
      <div class="text-center my-6 text-2xl font-bold">Register</div>

      <!-- Error message -->
      <div v-if="errorMsg" class="text-red-500 text-center mb-4">
        {{ errorMsg }}
      </div>

      <!-- Success message -->
      <div v-if="successMsg" class="text-green-500 text-center mb-4">
        {{ successMsg }}
      </div>

      <!-- Registration Form -->
      <form @submit.prevent="register" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            class="mt-1 w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            class="mt-1 w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter your password"
            required
          />
        </div>

        <div>
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <input
            type="text"
            id="name"
            v-model="name"
            class="mt-1 w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label for="contact" class="block text-sm font-medium text-gray-700">
            Contact Number
          </label>
          <input
            type="text"
            id="contact"
            v-model="contact"
            class="mt-1 w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter your contact number"
            patter="[0-9]"
            required
          />
        </div>

        <div>
          <label for="role" class="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            id="role"
            v-model="role"
            class="mt-1 w-full p-3 border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>Select your role</option>
            <option value="User">User</option>
            <option value="Admin">Buyer</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            class="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Register
          </button>
        </div>
      </form>

      <div class="mt-4 text-center text-sm">
        <span>Already have an account? </span>
        <NuxtLink to="/login" class="text-blue-500 hover:underline"
          >Login here</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient();
const email = ref("");
const name = ref("");
const role = ref("");
const contact = ref(""); // Optional contact number
const password = ref(null);
const errorMsg = ref(null);
const successMsg = ref(null);

const user = useSupabaseUser();

watchEffect(async () => {
  if (!user.value) {
    await navigateTo("/login");
  }
});

const register = async () => {
  await nextTick();
  try {
    const { error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          name: name.value,
          contact: contact.value,
          role: role.value,
        },
      },
    });

    if (error) {
      errorMsg.value = error.message;
      successMsg.value = null;
    } else {
      successMsg.value = "Successfully registered!";
      errorMsg.value = null;
    }
  } catch (error) {
    errorMsg.value = error.message;
    successMsg.value = null;
  }
};
</script>

<style scoped>
/* You can add additional custom styling here if needed */
</style>
