<script setup>
import Cart from '@/components/Cart.vue';
import { onMounted, ref, watch, computed } from 'vue';

import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/firebase/config';
import { getDocs, collection } from 'firebase/firestore';

const uid = ref(null)

const cart = ref([])
const getCartData = async() => {
    try{
       const cartRef = collection(db, 'users', uid.value, 'cart')
       const cartSnap = await getDocs(cartRef)
       const cartlist = cartSnap.docs.map(doc => ({
        id:doc.id,
        ...doc.data()
       }))
       cart.value = cartlist;
    }catch(error){
        console.log("error fetching Cart items", error)
    }
    
}
onMounted(() => { 
    onAuthStateChanged(auth, (user) => {
        if(user){
            uid.value = user.uid
            console.log(user.uid)
        }else{
            uid.value = null
        }
    })

    
})
watch(uid, (newUid) => {
    if (newUid) {
        getCartData();
    }
}, { immediate: true });
const totalCostItems = computed(() => {
    return cart.value.reduce((total, item) => {
        return total + (item.quantity * item.price);
    }, 0)
})
const formattedtotalCostItems = computed(() => {
    return totalCostItems.value.toFixed(2)
})

const discount = computed(() => {
    return (totalCostItems.value * 0.01).toFixed(2)
})

const cartTotal = computed(() => {
    return(totalCostItems.value - discount.value).toFixed(2)
})

</script>
<template>
    <div class="grid grid-cols-70/30">
        <main>
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
        </main>
        <aside>
            <div class="bg-orange-300 p-3 mt-9 rounded-md shadow-md ">
                <p class="font-bold text-xl mb-4">Cart Total</p>
            <div class="flex justify-between items-center">
                
                <div>
                    
                    <p class="text-sm">Cart Subtotal</p>
                    <p class="text-sm">Designed by Asuza</p>
                    <p class="text-sm">Discount</p>
                    <p class="text-sm">Cart Total</p>
                </div>
                <div>
                    
                    <p class="text-sm font-bold">{{ formattedtotalCostItems }}</p>
                    <p class="text-sm font-bold">Free</p>
                    <p class="text-sm font-bold">{{ discount }}</p>
                    <p class="text-lg font-bold">{{ cartTotal }}</p>
                </div>
            </div>
            <button class="w-full p-3 bg-white text-black text-sm my-3 rounded-2xl font-extrabold">Apply</button>
            </div>
           
        </aside>
     
    </div>
    
    <h1>{{ totalCostItems }}</h1>
</template>