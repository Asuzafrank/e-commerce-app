<script setup>
import wm from '@/assets/wm.png'
</script>

<template>
    <section class="bg-blue-100 py-8 shadow-2xl rounded-md">
        <div class="flex  items-center mx-4 md:justify-around">
            <div class="">
                <h2 class="font-semibold text-5xl leading-9 md:leading-loose">Curated Collections</h2>
                <p class="text-sm mb-3 text-blue-600">Discover Our Range of Minimalist Mastepieces</p>
                <button class="bg-black text-white rounded-md p-3">SHOP NOW<i class="pi pi-arrow-up-right ml-2"></i></button>
            </div>
            <img class="h-80  ml-4 " :src="wm" alt="">
            
        </div>
    </section>
</template>