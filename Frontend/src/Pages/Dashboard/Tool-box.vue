<template>
  <div class="tool-box">
    <div @click="showFilter = !showFilter"> <span class="pi pi-filter"></span></div>
    <div> <span class="pi pi-search"></span></div>
    <div> <span class="pi pi-bookmark"></span></div>
    <div> <span class="pi pi-align-center"></span></div>
    <div> <span class="pi pi-pencil"></span></div>
    <div> <span class="pi pi-tag"></span></div>
    <div> <span class="pi pi-print"></span></div>
  </div>

  <!-- Popup -->
  <div v-if="showFilter" class="popup">
    <ul>
      <li>
        <input type="checkbox" class="mb-3"/> District
        <i class="pi pi-plus-circle ml-auto" @click="toggleDistricts"></i>
        <ul v-if="showDistricts" class="list-container">
          <li><input type="checkbox" /> All</li>
          <li><input type="checkbox" /> Abbotttabad</li>
          <li><input type="checkbox" /> Bajaur</li>
          <li><input type="checkbox" /> Bannu</li>
          <li><input type="checkbox" /> Batagram</li>
          <li><input type="checkbox" /> Buner</li>
          <li><input type="checkbox" /> Charsadda</li>
          <li><input type="checkbox" /> Chitral Lower</li>
          <li><input type="checkbox" /> Chitral Upper</li>
          <li><input type="checkbox" /> D.I Khan</li>
          <li><input type="checkbox" /> Hangu</li>
          <li><input type="checkbox" /> Hairpur</li>
          <li><input type="checkbox" /> Karak</li>
          <li><input type="checkbox" /> Khyber</li>
          <li><input type="checkbox" /> Kohat</li>
          <li><input type="checkbox" /> Koishtan Upper</li>
          <li><input type="checkbox" /> Koishtan Lower</li>
          <li><input type="checkbox" /> Kolia Palas Kohistan</li>
          <li><input type="checkbox" /> Kurram</li>
          <li><input type="checkbox" /> Lakki Marwat</li>
          <li><input type="checkbox" /> Lower Dir</li>
          <li><input type="checkbox" /> Malakand</li>
          <li><input type="checkbox" /> Mansehra</li>
          <li><input type="checkbox" /> Mardan</li>
          <li><input type="checkbox" /> Mohamand</li>
          <li><input type="checkbox" /> North Waziristan</li>
          <li><input type="checkbox" /> Nowshera</li>
          <li><input type="checkbox" /> Orakzai</li>
          <li><input type="checkbox" /> Peshawar</li>
          <li><input type="checkbox" /> Shangla</li>
          <li><input type="checkbox" /> South Waziristan</li>
          <li><input type="checkbox" /> Sawabi</li>
          <li><input type="checkbox" /> Swat</li>
          <li><input type="checkbox" /> Tank</li>
          <li><input type="checkbox" /> Tor Ghar</li>
          <li><input type="checkbox" /> Upper Dir</li>
        </ul>
      </li>
      <li>
        <input type="checkbox" @click="toggleRoadLength" /> Road Length
        <div v-if="showRoadLength" class="scrollable-container">
          <input type="range" min="0" max="25" v-model="roadLength" class="length-slider" />
          <span style="border: 2px soild red;">{{ roadLength }} km</span>
        </div>
      </li>
      <li>
        <input type="checkbox" /> Road Name
        <i class="pi pi-plus-circle ml-auto mb-3" @click="toggleRoads"></i>
        <ul v-if="showRoads" class="list-container">
          <li>
            <input type="text" v-model="searchQuery" placeholder="Search Road Name" class="list-search" />
          </li>
          <li v-for="(road, index) in filteredRoads" :key="index">
            <input type="checkbox" /> {{ road }}
          </li>
        </ul>
      </li>
      <li><input type="checkbox" /> Culverts <i class="pi pi-plus-circle ml-2"></i></li>
      <li><input type="checkbox" /> Retaining wall <i class="pi pi-plus-circle ml-2"></i></li>
      <li><input type="checkbox" /> Tunnels <i class="pi pi-plus ml-2"></i></li>
    </ul>
  </div>
</template>

<script setup>
import 'primeicons/primeicons.css';
import { ref, computed } from 'vue';

const showRoadLength = ref(false);
const showFilter = ref(false);
const showDistricts = ref(false);
const showRoads = ref(false);
const searchQuery = ref('');
const roadLength = ref(0);


const roads = [
  'Main Street',
  'Highway 21',
  'Mountain Road',
  'Coastal Avenue',
  'River Road'
];

const filteredRoads = computed(() => {
  return roads.filter(road => road.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

const toggleDistricts = () => {
  showDistricts.value = !showDistricts.value;
};

const toggleRoads = () => {
  showRoads.value = !showRoads.value;
};

const toggleRoadLength = () => {
  showRoadLength.value = !showRoadLength.value;
};
</script>

<style scoped>
.tool-box {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 10rem;
  left: 1rem;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  height: 25rem;
  z-index: 1000;
}
.popup {
  position: absolute;
  top: 10rem;
  left: 6rem;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px 15px;
  height: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  z-index: 1100;
  width: 15rem;
}
.popup ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.popup li {
  padding: 8px 0;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}
.popup li:last-child {
  border-bottom: none;
}
.list-container {
  max-height: 150px;
  overflow-y: auto;
}
.list-search {
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
}
.scrollable-container {
  max-height: 60px;
  overflow-y: hidden;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
.length-slider {
  width: 100%;
  margin-bottom: 5px;
}

</style>
