<script setup>
import logo from '@/assets/logo.png'
</script>

<template>
  <footer>
    <div class="footer mt-8">
        <div class="flex flex-col md:flex-row justify-between p-4 ">
            <h3 class="text-white font-semibold text-2xl">Elegance is the only beauty that never fades.</h3>
            <div class="flex space-x-2 mt-4 md:mt-0">
                <button class="p-3 bg-yellow-400 rounded-lg text-white">Shop Now</button>
                <button class="b2 p-3 bg-yellow-400 rounded-lg ml-2 text-white">Sign In</button>
            </div>
        </div>
        <hr class="h-3 border-t border-blue-950"/>
        <div class="flex flex-wrap md:flex-nowrap justify-between mx-5">
            <div class="contacts mb-4 md:mb-0">
                
                <h2 class="font-semibold text-xl">Contact Information</h2>
                <a class="text-sm text-white block mt-2" href="#">ShoppingSpree@gmail.com</a>
                <a class="text-sm text-white block mt-1" href="#">+254703672667</a>
            
        </div>
        <div class="company-info  mb-4 md:mb-0">
            <h2>Company Information</h2>
            <a class="text-sm text-white block mt-2" href="#">About Us</a>
            <a class="text-sm text-white block mt-1" href="#">Careers</a>
            <a class="text-sm text-white block mt-1" href="#">Press Releases</a>
            <a class="text-sm text-white block mt-1" href="#">Corporate Responsibilities</a>
        </div>
        <div class="customer services mb-4 md:mb-0 ">
            <h2 class="font-semibold text-xl">Customer Service</h2>
            <a class="text-sm text-white block mt-2" href="#">Shipping & Returns</a>
            <a class="text-sm text-white block mt-1" href="#">FAQs</a>
            <a class="text-sm text-white block mt-1" href="#">Order Tracking</a>
            <a class="text-sm text-white block mt-1" href="#">Contact Us</a>
        </div>
        <div class="customer services mb-4 md:mb-0">
            <h2 class="font-semibold text-xl">Social Media Links</h2>
            <div class="flex space-x-4 mt-2">
                <a class="text-sm text-white" href="#"><i class="pi pi-facebook text-2xl"></i></a>
                <a class="text-sm text-white" href="#"><i class="pi pi-instagram text-2xl"></i></a>
                <a class="text-sm text-white" href="#"><i class="pi pi-twitter text-2xl"></i></a>
                <a class="text-sm text-white" href="#"><i class="pi pi-pinterest text-2xl"></i></a>
            </div>
            
        </div>
        </div>
        <div class="flex items-center justify-center">
            <img :src="logo" class="h-40" alt="">
        </div>
        <h2 class="text-center">&copy;Terms & Conditions</h2>
    </div>
  </footer>  
</template>
<style scoped>
.footer {
    background-color: #ebc88f;
}
.b2{
    background-color: #7a5f7a;
}
a:hover{
    color: cyan;
}
</style>
