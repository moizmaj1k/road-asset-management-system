<template>
  <div>
    <div
      style="
        position: fixed;
        background-color: #70a894;
        color: black;
        text-align: end;
        padding: 5px;
        width: 100%;
        display: flex;
        justify-content: center;
      "
    >
      <div>Communication & Works Department, Peshawar, KP </div>
    </div>
    <div :class="routeClass">
      <nav class="custom-font navbar">
        <div class="sm:px-6 lg:px-8">
          <div class="flex items-end justify-end h-16">
            <div class="flex-shrink-0 p-4 pb-3">
              <router-link
                to="/"
                class="font-bebas text-3xl font-semibold hover:text-gray-900 transition"
              >
                <img
                  :src="Logo"
                  alt="Logo"
                  class="inline h-18 w-auto ml-2 bg-white rounded-[20px]"
                />
              </router-link>
            </div>

            <div
              class="hidden md:flex flex-1 mb-1 justify-center space-x-6 font-semi text-2xl z-100"
            >
              <router-link
                to="/"
                class="font-light transition duration-300 px-3 py-2 border-b-2 border-transparent hover:border-white text-lg"
              >
                Home
              </router-link>
              <div class="relative inline-block text-left font-small">
                <!-- Parent button -->
                <button
                  @click="toggleDropdown"
                  class="flex items-center font-light transition duration-300 px-3 py-2 border-b-2 border-transparent hover:border-white text-lg"
                >
                  Statistics
                  <i class="pi pi-chevron-down ml-1"></i>
                </button>

                <!-- Dropdown -->
                <div
                  v-if="showDropdown"
                  class="absolute z-10 bg-[#144e46] text-white rounded-lg mt-2 w-48 shadow-lg text-sm "
                >
                  <router-link
                    to="/dashboard"
                    class="block px-4 py-2 hover:hover:bg-[#218274] "
                    @click="closeDropdown"
                  >
                    Maps
                  </router-link>

                  <router-link
                    to="/damage-locations"
                    class="block px-4 py-2 hover:hover:bg-[#218274]"
                    @click="closeDropdown"
                  >
                    Damage Locations
                  </router-link>

                  <router-link
                    to="/jurisdiction"
                    class="block px-4 py-2 hover:hover:bg-[#218274]"
                    @click="closeDropdown"
                  >
                    Jurisdiction
                  </router-link>
                  <router-link
                    to="/trafficData"
                    class="block px-4 py-2 hover:hover:bg-[#218274]"
                    @click="closeDropdown"
                  >
                    Traffic
                  </router-link>
                  <router-link
                    to="/motorway-facilities"
                    class="block px-4 py-2 hover:hover:bg-[#218274]"
                    @click="closeDropdown"
                  >
                    Motorway Facilities
                  </router-link>
                  <router-link
                    to="/road-conditions"
                    class="block px-4 py-2 hover:hover:bg-[#218274]"
                    @click="closeDropdown"
                  >
                    Road Condition
                  </router-link>
                  <router-link
                    to="/potiential-revenue-calculator"
                    class="block px-4 py-2 hover:hover:bg-[#218274]"
                    @click="closeDropdown"
                  >
                    Potiential Revenue Calculator
                  </router-link>
                </div>
              </div>
              <router-link
                to="/Editdata"
                class="font-light transition duration-300 px-3 py-2 border-b-2 border-transparent hover:border-white text-lg"
              >
                Maintenance Units
                <i class="pi pi-chevron-down ml-1"></i>
              </router-link>
             <div class="relative" @click="toggleDropdownForGIS = !toggleDropdownForGIS">
    <!-- Parent Menu Item -->
    <button
      class="font-light transition duration-300 px-3 py-2 border-b-2 border-transparent hover:border-white text-lg"
    >
      GIS
        <i class="pi pi-chevron-down ml-1"></i>
    </button>

    <!-- Dropdown -->
    <transition name="fade">
      <div
        v-if="toggleDropdownForGIS"
        class="absolute z-10 bg-[#144e46] text-white rounded-lg mt-2 w-48 shadow-lg text-sm"
      >
        <router-link
          to="/dashboard"
          class="block px-4 py-2 hover:bg-[#218274]"
        >
          GIS
        </router-link>
        <router-link
          to="/Editdata"
          class="block px-4 py-2 hover:bg-[#218274]"
        >
          Update Data
        </router-link>
      </div>
    </transition>
  </div>
              <router-link
                to="/CreateUser"
                class="font-light transition duration-300 px-3 py-2 border-b-2 border-transparent hover:border-white text-lg"
              >
                AMP
                <i class="pi pi-chevron-down ml-1"></i>
              </router-link>
              <router-link
                to="/TrafficData"
                class="font-light transition duration-300 px-3 py-2 border-b-2 border-transparent hover:border-white text-lg"
              >
                Traffic
              </router-link>
              <router-link
                to="/Rams"
                class="font-light transition duration-300 px-3 py-2 border-b-2 border-transparent hover:border-white text-lg"
              >
                RAMS
              </router-link>
              <router-link
                to="/CreateUser"
                class="font-light transition duration-300 px-3 py-2 border-b-2 border-transparent hover:border-white text-lg"
              >
                Setting
              </router-link>
            </div>

            <!-- Login/Logout Button -->
            <div class="hidden md:flex p-2 items-center">
              <button
                v-if="isLoggedIn"
                @click="showLogoutModal = true"
                class="ml-4 px-4 py-2 mb-1 bg-[#ec5019] text-white font-semibold rounded transition"
              >
                Logout
                <li class="pi pi-sign-out ml-2"></li>
              </button>

              <router-link
                v-else
                to="/login"
                class="ml-4 px-4 py-2 bg-blue-800 hover:bg-blue-700 text-white font-semibold rounded transition"
              >
                Login
                <li class="pi pi-user-plus ml-2"></li>
              </router-link>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <!-- Centered Logout Confirmation Modal (PrimeVue) -->

    <!-- Logout confirmation modal -->
    <Dialog
      v-model:visible="showLogoutModal"
      header="Confirm Logout"
      modal
      :style="{
        width: '450px',
        backgroundColor: 'white',
        color: 'black',
        height: '150px',
        padding: '20px',
      }"
      :pt="{
        mask: { style: { backgroundColor: 'rgba(0, 0, 0, 0.7)' } },
      }"
    >
      <div class="text-center">
        <p style="color: black">Are you sure you want to log out?</p>
        <div class="flex justify-center gap-3 mt-4">
          <Button
            label="Cancel"
            class="p-button-danger p-button-text"
            style="color: red; border-color: red"
            @click="showLogoutModal = false"
          />
          <Button
            label="Logout"
            class="p-button-danger"
            style="background-color: red; border-radius: 20px; padding: 5px"
            @click="handleLogout"
          />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed, ref, watch, onMounted, onBeforeUnmount } from "vue";
import Logo from "../assets/images/C&W1.png";
import "primeicons/primeicons.css";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import { height } from "@fortawesome/free-solid-svg-icons/fa0";

const route = useRoute();
const router = useRouter();
const open = ref(false);
const showDropdown = ref(false);
const toggleDropdownForGIS = ref(false);
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const closeDropdown = () => {
  showDropdown.value = false;
};
const isLoggedIn = ref(!!localStorage.getItem("access_token"));
const showLogoutModal = ref(false);

// Re-check when route changes (e.g., after login redirect)
watch(
  () => route.fullPath,
  () => {
    isLoggedIn.value = !!localStorage.getItem("access_token");
  }
);

// Keep in sync if storage changes in another tab
const handleStorageChange = () => {
  isLoggedIn.value = !!localStorage.getItem("access_token");
};
onMounted(() => window.addEventListener("storage", handleStorageChange));
onBeforeUnmount(() =>
  window.removeEventListener("storage", handleStorageChange)
);

const handleLogout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  isLoggedIn.value = false;
  showLogoutModal.value = false;
  router.push("/login");
};

const routeClass = computed(() =>
  route.path === "/" ? "home-page" : "other-page"
);
</script>

<style>
.home-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(28, 32, 12, 0.3);
}
.other-page {
  background-color: #182e57;
  opacity: 1;
  height: 7vh;
}
.custom-font {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.navbar {
  position: fixed;
  top: 33px;
  left: 0;
  width: 100%;
  z-index: 1000;

  background-color: #218274;
  color: #fff;

  color: white; /* better contrast */

  z-index: 10; /* above the background image */
}
</style>
