<template>
  <div class="" >
  <div :class="routeClass">
<nav class="custom-font navbar ">
      <div class="sm:px-6 lg:px-8">
        <div class="flex items-end justify-end h-16">
          <div class="flex-shrink-0 p-4">
            <router-link to="/" class="text-3xl font-semibold hover:text-gray-200 transition">
              RAMS Dashboard
            </router-link>
          </div>
          
          <div class="hidden md:flex flex-1 mb-1 justify-center space-x-6 font-semi text-2xl">
            <router-link to="/dashboard" class="font-medium transition duration-300 px-3 py-2 border-b-2 border-transparent hover:border-white">
              Dashboard <li class="pi pi-user ml-1"></li>
            </router-link>
            <router-link to="/admin-tools" class="font-medium transition duration-300 px-3 py-2 border-b-2 border-transparent hover:border-white">
              Admin Tools <li class="pi pi-wrench ml-1"></li>
            </router-link>
            <router-link to="/Editdata" class="font-medium transition duration-300 px-3 py-2 border-b-2 border-transparent hover:border-white">
              Edit Data <li class="pi pi-pencil ml-1"></li>
            </router-link> 
            <router-link to="/TrafficData" class="font-medium transition duration-300 px-3 py-2 border-b-2 border-transparent hover:border-white">
              Traffic Data <li class="pi pi-pencil ml-1"></li>
            </router-link> 
          </div>

          <div class="hidden md:flex p-2 items-center">
            <router-link to="/login" class="ml-4 px-4 py-2 bg-blue-800 hover:bg-blue-700 text-white font-semibold rounded transition">
              Login <li class="pi pi-user-plus ml-2"></li>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
   
  </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import 'primeicons/primeicons.css'
const route = useRoute();

// Define dynamic class based on the current route
const routeClass = computed(() => {
  console.log(route.path);
  return route.path === '/' ? 'home-page' : 'other-page';
});
</script>

<style >
.home-page {
  /* Styles for the landing page */
  /* font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  background-color: rgba(28, 32, 12, 0.3); /* bg-[#1c200c]/50 */
}

.other-page {
  /* Styles for all other pages */
  background-color: #182e57; 
  opacity: 1;
  height: 7vh;

}

.custom-font {
   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

}
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  backdrop-filter: blur(12px);
  background-color: rgb(19, 23, 73); /* dark semi-opaque */
  color: rgb(255, 255, 255);
    border-radius: 0px 0px 10px 10px;
}
</style>
