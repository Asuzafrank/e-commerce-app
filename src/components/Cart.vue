<script setup>
import { defineProps, ref, computed, watch, onMounted} from 'vue';
import axios from 'axios';
import { collection, doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import { db, auth } from '@/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';


const props = defineProps({
    cartitem:Object,
    required:true
})
onMounted(() => {
    onAuthStateChanged(auth, (user) => {
        if(user){
            uid.value = user.uid
        }else{
            uid.value = null
        }
        
    })
})
const uid = ref(null)
const quantity = ref(props.cartitem.quantity)

const increaseQuantity = async() => { 
    if(!uid.value) return;
    try{
        const cartRef = collection(db, "users", uid.value, 'cart')
        const productRef = doc(cartRef, props.cartitem.id)
        await updateDoc(productRef, {
            quantity:increment(1)
    })
    quantity.value++
    }catch(error){
        console.log('Error increasing quantity of item' , error)
    }
   
    // await axios.patch(`http://localhost:5000/cart/${props.cartitem.id}`, { quantity:quantity.value })

}

const decreaseQuantity = async() => {
    if(!uid.value) return;
    
    if(quantity.value > 1){
        try{
        
        const cartRef = collection(db, "users", uid.value, "cart")
        const productRef = doc(cartRef, props.cartitem.id)
        await updateDoc(productRef, {
            quantity:increment(-1)
        })
        quantity.value--
    }catch(error){
        console.log('Error decreasing product item')
    }
    }
    
    // await axios.patch(`http://localhost:5000/cart/${props.cartitem.id}`, { quantity:quantity.value })
}

const totalOneItemPrice = computed(() => {
    return (quantity.value * props.cartitem.price).toFixed(2)
})








</script>

<template>

    <section class="cart-container">
        <div class="cart bg-slate-200 rounded-lg p-4 flex  justify-between mx-5 mb-3">
            <div class="list flex space-x-5">
                <img class="h-24 w-24 object-cover rounded-lg" :src="cartitem.image" alt="Product Image">
                
                <div class="device-info flex flex-col">
                    <h2 class="font-bold text-gray-600">{{ cartitem.category }}</h2>
                    <h2 class="font-bold text-gray-600">{{ cartitem.name }}</h2>
                    <label for="quantity" class="text-sm text-gray-400 mt-2">Quantity</label>
                    <div class="flex "> 
                        <button @click="decreaseQuantity" class="bg-white rounded-l-md p-1">-</button>
                        <input v-model="quantity" type="number" name="quantity" id="quantity" class="border  w-20  ">
                        <button @click="increaseQuantity" class="bg-white rounded-r-md p-1">+</button>
                    </div>
                  
                </div>
            </div>
            <div class="price text-right">
                <h3 class="text-lg font-semibold">${{ totalOneItemPrice }}</h3>
                <i class="pi pi-trash mt-10"></i>
            </div>
        </div>
    </section>
   
</template>
