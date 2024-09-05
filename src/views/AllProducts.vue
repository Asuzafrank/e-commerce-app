<script setup>
import { reactive } from 'vue';
import { onMounted, ref, watch } from 'vue';
import { db } from '@/firebase/config';
import { collection, getDocs, query, orderBy,startAfter, limit, where } from 'firebase/firestore';
import ProductListing from '@/components/ProductListing.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'


const state = reactive({
    products:[],
    isLoading:false,
    lastVisible:null,
    hasMore:true,
    pageSize:3

});
const getCategory = ref('All')

watch(getCategory, () => {
    // Reset products and pagination when category changes
    state.products = [];
    state.lastVisible = null;
    state.hasMore = true;
    fetchProducts();  // Fetch products with the new filter
});

const fetchProducts = async () => {
    if (state.isLoading || !state.hasMore) return;
    state.isLoading = true;

    try {
        let q = query(collection(db, 'products'), orderBy('name'));

        // Apply category filter only if it's not 'All'
        if (getCategory.value !== 'All') {
            q = query(q, where('category', '==', getCategory.value));
        }

        if (state.lastVisible) {
            q = query(q, startAfter(state.lastVisible));
        }
        q = query(q, limit(state.pageSize));

        const productSnapshot = await getDocs(q);
        if (productSnapshot.empty) {
            state.hasMore = false;
            return;
        }
        const productList = productSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        state.products = [...state.products, ...productList];
        state.lastVisible = productSnapshot.docs[productSnapshot.docs.length - 1];
    } catch (error) {
        console.error('Error fetching products:', error);
    } finally {
        state.isLoading = false;
    }
}

onMounted(() => {
    fetchProducts()
})

</script>
<template>
    
    <section class="grid grid-cols-20/80 my-4 mx-4 ">
        <main class="mx-auto">
            <div class="mx-3 flex space-x-2">
                <i class="pi pi-filter bg-gray-300 text-xl rounded-full w-8 h-8"></i>
                <p class="font-bold text-sm">Filter</p>
            </div>
            <div class="my-4">
                <p class="font-bold">Pick Color</p>
                <div class="flex space-x-3">
                    <div class="bg-blue-500 text-white text-xs rounded-full w-6 h-6 ">
                    
                </div>
                <div class="bg-pink-500 text-white text-xs rounded-full w-6 h-6 ">
                    
                </div>
                <div class="bg-green-500 text-white text-xs rounded-full w-6 h-6 ">
                    
                </div>
                <div class="bg-red-500 text-white text-xs rounded-full w-6 h-6 ">
                    
                </div>
                </div>
            </div>
            <div class="checkboxes">
                <p class="font-bold">Brand</p>
                <div class="checkbox-group">
                    <div class="checkbox-item">
                        <input type="checkbox" id="filter1" name="filter" value="electronics">
                        <label class="text-sm ml-2" for="filter1">Electronics</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="filter2" name="filter" value="clothing">
                        <label class="text-sm ml-2" for="filter2">Clothing</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="filter3" name="filter" value="home_appliances">
                        <label class="text-sm ml-2" for="filter3">Home Appliances</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="filter4" name="filter" value="books">
                        <label class="text-sm ml-2" for="filter4">Books</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="filter5" name="filter" value="toys">
                        <label class="text-sm ml-2" for="filter5">Toys</label>
                    </div>
                </div> 
            </div>

            
            <div class="checkbox-group my-4">
                <p class="font-bold">Prices</p>
                <div class="checkbox-item">
                    <input type="checkbox" id="price1" name="price_range" value="0-50">
                    <label class="text-sm ml-2" for="price1">$0 - $50</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="price2" name="price_range" value="51-100">
                    <label class="text-sm ml-2" for="price2">$51 - $100</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="price3" name="price_range" value="101-200">
                    <label class="text-sm ml-2" for="price3">$101 - $200</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="price4" name="price_range" value="201-500">
                    <label class="text-sm ml-2" for="price4">$201 - $500</label>
                </div>
                <div class="checkbox-item">
                    <input type="checkbox" id="price5" name="price_range" value="500+">
                    <label class="text-sm ml-2" for="price5">$500+</label>
                </div>
            </div>


        </main>
        <aside>
            <div class="flex items-center justify-between">
                <h1 class="font-bold text-lg">Product List</h1>
                <div class="flex space-x-2 ">
                    <p class="font-semibold text-sm">Sort By</p>
                    <select @click="filter" v-model="getCategory" class="p-1 border border-gray-200 rounded-md" name="categories" id="categories">
                        <option value="wearables">Wearables</option>
                        <option value="kitchen-appliances">Kitchen Appliances</option>
                        <option value="electronics">Electronics</option>
                        <option value="electronics">All</option>
                    </select>
                </div>
            </div>
            <section class="mt-4">
                
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-5 overflow-y-auto p-container" >
                    <ProductListing v-for="product in state.products" :key="product.id" :product="product" />
                </div>
                <div class="text-center text-gray-600">
                    <PulseLoader/>
                </div>
                <div v-if="state.hasMore" class="text-center my-4">
                    <button @click="fetchProducts" :disabled="state.isLoading">
                        {{ state.isLoading ? 'Loading...' : 'Load More' }}
                    </button>
                </div>
            </section>
        </aside>

    </section>
    
    
    
</template>
<style scoped>
.p-container{
    max-height: 500px;
}
</style>