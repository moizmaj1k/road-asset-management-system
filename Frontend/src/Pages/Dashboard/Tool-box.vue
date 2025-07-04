<template>
  <div class="tool-box">
    <div @click="showFilter = !showFilter" class="cursor-pointer">
      <span class="pi pi-filter"></span>
    </div>
    <SearchIcon @clicked="handleSearchClick" />
    <ReportingIcon />
    <div><span class="pi pi-align-center"></span></div>
    <div><span class="pi pi-bookmark"></span></div>
    <div><span class="pi pi-tag"></span></div>
    <ExportReport  @export-map-pdf="handleExportMapPdf"/>
  </div>

  <!-- Popup -->
  <div v-if="showFilter" class="popup">
    <ul>
      <li class="">
        <input
          type="checkbox"
          class="mb-3"
          @change="toggleSelectAllDistricts"
          :checked="allSelected"
        />
        District
        <i
          class="pi pi-plus-circle "
          @click="toggleDistrictsDropdown"
        ></i>
        <ul v-if="showDistricts" class="list-container">
          <li>
            <input
              type="checkbox"
              @change="toggleSelectAllDistricts"
              :checked="allSelected"
            />
            All
          </li>
          <li v-for="(district, index) in districts" :key="index">
            <input
              type="checkbox"
              :checked="selectedDistricts.includes(district)"
              @change="toggleDistrict(district)"
            />
            {{ district }}
          </li>
        </ul>
      </li>
      <li>
        <input type="checkbox" @click="toggleRoadLength" /> Road Length
        <div v-if="showRoadLength" class="scrollable-container">
          <input
            type="range"
            min="0"
            max="25"
            v-model="roadLength"
            class="length-slider"
          />
          <span style="border: 2px soild red">{{ roadLength }} km</span>
        </div>
      </li>
      <li>
        <input type="checkbox" /> Road Name
        <i class="pi pi-plus-circle ml-auto mb-3" @click="toggleRoads"></i>
        <ul v-if="showRoads" class="list-container">
          <li>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search Road Name"
              class="list-search"
            />
          </li>
          <li v-for="(road, index) in filteredRoads" :key="index">
            <input type="checkbox" /> {{ road }}
          </li>
        </ul>
      </li>
      <li>
        <input type="checkbox" @click="toggleRoadLanes" /> Road Lanes
        <div>
          <div v-if="showRoadLanes" class="scrollable-container">
            <input
              type="range"
              min="1"
              max="7"
              v-model="roadLanes"
              class="length-slider"
            />
            <span style="border: 2px soild red">{{ roadLanes }} Lanes</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="center-map-button"  style="top:80px; right: 70px;">Stick Layers
    <input type="checkbox" @click="toggleStickLayers"  />
  </div>
  <div @click="CenterMap()" class="center-map-button" style="top: 80px;
  right: 220px;" >Center Map

  </div>
</template>

<script setup>
import "primeicons/primeicons.css";
import SearchIcon from "../Dashboard/Assets-toolbox.vue";
import ReportingIcon from "../Dashboard/Assets-Reporting.vue";
import ExportReport from "../Dashboard/Assets-Export-Report.vue"
import { ref, computed,defineEmits } from "vue";
import { Button } from "primevue";
const emits = defineEmits(['export-map-pdf']); 
const handleExportMapPdf = () => {
  emits('export-map-pdf'); // Re-emit the event upwards to Dashboard.vue
};
const showRoadLength = ref(false);
const showFilter = ref(false);
const showDistricts = ref(false);
const showRoads = ref(false);
const searchQuery = ref("");
const roadLength = ref(0);
const showRoadLanes = ref(false);
const roadLanes = ref(0);
const selectedDistricts = ref([]);
const StickLayers = ref(false);

const districts = [
  "Abbotttabad",
  "Bajaur",
  "Bannu",
  "Batagram",
  "Buner",
  "Charsadda",
  "Chitral Lower",
  "Chitral Upper",
  "D.I Khan",
  "Hangu",
  "Hairpur",
  "Karak",
  "Khyber",
  "Kohat",
  "Koishtan Upper",
  "Koishtan Lower",
  "Kolia Palas Kohistan",
  "Kurram",
  "Lakki Marwat",
  "Lower Dir",
  "Malakand",
  "Mansehra",
  "Mardan",
  "Mohamand",
  "North Waziristan",
  "Nowshera",
  "Orakzai",
  "Peshawar",
  "Shangla",
  "South Waziristan",
  "Sawabi",
  "Swat",
  "Tank",
  "Tor Ghar",
  "Upper Dir",
];

const roads = [
  "Main Street",
  "Highway 21",
  "Mountain Road",
  "Coastal Avenue",
  "River Road",
];

// Check if all districts are selected
const allSelected = computed(
  () => selectedDistricts.value.length === districts.length
);

// Toggle "All" selection
const toggleSelectAllDistricts = () => {
  if (allSelected.value) {
    selectedDistricts.value = [];
  } else {
    selectedDistricts.value = [...districts];
  }
};

// Toggle individual district
const toggleDistrict = (district) => {
  if (selectedDistricts.value.includes(district)) {
    selectedDistricts.value = selectedDistricts.value.filter(
      (d) => d !== district
    );
  } else {
    selectedDistricts.value.push(district);
  }
};
const toggleDistrictsDropdown = () => {
  showDistricts.value = !showDistricts.value;
};

// Road filters
const filteredRoads = computed(() => {
  return roads.filter((road) =>
    road.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const toggleRoads = () => {
  showRoads.value = !showRoads.value;
};

const toggleRoadLength = () => {
  showRoadLength.value = !showRoadLength.value;
};

const toggleRoadLanes = () => {
  showRoadLanes.value = !showRoadLanes.value;
};
const handleSearchClick = () => {
  console.log("Search clicked!");
  // add your custom logic here
};
const toggleStickLayers = () => {
  console.log("Toggle Stick Layers clicked!");
  StickLayers.value = !StickLayers.value;
};

const CenterMap = () => {
  console.log("Center Map clicked!");
  emits('center-map',[69.3451,30.3753]); // Emit an event to center the map
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
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
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
.popup:hover {
  background-color: #f0f0f0; /* Slightly darker background on hover */
  transform: translateY(-2px); /* Lift the button slightly */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add a subtle shadow */
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
.center-map-button {
  position: absolute;
  
  width: 140px;
  color: black;
  z-index: 12;
  height: 32px;
  background-color: white;
  text-align: center;
  border-radius: 10px;
  padding-top: 2px;
  border: 1px solid black;
  cursor: pointer;
  /* Add transition for smooth animation */
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.center-map-button:hover {
  background-color: #f0f0f0; /* Slightly darker background on hover */
  transform: translateY(-2px); /* Lift the button slightly */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add a subtle shadow */
}
</style>
