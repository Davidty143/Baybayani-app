<template>
  <AdminLayout>
    <div id="SuccessPage" class="mt-4 max-w-[1200px] mx-auto px-2 min-h-[50vh]">
      <div class="bg-white w-full p-6 min-h-[150px]">
        <div class="flex items-center text-xl">
          <Icon
            name="clarity:success-standard-line"
            color="#5FCB04"
            size="35"
          />
          <span class="pl-4">Order Successful</span>
        </div>
        <p class="text-sm pl-[50px]">
          Thank you! We are preparring your order.
        </p>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from "~/layouts/AdminLayout.vue";
import MainLayout from "~/layouts/MainLayout.vue";
import { useUserStore } from "~/stores/user";
const userStore = useUserStore();
const user = useSupabaseUser();

watchEffect(async () => {
  if (!user.value) {
    await navigateTo("/login");
  }
});

onMounted(() => {
  setTimeout(() => (userStore.isLoading = false), 300);
});
</script>
