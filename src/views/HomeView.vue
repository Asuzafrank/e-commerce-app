<script setup>

import HeroSection from '@/components/HeroSection.vue';
import HeroCat from '@/components/HeroCat.vue';
import ProductListings from '@/components/ProductListings.vue';
import { reactive } from 'vue';
import { onMounted } from 'vue';
import { db } from '@/firebase/config';
import { collection, getDocs } from 'firebase/firestore';


const state = reactive({
    products:[]
});

const fetchProducts = async() => {
   
    try{
        const productCollectionRef = collection(db, 'products')
        const productSnapshot = await getDocs(productCollectionRef);
        const productList = productSnapshot.docs.map(doc => ({
            id:doc.id,
            ...doc.data()
        }));
        
        state.products = productList
    }catch(error){
        console.log('Error fetching products')
    }

}

onMounted(() => {
    fetchProducts()
})
</script>

<template>
    
    <HeroSection/>
    <HeroCat/>
    <h1 class="mt-5 mb-5 grey-qo-regular text-6xl underline text-center">Our Latest Products</h1>
    <ProductListings :products="state.products" />
</template>


<style>
@import url('https://fonts.googleapis.com/css2?family=Grey+Qo&display=swap');

.grey-qo-regular {
  font-family: "Grey Qo", cursive;
  font-weight: 400;
  font-style: normal;
}

</style>
