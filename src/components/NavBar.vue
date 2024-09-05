<script setup>
import { ref, onMounted } from 'vue';
import logo from '@/assets/logo.png'
import { useRoute } from 'vue-router';
import { auth, db } from '@/firebase/config';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import router from '@/router';



const route = useRoute()
const isActiveLink = (routepath) => {
  return route.path === routepath
}

const uid = ref(null)
const hasAddProduct = ref(false)
const specificUserId = 'P8kFYwcvwsWC7ZRcbY09L9rSc9F2';
const checkUserId = async(uid) => {
  if(!uid) return false;

  const userDocRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userDocRef)
  
  if(userDoc.exists()){
    const userData = userDoc.data()
    return userData.uid === specificUserId
  }
  return false
}

const logout = async () => {
  await signOut(auth)
  router.push('/login')
}

const isOpenMenu = ref(false);

const toggleMenu = () => {
    isOpenMenu.value = !isOpenMenu.value;
};

onMounted(() => {
  onAuthStateChanged(auth, async(user) => {
    if(user){
      uid.value = user.uid
      hasAddProduct.value = await checkUserId(user.uid)
    }else{
      console.log('No user found')
    }
  })
})

</script>

<template>
  <nav class="nav p-4">
    <div class="container mx-auto flex items-center justify-between">
      <div class="text-white text-2xl font-bold">
        <img class="h-8" :src="logo" alt="">
      </div>
      <div class="hidden md:flex space-x-4">
        <router-link to="/"  :class="[isActiveLink('/') ? 'bg-blue-400': 'text-black', 'hover:bg-blue-700', 'px-3', 'py-2', 'rounded']">Home</router-link>
        <router-link to="/all"  :class="[isActiveLink('/all') ? 'bg-blue-400': 'text-black', 'hover:bg-blue-700', 'px-3', 'py-2', 'rounded']">view products</router-link>
        
          <router-link v-if="hasAddProduct" to="/add" class="text-black hover:bg-blue-700 px-3 py-2 rounded">Add Product</router-link>
        
        
        <router-link to="/cart"  :class="[isActiveLink('/cart') ? 'bg-blue-400': 'text-black', 'hover:bg-blue-700', 'px-3', 'py-2', 'rounded']">cart</router-link>
        <button @click="logout" class="text-black hover:bg-blue-700 px-3 py-2 rounded">logout</button>
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
      <router-link to="/add" class="block hover:bg-blue-700 px-4 py-2">Add Product</router-link>
      <a href="#" class="block hover:bg-blue-700 px-4 py-2">Contact</a>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  background-color: #d8dbc3;
}
</style>
