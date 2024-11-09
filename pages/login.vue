<template>
    <div id="AuthPage" class="w-full h-[100vh] bg-white">
        <!-- Header with logo -->
        <div class="w-full flex items-center justify-center p-5 border-b border-b-gray-300">
            <NuxtLink to="/" class="min-w-[170px]">
                <img width="170" src="/baybayani-logo.png" alt="Logo" />
            </NuxtLink>
        </div>

        <div class="max-w-[400px] mx-auto px-2">
            <!-- Page Title -->
            <div class="text-center my-6 text-2xl font-bold">Login</div>

            <!-- Error message -->
            <div v-if="errorMsg" class="text-red-500 text-center mb-4">
                {{ errorMsg }}
            </div>

            <!-- Success message -->
            <div v-if="successMsg" class="text-green-500 text-center mb-4">
                {{ successMsg }}
            </div>

            <!-- Login form-->
            <form @submit.prevent="login" class="space-y-4">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" v-model="email" @input="resetMessages"
                        class="mt-1 w-full p-3 border border-gray-300 rounded-md" placeholder="Enter your email"
                        required />
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password" v-model="password" @input="resetMessages"
                        class="mt-1 w-full p-3 border border-gray-300 rounded-md" placeholder="Enter your password"
                        required />
                </div>

                <div>
                    <button type="submit" :disabled="loading"
                        class="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        <span v-if="loading">Logging in...</span>
                        <span v-else>Login</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';  // To redirect after login

const router = useRouter();
const client = useSupabaseClient();
const email = ref('');
const password = ref('');
const errorMsg = ref(null);
const successMsg = ref(null);
const loading = ref(false);

// Reset error and success messages when user changes input
const resetMessages = () => {
    errorMsg.value = null;
    successMsg.value = null;
};

// Login function
const login = async () => {
    loading.value = true;
    errorMsg.value = null;
    successMsg.value = null;

    try {
        const { error } = await client.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        });

        if (error) {
            errorMsg.value = error.message;
            successMsg.value = null;
        } else {
            successMsg.value = 'Successfully logged in!';
            errorMsg.value = null;

            // Redirect user to the homepage or dashboard after successful login
            router.push('/'); // You can change this to any route you want
        }
    } catch (error) {
        errorMsg.value = error.message;
        successMsg.value = null;
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
/* You can add additional custom styling here if needed */
</style>
