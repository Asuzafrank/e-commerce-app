<script setup>
import { computed } from 'vue';

const props = defineProps({
    product:{
        type: Object,
        default:{},
        required:true
    }
})

const generatedStars = computed(() => {
    const totalStars = 5;
    const rating = Math.round(props.product.rating)
    const stars = [];

    for(let i =1; i < totalStars; i++){
        if(i <= rating){
            stars.push('text-yellow-400')
        }else{
            stars.push('text-grey-300')
        }
        
    }
    return stars
    
})

</script>

<template>
    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <a href="#">
        <img class="w-full h-48 object-cover" :src="product.image" alt="product image" />
      </a>
      <div class="p-4">
        <a href="#">
          <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{{ product.name }}</h5>
        </a>
        <div class="flex items-center mt-2 mb-3">
          <div class="flex items-center space-x-1 rtl:space-x-reverse">
            <!-- Repeat star icons based on product.rating -->
            <svg
            v-for="(starClass, index) in generatedStars"
            :key="index"
            class="w-5 h-5"
            :class="starClass"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 15.27l-3.18 1.67.6-3.48L3 8.82l3.5-.51L10 2l1.5 3.31L15 8.82l-3.42.46.6 3.48L10 15.27z"/>
          </svg>
          </div>
          <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded  ms-3">{{ product.rating }}</span>
        </div>
        <p class="text-gray-600 dark:text-gray-400 mb-4">{{ product.description }}</p>
        <div class="flex items-center justify-between">
          <span class="text-2xl font-bold text-gray-900 dark:text-white">${{ product.price.toFixed(2) }}</span>
          <router-link :to="'/product/' + product.id" href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Read More</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  /* Ensure images fill the container proportionally */
  img {
    object-fit: cover;
  }
  </style>
  