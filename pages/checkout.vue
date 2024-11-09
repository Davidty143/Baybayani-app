<template>
    <MainLayout>
        <div id="CheckoutPage" class="mt-4 max-w-[1200px] mx-auto px-2">

            <div class="md:flex gap-4 justify-between mx-auto w-full">

                <!-- Pickup Information -->
                <div class="md:w-[65%]">
                    <div class="bg-white rounded-lg p-4">
                        <div class="text-xl font-semibold mb-2">Pickup Information</div>
                        <div class="pt-2 border-t">
                            <ul class="text-sm">
                                <li class="flex items-center gap-2">
                                    <div>Address:</div>
                                    <div class="font-bold">Baybay City Public Market</div>
                                </li>
                                <li class="flex items-center gap-2">
                                    <div>Landmark:</div>
                                    <div class="font-bold">Beside Bagsakan</div>
                                </li>
                                <li class="flex items-center gap-2">
                                    <div>Map location:</div>
                                    <div class="font-bold">Google Maps Link</div>
                                </li>
                                <li class="flex items-center gap-2">
                                    <div>Contact:</div>
                                    <div class="font-bold">09123456789</div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Product Populate -->
                    <div id="Items" class="bg-white rounded-lg p-4 mt-4">
                        <div v-for="product in userStore.checkout" :key="product.id">
                            <CheckoutItem :product="product" />
                        </div>
                    </div>
                </div>

                <!-- Place Order -->
                <div class="md:hidden block my-4" />
                <div class="md:w-[35%]">
                    <div id="PlaceOrder" class="bg-white rounded-lg p-4">

                        <div class="text-2xl font-extrabold mb-2">Summary</div>

                        <div class="border-t my-5" />

                        <div class="flex items-center justify-between my-4">
                            <div class="font-semibold">Total</div>
                            <div class="text-2xl font-semibold text-[#FD374F]">
                                ₱ <span class="font-extrabold text-[#FD374F]">{{ total / 100 }}</span>
                            </div>
                        </div>

                        <button @click="placeOrder" class="mt-4
                                bg-gradient-to-r 
                                from-[#FF3200] 
                                to-[#FF3200]
                                w-full 
                                text-white 
                                text-[21px] 
                                font-semibold 
                                p-1.5 
                                rounded-full">
                            Confirm Order
                        </button>

                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script setup>
import MainLayout from '~/layouts/MainLayout.vue';
import { useUserStore } from '~/stores/user';
const userStore = useUserStore()
const user = useSupabaseUser()
const route = useRoute()

definePageMeta({ middleware: "auth" })

let total = ref(0)

onBeforeMount(async () => {
    if (userStore.checkout.length < 1) {
        return navigateTo('/shoppingcart')
    }

    total.value = 0.00
    if (user.value) {
        setTimeout(() => userStore.isLoading = false, 200)
    }
})

watchEffect(() => {
    if (route.fullPath == '/checkout' && !user.value) {
        return navigateTo('/auth')
    }
})

onMounted(() => {
    userStore.checkout.forEach(item => {
        total.value += item.price
    })
})

const placeOrder = async () => {
    // Create order without delivery address and Stripe payment
    await createOrder()
    userStore.cart = []
    userStore.checkout = []
    setTimeout(() => {
        return navigateTo('/success')
    }, 500)
}

const createOrder = async () => {
    await useFetch('/api/prisma/create-order', {
        method: "POST",
        body: {
            userId: user.value.id,
            products: userStore.checkout
        }
    })
}
</script>
