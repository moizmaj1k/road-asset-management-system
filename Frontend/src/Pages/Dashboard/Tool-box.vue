<template>
  <div class="tool-box">
    <div @click="showFilter = !showFilter" class="cursor-pointer">
      <span class="pi pi-filter"></span>
    </div>
    <SearchIcon
      @clicked="handleSearchClick"
      @FilteredAssets="handleFilteredAssets"
    />
    <ReportingIcon />
    <div><span class="pi pi-align-center"></span></div>
    <div><span class="pi pi-bookmark"></span></div>
    <div><span class="pi pi-tag"></span></div>
    <ExportReport @export-map-pdf="handleExportMapPdf" />
  </div>

  <!-- Popup -->
  <div v-if="showFilter" class="popup">
    <button @click="showFilter = false" class="close-btn">✕</button>

    <ul>
      <li class="">
        <input
          type="checkbox"
          class="mb-3"
          @change="toggleSelectAllDistricts"
          :checked="allSelected"
        />
        District
        <i class="pi pi-plus-circle" @click="toggleDistrictsDropdown"></i>
        <ul v-if="showDistricts" class="list-container">
          <li>
            <input
              type="checkbox"
              @change="toggleSelectAllDistricts"
              :checked="allSelected"
            />
            All
          </li>
          <li v-for="(district, index) in districts" :key="district.code">
            <input
              type="checkbox"
              :checked="selectedDistrictCodes.includes(district.code)"
              @change="toggleDistrict(district.code)"
            />
            {{ district.name }}
          </li>
        </ul>
      </li>
      <!-- Road Length -->
      <li>
        <input
          type="checkbox"
          @click="toggleRoadLength"
          :disabled="!isDistrictSelected"
        />
        Road Length
        <div v-if="showRoadLength" class="scrollable-container">
          <input
            type="range"
            min="0"
            max="25"
            v-model="roadLength"
            class="length-slider"
          />
          <span style="">{{ roadLength }} km</span>
        </div>
      </li>

      <!-- Road Name -->
      <li class="Roadname-style">
        <input type="checkbox" :disabled="!isDistrictSelected" />
        Road Name
        <i
          class="pi pi-plus-circle ml-auto mb-3"
          @click="toggleRoads"
          :style="{
            pointerEvents: isDistrictSelected ? 'auto' : 'none',
            opacity: isDistrictSelected ? 1 : 0.5,
          }"
        ></i>

        <ul v-if="showRoads" class="list-container">
          <!-- Search Box -->
          <li>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search Road Name"
              class="list-search"
              :disabled="!isDistrictSelected"
            />
          </li>

          <!-- Render Road Names -->
          <li v-for="road in filteredRoads" :key="road.id">
            <input
              type="checkbox"
              :value="road.id"
              :disabled="!isDistrictSelected"
              v-model="selectedRoadIds"
            />
            {{ road.name }}
          </li>
        </ul>
      </li >
      <li>
        <label class="mt-2">
          <input type="checkbox" v-model="isRoadClassChecked" @change="toggleRoadClass" class="mt-2 p-8 cursor-pointer border-b border-gray-200"/>
          Road Network Hierarchy 
        </label>
      </li>
      <!-- Road Lanes -->
      <li>
        <input
          type="checkbox"
          @click="toggleRoadLanes"
          :disabled="!isDistrictSelected"
        />
        Road Lanes
        <div>
          <div v-if="showRoadLanes" class="scrollable-container">
            <input
              type="range"
              min="1"
              max="7"
              v-model="roadLanes"
              class="length-slider"
              :disabled="!isDistrictSelected"
            />
            <span style="border: 2px solid red">{{ roadLanes }} Lanes</span>
          </div>
          <div
            @click="FilterRoadData()"
            class="text-center bg-blue-700"
            style="
              height: 40px;
              position: sticky;
              width: 140px;
              color: white;
              top: 0;
              cursor: pointer;
              margin-top: 10px;
              border-radius: 10px;
              margin-left: 1.5rem;
              padding-top: 7px;
              background-color: rgb(21, 68, 62);
            "
          >
            Apply Filters
          </div>
        </div>
      </li>

    </ul>
  </div>
  <div class="center-map-button" style="top: 105px; right: 70px">
    Stick Layers
    <input type="checkbox" @click="toggleStickLayers" />
  </div>
  <div
    @click="CenterMap()"
    class="center-map-button"
    style="top: 105px; right: 225px"
  >
    Center Map
  </div>
  <div
    @click="CenterMap()"
    class="center-map-button"
    style="top: 105px; right: 380px"
  >
    FilteredRoads: {{ totalRoadsSelected }}
  </div>
</template>

<script setup>
import "primeicons/primeicons.css";
import SearchIcon from "../Dashboard/Assets-toolbox.vue";
import ReportingIcon from "../Dashboard/Assets-Reporting.vue";
import ExportReport from "../Dashboard/Assets-Export-Report.vue";
import { ref, computed, defineEmits } from "vue";
import { Button } from "primevue";
import axios from "axios";
const isRoadClassChecked = ref(false);
const isDistrictSelected = computed(
  () => selectedDistrictCodes.value.length > 0
);

const emits = defineEmits([
  "export-map-pdf",
  "center-map",
  "filtered-roads",
  "filtered-assets",
  "filtered-single-road",
  "district-boundaries",
  "toggleRoadClass"
]);
function toggleRoadClass() {
  emits("toggleRoadClass", isRoadClassChecked.value);
}
function handleFilteredAssets(data) {
  emits("filtered-assets", data);
}
const handleExportMapPdf = () => {
  emits("export-map-pdf"); // Re-emit the event upwards to Dashboard.vue
};
const showRoadLength = ref(false);
const showFilter = ref(false);
const showDistricts = ref(false);
const showRoads = ref(false);
const roadLength = ref(0);
const showRoadLanes = ref(false);
const roadLanes = ref(0);
const selectedDistricts = ref([]);
const StickLayers = ref(false);
const totalRoadsSelected = ref(0);
const selectedDistrictCodes = ref([]);
const RoadNameForRoadFilter = ref([]);

const districts = [
  { name: "Abbotttabad", code: "100ABT" },
  { name: "Bajaur", code: "200BAJ" },
  { name: "Bannu", code: "300BAN" },
  { name: "Batagram", code: "400BAT" },
  { name: "Buner", code: "500BUN" },
  { name: "Charsadda", code: "600CHA" },
  { name: "Chitral Lower", code: "700CHL" },
  { name: "Chitral Upper", code: "800CHU" },
  { name: "D.I Khan", code: "900DIK" },
  { name: "Hangu", code: "010HAN" },
  { name: "Hairpur", code: "010HAR" },
  { name: "Karak", code: "030KAR" },
  { name: "Khyber", code: "040KHY" },
  { name: "Kohat", code: "050KOH" },
  { name: "Koishtan Upper", code: "060KOL" },
  { name: "Koishtan Lower", code: "070KOU" },
  { name: "Kolia Palas Kohistan", code: "080KPK" },
  { name: "Kurram", code: "090KUR" },
  { name: "Lakki Marwat", code: "001LAK" },
  { name: "Lower Dir", code: "002LOD" },
  { name: "Malakand", code: "003MAL" },
  { name: "Mansehra", code: "004MAN" },
  { name: "Mardan", code: "005MAR" },
  { name: "Mohamand", code: "006MOH" },
  { name: "North Waziristan", code: "007NWA" },
  { name: "Nowshera", code: "008NOW" },
  { name: "Orakzai", code: "009ORA" },
  { name: "Peshawar", code: "110PES" },
  { name: "Shangla", code: "210SHA" },
  { name: "South Waziristan", code: "310SWA" },
  { name: "Sawabi", code: "410SWI" },
  { name: "Swat", code: "510SWT" },
  { name: "Tank", code: "610TAN" },
  { name: "Tor Ghar", code: "710TOG" },
  { name: "Upper Dir", code: "810UPD" },
];

// Check if all districts are selected
const allSelected = computed(
  () => selectedDistrictCodes.value.length === districts.length
);
// Toggle "All" selection
const toggleSelectAllDistricts = async () => {
  if (allSelected.value) {
    selectedDistrictCodes.value = [];
  } else {
    selectedDistrictCodes.value = districts.map((d) => d.code);
    await fetchDistrictData(selectedDistrictCodes.value);
  }
};

// Toggle individual district
const toggleDistrict = async (districtCode) => {
  if (selectedDistrictCodes.value.includes(districtCode)) {
    selectedDistrictCodes.value = selectedDistrictCodes.value.filter(
      (code) => code !== districtCode
    );
  } else {
    selectedDistrictCodes.value.push(districtCode);
  }

  // ✅ Call API after each district change
  await fetchDistrictData();
};

const toggleDistrictsDropdown = () => {
  showDistricts.value = !showDistricts.value;
};
const roads = ref([]); // full objects { id, name }
const selectedRoadIds = ref([]); // store checked road ids
const searchQuery = ref("");
// Road filters
const filteredRoads = computed(() => {
  return roads.value.filter((road) =>
    road.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const fetchDistrictData = async () => {
  try {
    const token = localStorage.getItem("access_token");

    console.log("Fetching data for districts:", selectedDistrictCodes.value);

    const response = await axios.get(
      "http://localhost:8000/api/roads/list_minimal/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          districts: selectedDistrictCodes.value.join(","),
        },
      }
    );

    console.log("API response:", response.data);

    // ✅ store full objects
    roads.value = response.data.roads || [];
    
  } catch (err) {
    console.error("API error:", err);
  }
};

const fetchDistrictBoundary = async () => {
  console.log("Fetching district boundaries...");
  try {
    const token = localStorage.getItem("access_token");

    console.log("Fetching boundaries for districts:", selectedDistrictCodes.value);

    const response = await axios.get(
      "http://localhost:8000/api/district-boundaries/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
       
        },
      }
    );

    console.log("District boundaries response:", response.data);

    // Emit the boundaries data to parent component
    emits("district-boundaries", response.data);
  } catch (err) {
    console.error("API error:", err);
  }
};
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
  emits("center-map", [69.3451, 30.3753]); // Emit an event to center the map
};

//logic for filtering road data based on selected districts, road length, and road lanes

// Build a mapping { "Abbotttabad": "100ABT", ... }
let districtCodes = {};

const FilterRoadData = async () => {
  console.trace("FilterRoadData called")
  console.trace("FilterRoadData called", selectedRoadIds.value);
  districtCodes = Object.fromEntries(districts.map((d) => [d.name, d.code]));
  console.log("Selected districts:", selectedDistrictCodes.value);
  console.log(selectedRoadIds.value.length)
  if (selectedRoadIds.value.length === 0) {
    try {
      console.log("No road is selected;");

      const codes = selectedDistrictCodes.value;

      if (!codes.length) {
        console.warn("No valid district codes selected");
        console.log("Selected district codes:", codes);
        return;
      }
      const token = localStorage.getItem("access_token");

      const response = await axios.get(
        "http://localhost:8000/api/assets/universal-filter/",
        {
          params: {
            districts: codes.join(","),
            assets: "roads",
            roadLength: showRoadLength.value ? roadLength.value : undefined,
            roadLanes: showRoadLanes.value ? roadLanes.value : undefined,
            roadName: showRoads.value ? searchQuery.value : undefined,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Filtered roads:", response.data);
      totalRoadsSelected.value = response.data.total_records;
      RoadNameForRoadFilter.value = response.data.road_names || [];

      const roadFeatures = response.data.assets.roads.data.features;
      const allRoadNames = roadFeatures.map((f) => f.properties.name);

      console.log("All road names:", allRoadNames);

      console.log("Selected district codes:", response.data.total_records);
      fetchDistrictBoundary();
      emits("filtered-roads", response.data);
    } catch (error) {
      console.error("API error during filter request:", error);
    }
  } else {
    console.log("filter for single road");
    try{
         const token = localStorage.getItem("access_token");
      const response =await axios.get(
        "http://localhost:8000/api/roads/get_single_with_assets/",
        {
          params: {
           id: selectedRoadIds.value[0] // send the first/only selected ID

          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
       console.log("Filtered road for a single road:", response.data);
        emits("filtered-single-road", response.data);
    } catch (error){
      console.error("API error during filter request:", error);
  }
}
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
  transition: background-color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;
}
.tool-box > * {
  flex: 1; /* Equal height */
  display: flex; /* Center content */
  align-items: center;
  justify-content: center;
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

  margin-bottom: 10px;
}
.length-slider {
  width: 100%;
  margin-bottom: 5px;
}
.center-map-button {
  position: absolute;

  width: 150px;
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
  transition: background-color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;
}

.center-map-button:hover {
  background-color: #f0f0f0; /* Slightly darker background on hover */
  transform: translateY(-2px); /* Lift the button slightly */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add a subtle shadow */
}
.close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
  transition: color 0.2s ease;
}

.close-btn:hover {
  color: red;
}
.Roadname-style{
  padding-bottom: 0px !important;
}
</style>
