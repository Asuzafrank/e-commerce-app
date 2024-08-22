<script setup>
import ProductListing from './ProductListing.vue';
import { reactive, onMounted } from 'vue';
import axios from 'axios';

const state = reactive({
    products:[]
});

const fetchProducts = async() => {
    const res = await axios.get("http://localhost:5000/products")
    state.products = res.data

}

onMounted(() => {
    fetchProducts()
})


</script>
<template>
    <section class="">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-5 ">
            <ProductListing v-for="product in state.products" :key="product.id" :product="product" />
        </div>
    </section>
</template>