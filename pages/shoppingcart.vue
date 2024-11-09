<template>

    <MainLayout>
        <div id="ShoppingCartPage" class="mt-4 max-w-[1200px] mx-auto px-2">
            <div v-if="!userStore.cart.length" class="h-[500px] flex items-center justify-center">
                <div class="pt-20">
                    <img class="mx-auto" width="250" src="/cart-empty.png">

                    <div class="text-xl text-center mt-4">No items yet?</div>

                    <!-- If not logged, goto login page -->
                    <div v-if="!user" class="flex text-center">
                        <NuxtLink to="/auth" class="
                                bg-[#FD374F] 
                                w-full 
                                text-white 
                                text-[21px] 
                                font-semibold 
                                p-1.5 
                                rounded-full
                                mt-4
                            ">
                            Sign in
                        </NuxtLink>
                    </div>
                </div>
            </div>


            <div v-else class="md:flex gap-4 justify-between mx-auto w-full">
                <div class="md:w-[65%]">

                    <div class="bg-white rounded-lg p-4">

                        <div class="text-2xl font-bold mb-2">
                            Shopping Cart ({{ userStore.cart.length }})
                        </div>

                    </div>


                    <div class="bg-[#FEEEEF] rounded-lg p-4 mt-4">
                        <div class="text-red-500 font-bold">Always ask for the availability of each item before adding
                            to
                            checkout! </div>
                    </div>

                    <!-- The code dynamically renders a list of CartItem components from the user's cart, passing each product's data and selection state, and listens for selection changes to handle updates in the parent component. -->

                    <div id="Items" class="bg-white rounded-lg p-4 mt-4">
                        <div v-for="product in userStore.cart">
                            <CartItem :product="product" :selectedArray="selectedArray"
                                @selectedRadio="selectedRadioFunc" />
                        </div>
                    </div>

                </div>


                <div class="md:hidden block my-4" />
                <div class="md:w-[35%]">
                    <div id="Summary" class="bg-white rounded-lg p-4">
                        <div class="text-2xl font-extrabold mb-2">Summary</div>
                        <div class="flex items-center justify-between my-4">
                            <div class="font-semibold">Total</div>
                            <div class="text-2xl font-semibold text-[#FD374F]">
                                ₱ <span class="font-extrabold   text-[#FD374F] ">{{ totalPriceComputed }}</span>
                            </div>
                        </div>
                        <button @click="goToCheckout" class="
                                flex
                                items-center
                                justify-center
                                bg-[#0C6539] 
                                w-full 
                                text-white 
                                text-[21px] 
                                font-semibold 
                                p-1.5 
                                rounded-full
                                mt-4
                            ">
                            Checkout
                        </button>
                    </div>

                    <div id="OrderDetails" class="bg-white rounded-lg p-4 mt-4">

                        <div class="text-lg font-semibold mb-2">Order Details</div>

                        <div class="border-b my-5" />
                        <p class="my-2">
                            Total Items: 2
                        </p>
                        <p class="my-2">
                            Total Unit: 45.54 kg
                        </p>

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

let selectedArray = ref([])

onMounted(() => {
    setTimeout(() => userStore.isLoading = false, 200)
})


const totalPriceComputed = computed(() => {
    let price = 0
    userStore.cart.forEach(prod => {
        price += prod.price
    })
    return price / 100
})

const selectedRadioFunc = (e) => {

    if (!selectedArray.value.length) {
        selectedArray.value.push(e)
        return
    }

    selectedArray.value.forEach((item, index) => {
        if (e.id != item.id) {
            selectedArray.value.push(e)
        } else {
            selectedArray.value.splice(index, 1);
        }
    })
}

const goToCheckout = () => {
    let ids = []
    userStore.checkout = []

    selectedArray.value.forEach(item => ids.push(item.id))

    let res = userStore.cart.filter((item) => {
        return ids.indexOf(item.id) != -1
    })

    res.forEach(item => userStore.checkout.push(toRaw(item)))

    return navigateTo('/checkout')
}
</script>
