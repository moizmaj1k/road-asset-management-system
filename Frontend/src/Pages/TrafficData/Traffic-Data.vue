<template>
  <div class="main-container">
    <!-- Left Filter Sidebar -->
    <div class="sidebar">
      <h3 class="filter-title">Filters</h3>

      <!-- Country Dropdown -->
      <label for="country">Country:</label>
      <select id="country" v-model="selectedCountry" class="dropdown">
        <option value="">All Countries</option>
        <option value="Pakistan">Pakistan</option>
        <option value="India">India</option>
        <option value="China">China</option>
        <!-- Add more as needed -->
      </select>

      <!-- Location Dropdown -->
      <label for="location">Location:</label>
      <select id="location" v-model="selectedLocation" class="dropdown">
        <option value="">All Locations</option>
        <option value="Islamabad">Islamabad</option>
        <option value="Lahore">Lahore</option>
        <option value="Karachi">Karachi</option>
        <!-- Add more as needed -->
      </select>
    </div>

    <!-- Right Table Content -->
    <div class="content">
      <h2 class="traffic-heading">Traffic Count</h2>

      <div class="table-container">
        <div class="card mt-5">
          <table class="traffic-table">
            <thead>
              <tr class="bg-blue-700 text-white">
                <th>Bicycle</th>
                <th>Motorcycle</th>
                <th>Rickshaw</th>
                <th>Car</th>
                <th>Wagon</th>
                <th>Bus</th>
                <th>Mini Truck</th>
                <th>2 Axle Truck</th>
                <th>3 Axle Truck</th>
                <th>4 Axle Truck</th>
                <th>5 Axle Truck</th>
                <th>6 Axle Truck</th>
                <th>Tractor Trolley</th>
                <th>Total</th>
              </tr>
              <tr>
                <th><img :src="img.bicycle" class="w-22 pl-3" /></th>
                <th><img :src="img.motorcycle" class="icon" /></th>
                <th><img :src="img.rickshaw" class="icon" /></th>
                <th><img :src="img.jeep" class="w-24 pl-3" /></th>
                <th><img :src="img.wagon" class="w-24 pl-3" /></th>
                <th><img :src="img.bus" class="w-28 pl-3" /></th>
                <th><img :src="img.minitruck" class="w-28 pl-3" /></th>
                <th><img :src="img.twoAxleTruck" class="icon" /></th>
                <th><img :src="img.threeAxleTruck" class="w-32 pl-3" /></th>
                <th><img :src="img.fourAxleTruck" class="icon" /></th>
                <th><img :src="img.fiveAxleTruck" class="w-32 pl-3"/></th>
                <th><img :src="img.sixAxleTruck" class="icon" /></th>
                <th><img :src="img.tractor" class="icon" /></th>
              </tr>
            </thead>
            <tbody>
           <tr v-if="filteredTrafficData">
    <td v-for="(value, key) in filteredTrafficData" :key="key">{{ value }}</td>
    <td>{{ getTotal(filteredTrafficData) }}</td>
  </tr>
  <tr v-else>
    <td colspan="14">No data available for selected country</td>
  </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import OLMap from "../EditData/Map-For-Editing.vue";
import { ref } from 'vue';
import Rickshaw from "../../assets/images/Rickshaw.png";
import Motorcycle from "../../assets/images/Bike.png";
import Bicycle from "../../assets/images/bicycle.png";
import Jeep from "../../assets/images/Car.png";
import Wagon from "../../assets/images/wagon.png";
import Bus from "../../assets/images/bus.png";
import Minitruck from "../../assets/images/Mini-Truck.png";
import TwoAxleTruck from "../../assets/images/2-Axle.png";
import ThreeAxleTruck from "../../assets/images/3-Axle.png";
import FourAxleTruck from "../../assets/images/4-Axle.png";
import FiveAxleTruck from "../../assets/images/5-Axle.png";
import SixAxleTruck from "../../assets/images/6-Axle.png";
import Tractor from "../../assets/images/Tractor.png";
import { computed } from "vue";

const selectedCountry = ref('');
const selectedLocation = ref('');

const img = {
  rickshaw: Rickshaw,
  motorcycle: Motorcycle,
  bicycle: Bicycle,
  jeep: Jeep,
  wagon: Wagon,
  bus: Bus,
  minitruck: Minitruck,
  twoAxleTruck: TwoAxleTruck,
  threeAxleTruck: ThreeAxleTruck,
  fourAxleTruck: FourAxleTruck,
  fiveAxleTruck: FiveAxleTruck,
  sixAxleTruck: SixAxleTruck,
  tractor: Tractor,
};
const trafficData = ref({
  Pakistan: {
    bicycle: 12,
    motorcycle: 23,
    rickshaw: 34,
    car: 45,
    wagon: 56,
    bus: 67,
    miniTruck: 78,
    axle2: 89,
    axle3: 90,
    axle4: 21,
    axle5: 32,
    axle6: 43,
    tractor: 54,
  },
  India: {
    bicycle: 20,
    motorcycle: 30,
    rickshaw: 10,
    car: 70,
    wagon: 40,
    bus: 90,
    miniTruck: 30,
    axle2: 60,
    axle3: 22,
    axle4: 14,
    axle5: 18,
    axle6: 20,
    tractor: 16,
  },
  China: {
    bicycle: 5,
    motorcycle: 10,
    rickshaw: 15,
    car: 50,
    wagon: 25,
    bus: 35,
    miniTruck: 45,
    axle2: 30,
    axle3: 40,
    axle4: 20,
    axle5: 10,
    axle6: 5,
    tractor: 12,
  }
});
const filteredTrafficData = computed(() => {
  if (!selectedCountry.value) return null;
  return trafficData.value[selectedCountry.value] || null;
});

// Calculate total of all vehicle counts
function getTotal(data) {
  return Object.values(data).reduce((acc, val) => acc + val, 0);
}

</script>

<style scoped>
.main-container {
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

/* Sidebar (Filters) */
.sidebar {
  width: 250px;
  background-color: #f4f4f4;
  padding: 20px;
  border-right: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filter-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 1rem;
}

.dropdown {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Right Content */
.content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.traffic-heading {
  text-align: center;
  font-size: 20px;
  color: #440d0d;
  font-weight: 600;
  margin-top: 1rem;
}

.table-container {
  margin-top: 1rem;
  width: 100%;
}

.traffic-table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  text-align: center;
}

.traffic-table th,
.traffic-table td {
  width: 100px;
  height: 80px;
  border: 1px solid #ccc;
  vertical-align: middle;
}

.icon {
  max-width: 100%;
  max-height: 55px;
  object-fit: contain;
}

.map-container {
  width: 50%;
  height: 30vh;
  border-top: 1px solid #ccc;
  overflow: hidden;
  align-self: center;
}
</style>
