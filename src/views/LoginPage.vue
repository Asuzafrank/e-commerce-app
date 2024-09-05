<script setup>
import { auth, db} from '@/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';

const toast = useToast()
const router = useRouter()
const email = ref('')
const password = ref('')

const login = async() => {
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
        const user = userCredential.user
        console.log(user.uid)
        
        // const docRef = doc(db, "users", user.uid)
        // const docsnap = await getDoc(docRef)

        // if(docsnap.exists()){
        //     const userData = docsnap.data()
        //     console.log(userData)
        //     // toast.success(`welcome ${userData.username}`)
        // }else{
        //     toast.error('User profile not found.')
        // }
        
        router.push('/')
        
    }catch(error){
        const errorCode = error.code 
        toast.error(`${errorCode}`)

    }
}

</script>
<template>
    <section class="container">
    <div class="register-form bg-white rounded-md shadow-md p-4 mx-auto max-w-lg my-3">
      <h1 class="mb-3 font-bold text-xl text-center">Login</h1>
      
      <form @submit.prevent="login">
       
      <div>
        <label class="text-sm font-bold mb-2 text-gray-600" for="email">Email:</label>
        <input v-model="email" class="block border border-gray-500 p-2 w-full rounded-md" type="email" name="email" id="email" required>
      </div>

      <div>
        <label class="text-sm font-bold mb-2 text-gray-600" for="password">password:</label>
        <input v-model="password" class="block border border-gray-500 p-2 w-full rounded-md" type="password" name="password" id="password" required>
      </div>
      <button class="tracking-widest text-sm bg-sky-600 text-white rounded-md hover:bg-purple-400 my-3 p-3 w-full">login</button>
      </form>
      <div class="flex space-x-2">
        <p class="text-sm">Don't Have An Account</p><router-link to="/register" class="text-sm text-blue-500">Sign Up</router-link>
      </div>
      
     
    </div>
  </section>
</template>