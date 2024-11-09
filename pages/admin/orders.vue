<template>
  <AdminLayout>
    <div
      id="ManageOrder"
      class="mt-4 max-w-[1200px] mx-auto min-h-[50vh] bg-[#fafafa] p-5 px-8 rounded-md"
    >
      <h1 class="text-2xl font-semibold text-start mb-6">Order Summary</h1>

      <!-- Order Stats Section -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <!-- Total Orders -->
        <div class="border border-gray-300 shadow-md p-6 rounded-lg text-start">
          <p class="text-lg font-semibold">Total Orders</p>
          <p class="text-3xl font-bold">{{ totalOrders }}</p>
        </div>

        <!-- Pending Orders -->
        <div class="border border-gray-300 shadow-md p-6 rounded-lg text-start">
          <p class="text-lg font-semibold">Pending Orders</p>
          <p class="text-3xl font-bold">{{ pendingOrders }}</p>
        </div>

        <!-- Completed Orders -->
        <div class="border border-gray-300 shadow-md p-6 rounded-lg text-start">
          <p class="text-lg font-semibold">Completed Orders</p>
          <p class="text-3xl font-bold">{{ completedOrders }}</p>
        </div>
      </div>

      <h1 class="text-2xl font-semibold text-start pt-10">Recent Orders</h1>

      <!-- Search Section -->
      <div class="flex justify-between py-6">
        <div class="relative w-[350px]">
          <input
            v-model="searchQuery"
            @keydown.enter="searchOrders"
            type="text"
            placeholder="Search Order ID or Customer Name"
            class="w-full p-3 border border-gray-300 rounded-lg pl-5 focus:outline-none focus:ring-1 focus:ring-[#0C6539]"
          />
          <Icon
            name="ph:magnifying-glass"
            size="20"
            class="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      <!-- Orders Section -->
      <div v-if="orders && orders.length > 0" class="space-y-4">
        <div
          v-for="order in filteredOrders"
          :key="order.id"
          class="border-b py-4"
        >
          <div class="flex justify-between items-center">
            <p class="font-semibold">Order ID: {{ order.id }}</p>
            <span
              :class="{
                'text-green-600': order.status === 'Completed',
                'text-yellow-600': order.status === 'Pending',
              }"
              >{{ order.status }}</span
            >
          </div>
          <p class="text-sm">Customer: {{ order.customerName }}</p>
          <p class="text-sm">Total: ${{ order.totalPrice.toFixed(2) }}</p>

          <!-- View Order Button -->
          <button
            @click="viewOrder(order.id)"
            class="mt-2 px-4 py-2 text-white bg-[#0C6539] rounded-lg hover:bg-[#0A4D29]"
          >
            View Details
          </button>
        </div>
      </div>

      <!-- No Orders Message -->
      <div v-else class="flex items-center justify-center text-lg">
        You have no orders.
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import AdminLayout from "~/layouts/AdminLayout.vue";

// Simulated order data (replace with actual API calls)
const orders = ref([
  {
    id: 1,
    customerName: "John Doe",
    totalPrice: 120.5,
    status: "Pending",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    totalPrice: 80.75,
    status: "Completed",
  },
  {
    id: 3,
    customerName: "Alice Johnson",
    totalPrice: 250.3,
    status: "Pending",
  },
  {
    id: 4,
    customerName: "Bob Brown",
    totalPrice: 90.2,
    status: "Completed",
  },
  {
    id: 5,
    customerName: "Charlie White",
    totalPrice: 50.0,
    status: "Pending",
  },
]);

// Computed stats data
const totalOrders = computed(() => orders.value.length);
const pendingOrders = computed(
  () => orders.value.filter((order) => order.status === "Pending").length
);
const completedOrders = computed(
  () => orders.value.filter((order) => order.status === "Completed").length
);

// Search functionality
const searchQuery = ref("");
const filteredOrders = computed(() => {
  if (searchQuery.value === "") return orders.value;
  return orders.value.filter(
    (order) =>
      order.customerName
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      order.id.toString().includes(searchQuery.value)
  );
});

// Methods
const searchOrders = () => {
  // Automatically handled by computed property
};

const viewOrder = (orderId) => {
  // Redirect to order details page (example)
  alert(`Redirecting to order details for Order ID: ${orderId}`);
};
</script>

<style scoped>
/* You can add custom styles here if needed */
</style>
