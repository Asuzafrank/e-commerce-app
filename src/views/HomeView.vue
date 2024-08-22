<script setup>

import HeroSection from '@/components/HeroSection.vue';
import HeroCat from '@/components/HeroCat.vue';

import ProductListings from '@/components/ProductListings.vue';
</script>

<template>
    
    <HeroSection/>
    <HeroCat/>
    <h1 class="mt-5 mb-5 grey-qo-regular text-6xl underline text-center">Our Latest Products</h1>
    <ProductListings/>
</template>


<style>
@import url('https://fonts.googleapis.com/css2?family=Grey+Qo&display=swap');

.grey-qo-regular {
  font-family: "Grey Qo", cursive;
  font-weight: 400;
  font-style: normal;
}

</style>
