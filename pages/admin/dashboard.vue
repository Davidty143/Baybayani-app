<template>
  <div class="flex h-screen">
    <!-- Sidebar Layout (Positioned behind AdminLayout) -->
    <SideBarLayout class="sidebar" />

    <!-- Admin Layout (On top of the sidebar) -->
    <AdminLayout class="admin-layout">
      <div class="main-content flex-1 overflow-y-auto">
        <!-- your main content here -->
      </div>
    </AdminLayout>
  </div>
</template>

<script>
import AdminLayout from '@/layouts/AdminLayout.vue'
import SideBarLayout from '@/layouts/SideBarLayout.vue'

export default {
  components: {
    AdminLayout,
    SideBarLayout
  }
}
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
  padding-left: 250px; /* Space for the sidebar */
  padding-top: 80px; /* Adjust padding for the header */
}

.main-content {
  padding: 20px;
}

.overflow-y-auto {
  overflow-y: auto; /* Enable scrolling in main content area if needed */
}
</style>
