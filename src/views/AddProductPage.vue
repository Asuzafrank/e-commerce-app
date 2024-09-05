<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import router from '@/router';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';

const toast = useToast()

const name = ref('');
const description = ref('');
const price = ref('');
const stock = ref(1);
const rating = ref()
const imageUrl = ref('');
const category = ref('Electronics'); 
const specifications = ref({
    'battery': '',
    'weight': '',
    'connectivity': '',
    'color': ''
});

const postProduct = async() => {
    try{
        const productRef = await addDoc(collection(db, "products"), {
            name: name.value,
            description: description.value,
            price:price.value,
            stock:stock.value,
            rating:rating.value,
            image:imageUrl.value,
            category:category.value,
            specifications:{
                batteryLife: specifications.value.battery,
                color: specifications.value.color,
                connectivity: specifications.value.connectivity,
                weight: specifications.value.weight
            }
        })
       
        toast.success('Product Added Successfully')
        router.push(`/product/${productRef.id}`)
    }catch(error){
        console.error('Error adding document:', error);
        toast.error('Failed to add product.');
    }
    
}

</script>
<template>
    <h1 class="p-5 text-center font-bold text-3xl">Add Product</h1>
    <section>
        <div class="grid sm:grid-cols-1 md:grid-cols-60/40">
            <main>
                <div class="product-gen-info bg-white p-3 m-4 rounded-md shadow-md">
                    <h3 class="font-bold">General Information</h3>
                    <label class="text-gray-400 text-sm" for="name">Product Name:</label>
                    <input type="text" v-model="name" name="name" id="name" class="w-full p-2 border block border-gray-400 rounded-md ring-2 focus:ring-blue-300" required>
                    <label class="text-gray-400 text-sm" for="description">Description:</label>
                    <textarea name="description" v-model="description" rows="3" id="description" class="w-full p-2 border block border-gray-400 rounded-md ring-2 ring-blue-300" required/>
                </div>  
                <div class="product-price bg-white p-3 m-3 rounded-md shadow-md">
                    <h3 class="font-bold">Pricing</h3>
                    <label class="text-gray-400 text-sm" for="price">Base Price:</label>
                    <input type="text" name="price" v-model="price" id="price" placeholder="$" class="w-full p-2 border block border-gray-400 rounded-md ring-2 ring-blue-300" required>
                    <label class="text-gray-400 text-sm" for="stock">Stock number:</label>
                    <input type="number" name="stock" v-model="stock"  id="name" min="1" max="200" class="w-full p-2 border block border-gray-400 rounded-md ring-2 ring-blue-300" required>
                    <label class="text-gray-400 text-sm" for="stock">Rating:</label>
                    <input type="number" name="stock" v-model="rating"  id="name" min="1" max="5" class="w-full p-2 border block border-gray-400 rounded-md ring-2 ring-blue-300" required>
                </div>              
            </main>
            <aside>
                <div class="product-media bg-white p-3 m-3 rounded-md shadow-md">
                    <h3 class="font-bold">Product Media</h3>
                    <label class="text-gray-400 text-sm" for="image">ImageUrl:</label>
                    <input type="url" v-model="imageUrl" name="image" id="image" placeholder="image.jpg" class="w-full p-2 border block border-gray-400 rounded-md ring-2 ring-blue-300" required>
                    <div class="button mt-4">
                        <a href="https://www.pexels.com/" target="_blank" class="p-2 text-white rounded-md  bg-sky-300">Search image</a>
                    </div>
                    
                </div> 
                <div class="product-price bg-white p-3 m-3 rounded-md shadow-md">
                    <h3 class="font-bold">Category</h3>
                    <select name="category" v-model="category" id="category" class="w-full p-2 border block border-gray-400 rounded-md ring-2 ring-blue-300">
                        <option value="electronics">Electronics</option>
                        <option value="appliances">Kitchen Appliances</option>
                        <option value="wearables">Wearables</option>
                    </select>          
                </div> 
                <div class="product-specifications bg-white p-3 m-3 rounded-md shadow-md">
                    <h3 class="font-bold">Specifications</h3>
                    <label class="text-gray-400 text-sm" for="batteryLife">Battery Life:</label>
                    <input type="text" v-model="specifications.battery" name="batteryLife" id="batteryLife" placeholder="e.g., 7 days" class="w-full p-2 border block border-gray-400 rounded-md ring-2 ring-blue-300">
                    <label class="text-gray-400 text-sm" for="weight">Weight:</label>
                    <input type="text" v-model="specifications.weight" name="weight" id="weight" placeholder="e.g., 45 grams" class="w-full p-2 border block border-gray-400 rounded-md ring-2 ring-blue-300">
                    <label class="text-gray-400 text-sm" for="connectivity">Connectivity:</label>
                    <input type="text" v-model="specifications.connectivity" name="connectivity" id="connectivity" placeholder="e.g., Bluetooth 5.1" class="w-full p-2 border block border-gray-400 rounded-md ring-2 ring-blue-300">
                    <label class="text-gray-400 text-sm" for="color">Color:</label>
                    <input type="text" v-model="specifications.color" name="color" id="color" placeholder="e.g., Silver" class="w-full p-2 border block border-gray-400 rounded-md ring-2 ring-blue-300">
                   
                </div>
                <div class="btn flex justify-end m-3">
                    <button type="submit" @click="postProduct" class="mt-4 p-2 bg-blue-500 text-white rounded-md w-40">Add Product</button>
                </div>
                
            </aside>
        </div>
    </section>
</template>