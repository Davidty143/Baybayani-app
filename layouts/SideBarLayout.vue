<template>
    <div class="flex h-screen">
      <!-- Sidebar Section -->
      <nav class="bg-green-700 text-white w-64 flex flex-col justify-center p-4 sticky top-0 h-screen">
        <ul class="space-y-6">
          <!-- Dashboard -->
          <li>
            <a
              href="../admin/dashboard"
              class="flex items-center space-x-4 text-md font-medium hover:text-green-700 hover:bg-yellow-500 p-3 rounded-lg transition duration-300"
            >
              <!-- Icon -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 10h18M9 21V10m6 11V10m6-8H3a2 2 0 00-2 2v14a2 2 0 002 2h18a2 2 0 002-2V4a2 2 0 00-2-2z"
                />
              </svg>
              <span>Dashboard</span>
            </a>
          </li>
  
          <!-- Chat -->
          <li>
            <a
              href="/chat"
              class="flex items-center space-x-4 text-md font-medium hover:text-green-700 hover:bg-yellow-500 p-3 rounded-lg transition duration-300"
            >
              <!-- Icon -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7 8h10M7 12h4m-6 4h14a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12l2-2z"
                />
              </svg>
              <span>Chat</span>
            </a>
          </li>
  
          <!-- Orders -->
          <li>
            <a
              href="../admin/orders"
              class="flex items-center space-x-4 text-md font-medium hover:text-green-700 hover:bg-yellow-500 p-3 rounded-lg transition duration-300"
            >
              <!-- Icon -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 8V4m0 0a4 4 0 11-4 4M4 8h16"
                />
              </svg>
              <span>Order</span>
            </a>
          </li>
  
          <!-- Product -->
          <li>
            <a
              href="../admin/products"
              class="flex items-center space-x-4 text-md font-medium hover:text-green-700 hover:bg-yellow-500 p-3 rounded-lg transition duration-300"
            >
              <!-- Icon -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 8h18M7 16V8m4 8V8m4 8V8m4 8V8"
                />
              </svg>
              <span>Product</span>
            </a>
          </li>
  
          <!-- User -->
          <li>
            <a
              href="../admin/users"
              class="flex items-center space-x-4 text-md font-medium hover:text-green-700 hover:bg-yellow-500 p-3 rounded-lg transition duration-300"
            >
              <!-- Icon -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17 20h5V9a2 2 0 00-2-2h-6m-2 0H6a2 2 0 00-2 2v11h5m6 0V9m-6 0V9"
                />
              </svg>
              <span>User</span>
            </a>
          </li>
        </ul>
      </nav>
  
      <!-- Main Content Section -->

    </div>
  </template>
  
  <script>
  export default {
    name: "SidebarLayout",
  };
  </script>
  