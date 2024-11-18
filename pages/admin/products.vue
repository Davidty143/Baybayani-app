<template>
  <div class="flex h-screen">
    <!-- Sidebar Layout -->
    <SideBarLayout class="sidebar" />

    <!-- Admin Layout -->
    <AdminLayout class="admin-layout">
      <div class="main-content flex-1 overflow-y-auto">
        <!-- Product Catalog Content -->
        <div class="p-6 bg-gray-100 min-h-screen">
          <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
            <div class="p-4">
              <h1 class="text-2xl font-semibold text-gray-700">Product Catalog</h1>
              <div class="mt-4 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search product here..."
                  class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-400"
                />
                <button class="p-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 5l7 7-7 7M2 12h20"
                    />
                  </svg>
                </button>
              </div>
              <!-- Updated Add New Button -->
              <a
                href="./addproduct"
                class="mt-4 flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add new
              </a>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full border-collapse border border-gray-200 mt-4 text-left">
                <thead class="bg-gray-100">
                  <tr>
                    <th class="p-3 border border-gray-200">Product ID.</th>
                    <th class="p-3 border border-gray-200">Product</th>
                    <th class="p-3 border border-gray-200">Price per kg</th>
                    <th class="p-3 border border-gray-200">Supplier / Farmer</th>
                    <th class="p-3 border border-gray-200">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="bg-white border-b hover:bg-gray-50"
                    v-for="product in products"
                    :key="product.id"
                  >
                    <td class="p-3 border border-gray-200">{{ product.id }}</td>
                    <td class="p-3 border border-gray-200 flex items-center gap-2">
                      <img
                        :src="product.image"
                        alt="Product"
                        class="w-8 h-8 rounded-full"
                      />
                      {{ product.name }}
                    </td>
                    <td class="p-3 border border-gray-200">₱{{ product.price }}</td>
                    <td class="p-3 border border-gray-200">
                      <span>{{ product.suppliers.join(", ") }}</span>
                    </td>
                    <td
                      class="p-3 border border-gray-200 flex items-center gap-2"
                    >
                      <button class="p-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 text-gray-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12h.01M12 12h.01M9 12h.01M4 21v-6a2 2 0 012-2h14a2 2 0 012 2v6M10 5h4M6 21v-6m12 6v-6m-8 0h6M2 15h20"
                          />
                        </svg>
                      </button>
                      <button class="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <button class="p-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 text-gray-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12h.01M12 12h.01M9 12h.01M4 21v-6a2 2 0 012-2h14a2 2 0 012 2v6"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  </div>
</template>

<script>
import AdminLayout from "@/layouts/AdminLayout.vue";
import SideBarLayout from "@/layouts/SideBarLayout.vue";

export default {
  components: {
    AdminLayout,
    SideBarLayout,
  },
  data() {
    return {
      products: [
        {
          id: "#12345AB",
          name: "Tomato",
          price: 50,
          image: "https://via.placeholder.com/32",
          suppliers: ["Farmer 1", "Farmer 2", "Farmer 3"],
        },
        {
          id: "#45657CD",
          name: "Eggplant",
          price: 100,
          image: "https://via.placeholder.com/32",
          suppliers: ["Farmer 1", "Farmer 2"],
        },
        {
          id: "#78910EF",
          name: "Onion",
          price: 75,
          image: "https://via.placeholder.com/32",
          suppliers: ["Farmer 1", "Farmer 2", "Farmer 3"],
        },
        {
          id: "#12131GH",
          name: "Cabbage",
          price: 60,
          image: "https://via.placeholder.com/32",
          suppliers: ["Farmer 1", "Farmer 3", "Farmer 5"],
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Full screen layout with flexbox */
.h-screen {
  height: 100vh;
}

.sidebar {
  position: fixed; /* Fix the sidebar to the left */
  top: 0;
  left: 0;
  width: 250px; /* Adjust width as necessary */
  height: 100vh; /* Sidebar takes full height */
  background-color: #f7f7f7; /* Sidebar background */
  z-index: 1; /* Ensure it's behind the admin layout */
}

.admin-layout {
  position: relative; /* Ensure admin layout sits on top of the sidebar */
  z-index: 2; /* Ensure the admin layout content is above the sidebar */
  flex-grow: 1;
  padding-left: 250px; /* Creates space for the sidebar on the left */
  padding-top: 80px; /* Adjust padding for the header */
}

.main-content {
  padding: 20px;
  margin-left: 250px; /* Ensure the content starts after the sidebar */
  background-color: #fafafa; /* Background to differentiate from sidebar */
  width: calc(100% - 250px); /* Ensure content takes up the remaining width */
}

.overflow-y-auto {
  overflow-y: auto; /* Enable scrolling in main content area if needed */
}

</style>
