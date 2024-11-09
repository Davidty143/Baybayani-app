<template>
    <div class="flex justify-start my-2">
        <img class="rounded-md md:w-[150px] w-[90px]" :src="product.url">

        <div class="overflow-hidden pl-2">
            <div class="flex items-center">
                <span
                    class="bg-[#0C6539] text-white text-[11px] font-semibold px-1.5 rounded-sm min-w-[60px] text-center">Vegetables</span>
                <div class="truncate pl-2">{{ product.title }} </div>
            </div>

            <div class="text-lg font-semibold mt-2 text-[#FD374F]">
                ₱ <span class="font-bold text-[#FD374F]">{{ product.price / 100 }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['product'])
const { product } = toRefs(props)
</script>
