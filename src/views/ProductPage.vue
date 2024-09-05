<script setup>
import axios from 'axios';
import { reactive, onMounted, computed, ref, defineProps } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
import { addDoc, doc, getDoc, serverTimestamp, collection, getDocs, orderBy, query, where, updateDoc, setDoc} from 'firebase/firestore';
import { db } from '@/firebase/config';
import { auth } from '@/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';




const toast = useToast()
const quantity = ref(1)
const state = reactive({
    product:{},
    reviews: [],
    cart: []
})

const addToCart = async (product) => {
    if (!uid.value) {
        toast.error("You must be logged in to add items to your cart");
        return;
    }
    try {
        console.log(`User ID: ${uid.value}, Product ID: ${productId}`);
        const cartRef = collection(db, 'users', uid.value, 'cart');
        const productRef = doc(cartRef, productId);
        const productDoc = await getDoc(productRef);

        if (productDoc.exists()) {
            // Item exists in the cart, update the quantity
            const existingProduct = productDoc.data();
            await updateDoc(productRef, {
                quantity: existingProduct.quantity + quantity.value
            });
            toast.success("Item quantity updated successfully");
        } else {
            // Item does not exist in the cart, add it
            await setDoc(productRef, {
                ...product,
                quantity: quantity.value,
                addedAt: serverTimestamp()
            });
            toast.success("Item added to cart");
        }
    } catch (error) {
        console.error("Error adding item to cart:", error);
        toast.error("Failed to add item to cart. Please try again.");
    }
};



const generatedStars = computed(() => {
    const totalStars = 5;
    const rating = Math.round(state.product.rating)
    const stars = [];

    for(let i =1; i < totalStars; i++){
        if(i <= rating){
            stars.push('text-yellow-400')
        }else{
            stars.push('text-grey-300')
        }
        
    }
    return stars
    
})

const route = useRoute()
const productId = route.params.id

const fetchComments = async() => {
    const commentRef = collection(db, "reviews");
    const commentQuery = query(commentRef, where("productId", "==", productId), orderBy("date", "desc"))
    const commentShot = await getDocs(commentQuery);
    const commentList = await Promise.all(commentShot.docs.map(async(docSnapShot) => {
        const reviewData = docSnapShot.data();
        const userRef = doc(db, "users", reviewData.userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
                console.log(`User data for ID ${reviewData.userId}:`, userDoc.data()); // Debugging statement
            } else {
                console.log(`No user document found for ID ${reviewData.userId}`); // Debugging statement
            }
        const userData = userDoc.exists() ? userDoc.data() : { username : "unknown" };
        return{
            id:docSnapShot.id,
            ...reviewData,
            reviewerName:userData.username
        }

    } ))
    state.reviews = commentList

}

const uid = ref(null);

onMounted(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            uid.value = user.uid;
            console.log(uid.value);
        }
    });
    fetchProduct();
    fetchComments();
});
const commentreview = ref('');
const postComments = async() => {
    try{
        if(!uid.value){
            console.log('user is not authenticated')
            return;
        }
        // let res = await axios.get('http://localhost:5000/reviews')
        // state.reviews = res.data.filter(review => review.productId === productId)
        const reviewRef = await addDoc(collection(db, "reviews"), {
            comment:commentreview.value,
            date:serverTimestamp(),
            productId:productId,
            userId:uid.value
        });
        console.log('Document written with ', reviewRef.id)
        await fetchComments();
        commentreview.value = ''; 
        
        
    }catch(error){
        console.log('Error posting Comments', error)
    }
    
}

const fetchProduct = async() => {
    try{
        // let response = await axios.get(`http://localhost:5000/products/${productId}`)
        // state.product = response.data
        const productdocRef = doc(db, "products", productId);
        const productDocSnap = await getDoc(productdocRef)

        if(productDocSnap.exists()){
            state.product = productDocSnap.data()
        }
        
    }catch(error){
        console.log('Error Fetching Product', error)
    }
    

}


</script>
<template>
    <h1 class="text-center font-bold text-lg my-4">Product Details</h1>

    <section class="container mx-auto">
        <div class="grid sm:grid-cols-1 md:grid-cols-50/50">
            <div class="section-1">
                <img :src="state.product.image" class="w-full h-70 object-cover rounded-lg mx-4" alt="">

                <div class="reviews mt-6 p-6 bg-gray-100 rounded-lg shadow-md mx-4 w-full">
                    <form @submit.prevent="postComments">
                        <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                            <label for="comment" class="sr-only">Your Comment</label>
                            <input v-model="commentreview" type="text" name="comment" id="comment" class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                            placeholder="Write a comment..." required>
                        </div>
                        <button class="inline-flex items-center rounded-lg text-xs bg-blue-400 text-white px-4 py-2.5">Post Comment</button>
                    </form>

                    <!-- Comments container with scrolling enabled -->
                    <div class="comments-container mt-6 max-h-[300px] overflow-y-auto">
                        <article v-for="review in state.reviews" :key="review.id" class="p-6 mt-3 text-base bg-white rounded-lg dark:bg-gray-900">
                            <footer class="flex justify-between items-center mb-2">
                                <div class="flex items-center">
                                    <p class="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
                                        <img class="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Michael Gough">
                                        {{ review.reviewerName }}
                                    </p>
                                    <p class="text-sm text-gray-600 dark:text-gray-400">
                                        <time pubdate datetime="2022-02-08" title="February 8th, 2022">{{ review.date.toDate().toDateString() }}</time>
                                    </p>
                                </div>
                            </footer>
                            <p class="text-gray-500 dark:text-gray-400">{{ review.comment }}</p>
                            <div class="flex items-center mt-4 space-x-4">
                                <button type="button" class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                                    <svg class="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                                    </svg>
                                    Reply
                                </button>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
           <!-- HTML -->
<section class="section2 mx-10">
    <div class="naming mb-4 sm:mt-8">
        <h3 class="text-md font-bold text-gray-800">{{ state.product.category }}</h3>
        <h3 class="text-yellow-500 font-extrabold text-2xl">{{ state.product.name }}</h3>
    </div>
    <div class="description p-3 bg-gray-100 rounded-md shadow-sm h-24">
        <h5 class="font-bold text-gray-700">Description</h5>
        <p class="text-gray-600 text-sm mt-2">{{ state.product.description }}</p>
    </div>
    <h4 class="text-lg font-semibold mt-4">Price: ${{ state.product.price }}</h4>
    <div class="flex items-center space-x-1 rtl:space-x-reverse">
        <h1 class="text-lg font-semibold mt-4">reviews: </h1>
            <!-- Repeat star icons based on product.rating -->
            <svg
            v-for="(starClass, index) in generatedStars"
            :key="index"
            class="w-5 h-5"
            :class="starClass"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 15.27l-3.18 1.67.6-3.48L3 8.82l3.5-.51L10 2l1.5 3.31L15 8.82l-3.42.46.6 3.48L10 15.27z"/>
          </svg>
          </div>
    <label for="quantity" class="block mt-4 text-gray-700 font-medium">Quantity:</label>
    <input v-model="quantity" type="number" id="quantity" name="quantity" min="1" max="100" step="1" value="1" class="mt-1 block w-24 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500">
    <div class="btn mt-4">
        <button class="bg-sky-600 text-white px-7 py-1 rounded-xl mr-4 hover:bg-yellow-50 hover:text-black">Buy Now</button>
        <button @click="addToCart(state.product)" class=" text-sky-600 px-4 py-1 rounded-xl border border-sky-600 hover:bg-slate-400 hover:text-white ">Add to Cart</button>
    </div>

    <!-- <div class="specifications bg-white p-6 rounded-lg shadow-md border border-gray-200 m-3 h-64">
    <h3 class="text-xl font-semibold text-gray-800 mb-4">Specifications</h3>
    <ul class="list-disc list-inside space-y-2 text-gray-600">
        <li class="flex items-center">
            <span class="font-semibold text-gray-700 w-36">Color:</span>
            <span>{{ state.product.specifications.color }}</span>
        </li>
        <li class="flex items-center">
            <span class="font-semibold text-gray-700 w-36">Battery Life:</span>
            <span>{{ state.product.specifications.batteryLife }}</span>
        </li>
        <li class="flex items-center">
            <span class="font-semibold text-gray-700 w-36">Weight:</span>
            <span>{{ state.product.specifications.weight }}</span>
        </li>
        <li class="flex items-center">
            <span class="font-semibold text-gray-700 w-36">Connectivity:</span>
            <span>{{ state.product.specifications.connectivity }}</span>
        </li>
    </ul>
</div> -->

</section>
    

        </div>
    </section>
</template>

<style scoped>
.comments-container {
    max-height: 300px; /* Adjust the height as needed */
    overflow-y: auto; /* Enable vertical scrolling */
}
/* Custom Styles */
.section2 {
    background-color: #f9fafb; /* Light background for the section */
    padding: 1.5rem; /* Padding around the section */
    border-radius: 0.5rem; /* Rounded corners */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Light shadow */
}

.naming h3:first-of-type {
    color: #4b5563; /* Gray color for the category */
}

.naming h3:last-of-type {
    color: #f59e0b; /* Yellow color for the product name */
}

.description {
    border: 1px solid #e5e7eb; /* Light border */
}

.description p {
    line-height: 1.5; /* Better line spacing for description */
}

h4 {
    color: #374151; /* Dark gray color for the price */
}

label {
    display: block; /* Ensure label is on its own line */
}

input[type="number"] {
    width: 100%; /* Full width for the input */
    max-width: 6rem; /* Limit maximum width */
    padding: 0.5rem; /* Padding inside the input */
    border: 1px solid #d1d5db; /* Border color */
    border-radius: 0.25rem; /* Rounded corners */
}

input[type="number"]:focus {
    border-color: #fbbf24; /* Yellow border on focus */
    box-shadow: 0 0 0 2px rgba(252, 211, 77, 0.5); /* Yellow shadow on focus */
}

</style>
