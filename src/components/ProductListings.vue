<script setup>
import ProductListing from './ProductListing.vue';
import { reactive, onMounted, defineProps  } from 'vue';



const props = defineProps({
    products:{
        type:Array,
        default:() => [],
        required:true
    }
})


// const state = reactive({
//     products:[]
// });

// const fetchProducts = async() => {
   
//     try{
//         const productCollectionRef = collection(db, 'products')
//         const productSnapshot = await getDocs(productCollectionRef);
//         const productList = productSnapshot.docs.map(doc => ({
//             id:doc.id,
//             ...doc.data()
//         }));
        
//         state.products = productList
//     }catch(error){
//         console.log('Error fetching products')
//     }

// }

// onMounted(() => {
//     fetchProducts()
// })


</script>
<template>
    <section class="">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-5 ">
            <ProductListing v-for="product in props.products" :key="product.id" :product="product" />
        </div>
    </section>
</template>