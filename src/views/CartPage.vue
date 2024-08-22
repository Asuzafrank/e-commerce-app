<script setup>
import Cart from '@/components/Cart.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';


const cart = ref([])
const getCartData = async() => {
    try{
        let cartData = await axios.get('http://localhost:5000/cart')
        cart.value = cartData.data
    }catch(error){
        console.log("error fetching Cart items", error)
    }
    
}
onMounted(() => { 
    getCartData()
})

</script>
<template>
    <div class="flex items-center justify-between p-5">
        <h1 class="font-bold text-4xl">My Cart</h1>
    <h3 class="">{{ cart.length }} items</h3>
    </div>
    <div v-if="cart.length == 0" class="text-center p-4">
        <i class="pi pi-cart-plus text-7xl font-bold mb-4"></i>
        <p class="text-yellow-600 text-bold text-4xl mb-5">Oops! Nothing In cart</p>
        <router-link to="/" class="bg-sky-500 p-4 rounded-md text-white text-sm">Back to Shopping</router-link>
    </div>
    <Cart v-for="item in cart" :key="item.id" :cartitem="item"/>
</template>