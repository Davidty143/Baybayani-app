<template>
  <AdminLayout>
    <div class="flex items-center justify-center w-full h-screen">
      <div
        id="ManageUser"
        class="w-full h-[100vh] max-w-[1200px] bg-[#fafafa] p-6 rounded-lg"
      >
        <!-- Title -->
        <h1 class="text-2xl font-semibold text-start mb-6">User Management</h1>

        <!-- User Stats Boxes -->

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 mb-6">
          <!-- Total Users -->
          <div
            class="border border-gray-300 shadow-md p-6 rounded-lg text-start"
          >
            <p class="text-lg font-semibold">Total Users</p>
            <p class="text-3xl font-bold">{{ totalUsers }}</p>
          </div>

          <!-- Active Users -->
          <div
            class="border border-gray-300 shadow-md p-6 rounded-lg text-start"
          >
            <p class="text-lg font-semibold">Farmers</p>
            <p class="text-3xl font-bold">{{ activeUsers }}</p>
          </div>

          <!-- Buyers -->
          <div
            class="border border-gray-300 shadow-md p-6 rounded-lg text-start"
          >
            <p class="text-lg font-semibold">Buyers</p>
            <p class="text-3xl font-bold">
              {{ suspendedUsers }}
            </p>
          </div>

          <!-- Suspended Users -->
          <div
            class="border border-gray-300 bg-[#fafafa] p-6 shadow-md rounded-lg text-start"
          >
            <p class="text-lg font-semibold">Suspended Users</p>
            <p class="text-3xl font-bold">
              {{ suspendedUsers }}
            </p>
          </div>

          <!-- Active Users -->
          <div
            class="border border-gray-300 p-6 shadow-md rounded-lg text-start"
          >
            <p class="text-lg font-semibold">Active Users</p>
            <p class="text-3xl font-bold">
              {{ recentlyAddedUsers }}
            </p>
          </div>
        </div>

        <!-- Search Container -->
        <div class="flex justify-between w-full max-w-[1200px] py-6">
          <!-- Search Input with Icon -->
          <div class="relative w-[350px]">
            <input
              v-model="searchQuery"
              @keydown.enter="searchUsers"
              type="text"
              placeholder="Search users..."
              class="w-full p-3 border border-gray-300 rounded-lg pl- focus:outline-none focus:ring-1 focus:ring-[#0C6539]"
            />
            <!-- Search Icon -->
            <Icon
              name="ph:magnifying-glass"
              size="20"
              class="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>

          <!-- Add User Button -->
          <button
            @click="addUser"
            class="px-12 py-3 font-semibold border border-[#0C6539] text-[#0C6539] rounded-lg hover:bg-[#0C6539] hover:text-[#fafafa] flex items-center space-x-3 group"
          >
            <!-- Text -->
            <span>Add User</span>

            <!-- Icon -->
            <Icon
              name="ph:plus-bold"
              size="18"
              class="text-[#0C6539] group-hover:text-[#fafafa]"
            />
          </button>
        </div>

        <!-- User Table -->
        <div
          class="overflow-x-auto bg-[#ffffff] border border-gray-300 rounded-md shadow-sm text-lg"
        >
          <table class="w-full table-auto">
            <thead>
              <tr>
                <th class="py-2 px-4 border-b bg-gray-200 text-left">Name</th>
                <th class="py-2 px-4 border-b bg-gray-200 text-left">
                  Contact Number
                </th>
                <th class="py-2 px-4 border-b bg-gray-200 text-left">Email</th>
                <th class="py-2 px-4 border-b bg-gray-200 text-left">Role</th>
                <th class="py-2 px-4 border-b bg-gray-200 text-left">Status</th>
                <th class="py-2 px-4 border-b bg-gray-200 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id">
                <!-- User Name -->
                <td class="py-2 px-4 border-b text-left truncate">
                  {{ user.name }}
                </td>

                <!-- Contact Number -->
                <td class="py-2 px-4 border-b text-left truncate">
                  {{ user.contactNumber }}
                </td>

                <!-- Email -->
                <td class="py-2 px-4 border-b text-left truncate">
                  {{ user.email }}
                </td>

                <!-- Role -->
                <td class="py-2 px-4 border-b text-left">{{ user.role }}</td>

                <!-- Status -->
                <td class="py-2 px-4 border-b text-left">{{ user.status }}</td>

                <!-- Actions (e.g., View button) -->
                <td class="py-2 px-4 border-b text-center">
                  <button
                    @click="viewUser(user.id)"
                    class="text-[#0C6539] hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import AdminLayout from "~/layouts/AdminLayout.vue";

// Simulating some data for demonstration purposes
const users = ref([
  {
    id: 1,
    name: "John Doe",
    contactNumber: "123-456-7890",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    contactNumber: "987-654-3210",
    email: "jane@example.com",
    role: "User",
    status: "Suspended",
  },
  {
    id: 3,
    name: "Alice Johnson",
    contactNumber: "555-123-4567",
    email: "alice@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 4,
    name: "Bob Brown",
    contactNumber: "666-987-6543",
    email: "bob@example.com",
    role: "User",
    status: "Active",
  },
  {
    id: 5,
    name: "Charlie White",
    contactNumber: "777-555-1234",
    email: "charlie@example.com",
    role: "User",
    status: "Suspended",
  },
]);

// Stats data (you can replace this with dynamic data if needed)
const totalUsers = computed(() => users.value.length);
const activeUsers = computed(
  () => users.value.filter((user) => user.status === "Active").length
);
const suspendedUsers = computed(
  () => users.value.filter((user) => user.status === "Suspended").length
);
const recentlyAddedUsers = computed(() => users.value.slice(-2).length); // Example for "recently added"

// Search functionality
const searchQuery = ref("");
const filteredUsers = computed(() => {
  if (searchQuery.value === "") return users.value;
  return users.value.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Methods
const searchUsers = () => {
  // Handle search (filtered automatically by computed property)
};

const addUser = () => {
  // Handle adding a new user (you can implement your logic here)
  alert("Add User functionality");
};

const viewUser = (userId) => {
  // Handle viewing a user (you can redirect or show user details)
  alert(`Viewing user with ID: ${userId}`);
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
