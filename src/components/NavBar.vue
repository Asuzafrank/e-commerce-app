<script setup>
import { ref } from 'vue';
import logo from '@/assets/logo.png'


const isOpenMenu = ref(false);

const toggleMenu = () => {
    isOpenMenu.value = !isOpenMenu.value;
};
</script>

<template>
  <nav class="nav p-4">
    <div class="container mx-auto flex items-center justify-between">
      <div class="text-white text-2xl font-bold">
        <img class="h-8" :src="logo" alt="">
      </div>
      <div class="hidden md:flex space-x-4">
        <a href="#" class="text-black hover:bg-blue-700 px-3 py-2 rounded">Home</a>
        <a href="#" class="text-black hover:bg-blue-700 px-3 py-2 rounded">About</a>
        <router-link to="/add" class="text-black hover:bg-blue-700 px-3 py-2 rounded">Add Product</router-link>
        <a href="#" class="text-black hover:bg-blue-700 px-3 py-2 rounded">Contact</a>
      </div>
      <button @click="toggleMenu" class="md:hidden text-white focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>
    <div v-if="isOpenMenu" class="md:hidden  text-white ">
      <a href="#" class="block hover:bg-blue-700 px-4 py-2">Home</a>
      <a href="#" class="block hover:bg-blue-700 px-4 py-2">About</a>
      <router-link to="/add" class="block hover:bg-blue-700 px-4 py-2">Services</router-link>
      <a href="#" class="block hover:bg-blue-700 px-4 py-2">Contact</a>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  background-color: #d8dbc3;
}
</style>
