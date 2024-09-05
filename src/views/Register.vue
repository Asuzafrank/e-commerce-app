<script setup>
import { auth, db } from '@/firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { reactive, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

import { collection, addDoc } from 'firebase/firestore';

const toast = useToast()
const router = useRouter()

const form = reactive({
  username:'',
  email:'',
  phone:'',
  address:'',
  password:''
})


const signUp = async () => {
  try {
    // Await the result of createUserWithEmailAndPassword
    const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);

    // Signed up successfully
    const user = userCredential.user;
    console.log(user);
    const response = await addDoc(collection(db, 'users'), {
      id: user.uid,
      username:form.username,
      email:user.email,
      phone:form.phone,
      address:form.address,
      
    });
    toast.success('User Registered Successfully')
    router.push('/login')
    console.log(response.id)



  } catch (error) {  
    const errorCode = error.code;
    toast.error(`${errorCode}`);  
  }
};

   
    

</script>

<template>
  <section class="container">
    <div class="register-form bg-white rounded-md shadow-md p-4 mx-auto max-w-lg my-3">
      <h1 class="mb-3 font-bold text-xl text-center">Register</h1>
      <div class="flex items-center justify-center">
        <i class="pi pi-sign-in text-2xl mb-3 font-bold"></i>
      </div>
      <form @submit.prevent="signUp">
        <div>
        <label class="text-sm font-bold mb-2 text-gray-600" for="username">UserName:</label>
        <input v-model="form.username" class="block border border-gray-500 p-2 w-full rounded-md" type="text" name="username" id="username" required>
      </div>
      <div>
        <label class="text-sm font-bold mb-2 text-gray-600" for="email">Email:</label>
        <input v-model="form.email" class="block border border-gray-500 p-2 w-full rounded-md" type="email" name="email" id="email" required>
      </div>
      <div>
        <label class="text-sm font-bold mb-2 text-gray-600" for="Phone">Phone Number:</label>
        <input v-model="form.phone" class="block border border-gray-500 p-2 w-full rounded-md" type="text" name="Phone" id="Phone" required>
      </div>
      <div>
        <label class="text-sm font-bold mb-2 text-gray-600" for="address">StreetAddress:</label>
        <input v-model="form.address" class="block border border-gray-500 p-2 w-full rounded-md" type="text" name="address" id="address" required>
      </div>
      <div>
        <label class="text-sm font-bold mb-2 text-gray-600" for="password">password:</label>
        <input v-model="form.password" class="block border border-gray-500 p-2 w-full rounded-md" type="password" name="password" id="password" required>
      </div>
      <button class="tracking-widest text-sm bg-sky-600 text-white rounded-md hover:bg-purple-400 my-3 p-3 w-full">SignUp</button>
      </form>
      <div class="flex space-x-2">
        <p class="text-sm">Already Have An Account</p><router-link to="/login" class="text-sm text-blue-500">Login</router-link>
      </div>
     
    </div>
  </section>
</template>