<script setup>
import women from '@/assets/women.jpeg'
import baby from '@/assets/baby.jpeg'
import man from '@/assets/man.jpeg'
import shoe from '@/assets/shoe.jpeg'
</script>
<template>
    <section class="flex items-center justify-center  mt-6">
        <div class="flex overflow-x-auto scroll-smooth space-x-9 ">
            <button><i class="pi pi-arrow-left text-4xl"></i></button>
        <div class="text-center mb-4 flex-shrink-0">
            <img :src="women" alt="" class="h-20 w-20 rounded-full object-cover">
            <p class="text-sm font-semibold">Women</p>
        </div>
        <div class="text-center mb-4 flex-shrink-0">
            <img :src="man" alt="" class="h-20 w-20 rounded-full object-cover">
            <p class="text-sm font-semibold">Men</p>
        </div>
        <div class="text-center mb-4 flex-shrink-0">
            <img :src="baby" alt="" class="h-20 w-20 rounded-full object-cover">
            <p class="text-sm font-semibold">Baby</p>
        </div>
        <div class="text-center mb-4 flex-shrink-0">
            <img :src="shoe" alt="" class="h-20 w-20 rounded-full object-cover">
            <p class="text-sm font-semibold">Shoe</p>
        </div>
        <button><i class="pi pi-arrow-right text-4xl"></i></button>
        
        </div>
       
    </section>
</template>