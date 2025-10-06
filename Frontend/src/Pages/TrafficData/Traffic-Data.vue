<template>
  <div class="main-container">
    <div class="content">
      <h2 class="traffic-heading">Traffic Count (AADT)</h2>

      <!-- Filters Centered -->
      <div class="filter-class">
        <h3 style="margin-left: 1rem;">Filters</h3>

        <!-- District Dropdown Button -->
        <div class="dropdown-wrapper">
          <button class="dropdown-btn" @click="toggleDistrict">
            District: {{ selectedDistrict || 'Select District' }}
          </button>
          <ul v-if="showDistrict" class="dropdown-menu">
            <li @click="selectDistrict('')">All Points</li>
            <li @click="selectDistrict('Malakand')">Malakand</li>
            <li @click="selectDistrict('Charsadda')">Charsadda</li>
            <li @click="selectDistrict('Mardan')">Mardan</li>
          </ul>
        </div>
         <div class="dropdown-wrapper">
          <button class="dropdown-btn" @click="toggleRoad">
            Road: {{ selectedRoad || 'Select Road' }}
          </button>
          <ul v-if="showRoad" class="dropdown-menu">
            <li @click="selectRoad('')">All Roads</li>
            <li @click="selectRoad('Thana Chirat Palai')">Thana Chirat Palai</li>
            <li @click="selectRoad('S-2 Road')">S-2 Road</li>
            <li @click="selectRoad('S-3 Road')">S-3 Road</li>
          </ul>
        </div>

        <!-- Road Dropdown Button -->
        <div class="dropdown-wrapper">
          <button class="dropdown-btn" @click="togglePoint">
            Point: {{ selectedPoint || 'Select Point' }}
          </button>
          <ul v-if="showPoint" class="dropdown-menu">
            <li @click="selectPoint('')">All Points</li>
            <li @click="selectPoint('Point 1')">Point 1</li>
            <li @click="selectPoint('Point 2')">Point 2</li>
            <li @click="selectPoint('Point 3')">Point 3</li>
          </ul>
        </div>
        <div class="reporting-wrapper">
           <button class="dropdown-btn mr-4" @click="ExportCSVDataOfTraffic">Export CSV</button>
       
          <button class="dropdown-btn" @click="toggleView">
            {{ isReportingRoute ? "Show Map" : "Reporting" }}
          </button>
       
        </div>
      </div>
       
      <!-- Table -->
      <div class="table-container">
        <div class="card mt-5">
          <table class="traffic-table">
            <thead>
              <tr class="bg-[#218274] text-white">
                <th style="border-radius:0px 5px 5px 0px ;">Motorcycle</th>
                <th>Rickshaw</th>
                <th>Car/Jeep/SUV</th>
                <th>Wagon/Hiace</th>
                <th>Coaster/Bus</th>
                <th>Mazda/Shehzore/ Mini Truck</th>
                <th>2-Axle Truck</th>
                <th>3-Axle Truck</th>
                <th>4-Axle Truck</th>
                <th>5-Axle Truck</th>
                <th>6-Axle Truck</th>
                <th>Tractor Trolley</th>
                <th style="border-radius:0px 5px 5px 0px ;">Total</th>
              </tr>
              <tr>
                <th><img :src="img.motorcycle" class="w-32 pl-7" /></th>
                <th><img :src="img.rickshaw" class="w-30 pl-5" /></th>
                <th><img :src="img.jeep" class="w-30 pl-5" /></th>
                <th><img :src="img.wagon" class="w-48 h-22" /></th>
                <th><img :src="img.bus" class="w-28 pl-3" /></th>
                <th><img :src="img.minitruck" class="w-28 pl-3" /></th>
                <th><img :src="img.twoAxleTruck" class="w-24 pl-3" /></th>
                <th><img :src="img.threeAxleTruck" class="w-26 pl-1" /></th>
                <th><img :src="img.fourAxleTruck" class="w-28 pl-2" /></th>
                <th><img :src="img.fiveAxleTruck" class="w-32 pl-1"/></th>
                <th><img :src="img.sixAxleTruck" class="w-28 pl-2" /></th>
                <th><img :src="img.tractor" class="w-26 pl-1" /></th>
                <th><img :src="img.total" class="w-32 pl-1" /></th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredTrafficData">
                <td v-for="(value, key) in filteredTrafficData" :key="key">
                  {{ value }}
                </td>
                <td>{{ getTotal(filteredTrafficData) }}</td>
              </tr>
              <tr v-else>
                <td colspan="14">No data available for selected location</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
     
      <!-- Map -->
       <div>
            <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import OLMap from "../EditData/Map-For-Editing.vue";
import { ref, onMounted } from "vue";
import Rickshaw from "../../assets/images/Rickshaw1.png";
import Motorcycle from "../../assets/images/Bike1.png";
import Bicycle from "../../assets/images/bicycle.png";
import Jeep from "../../assets/images/Car.jpg";
import Wagon from "../../assets/images/van.png";
import Bus from "../../assets/images/bus.jpg";
import Minitruck from "../../assets/images/Mini-truck.jpg";
import TwoAxleTruck from "../../assets/images/2-xle.png";
import ThreeAxleTruck from "../../assets/images/3-xle.png";
import FourAxleTruck from "../../assets/images/4-xle1.png";
import FiveAxleTruck from "../../assets/images/5-xle.png";
import SixAxleTruck from "../../assets/images/6-xle.png";
import Tractor from "../../assets/images/Tractor1.png";
import Total from "../../assets/images/Total.jpg";
import { computed } from "vue";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Style, Fill, Stroke, Circle as CircleStyle } from "ol/style";
import MapForTrafficCount from "../../components/MapForTrafficCount.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// check if current route is reporting
const isReportingRoute = computed(() => route.path.includes("/reporting"));

// toggle between routes
const toggleView = () => {
  if (isReportingRoute.value) {
    router.push("/trafficData"); // back to map
  } else {
    router.push("/trafficData/reporting"); // go to reporting
  }
};

const selectedDistrict = ref("");
const selectedLocation = ref("");
const selectedRoad=ref("");
const selectedPoint= ref("");
const showDistrict = ref(false);
const showRoad = ref(false);
const showPoint = ref(false);
function toggleDistrict() {
  showDistrict.value = !showDistrict.value;
  showRoad.value = false;
  showPoint.value = false;
}
function toggleRoad() {
  showRoad.value = !showRoad.value;
  showDistrict.value = false;
  showPoint.value = false;
}

function togglePoint(){
  showPoint.value = !showPoint.value;
  showDistrict.value = false;
  showRoad.value = false;
}
function selectDistrict(value) {
  selectedDistrict.value = value;
  showDistrict.value = false;
}
function selectRoad(value) {
  selectedRoad.value = value;
  showRoad.value = false;
}
function selectPoint(value) {
  selectedPoint.value = value;
  showPoint.value = false;
}
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
  total: Total,
};
const trafficData = ref({
  Malakand: {
   
    motorcycle: 223,
    rickshaw: 33,
    car: 454,
    wagon: 26,
    bus: 7,
    miniTruck: 78,
    axle2: 89,
    axle3: 90,
    axle4: 21,
    axle5: 32,
    axle6: 43,
    tractor: 54,
  },
  India: {
    
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
  },
});
const filteredTrafficData = computed(() => {
  if (!selectedDistrict.value) return null;
  return trafficData.value[selectedDistrict.value] || null;
});

// Calculate total of all vehicle counts
function getTotal(data) {
  return Object.values(data).reduce((acc, val) => acc + val, 0);
}
const map = ref(null);

onMounted(() => {
  // Base map
  map.value = new Map({
    target: "map",
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: fromLonLat([72.09791, 34.672874]), // center map on point
      zoom: 13,
    }),
  });

  // Create a point feature at given coordinates
  const pointFeature = new Feature({
    geometry: new Point(fromLonLat([72.09791, 34.672874])),
  });

  // Style it as a blue circle
  pointFeature.setStyle(
    new Style({
      image: new CircleStyle({
        radius: 6,
        fill: new Fill({ color: "blue" }),
        stroke: new Stroke({ color: "#fff", width: 2 }),
      }),
    })
  );

  // Vector source & layer for the point
  const vectorSource = new VectorSource({
    features: [pointFeature],
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });

  map.value.addLayer(vectorLayer);
});

const fetchTrafficData = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/traffic-data");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    trafficData.value = data;
  } catch (error) {
    console.error("Error fetching traffic data:", error);
  }
};
// Exporting csv data
const ExportCSVDataOfTraffic = () => {
  if (!customers.value.length) return;

  // Extract headers from keys
  const headers = Object.keys(customers.value[0]);

  // Build CSV string
  const rows = customers.value.map(row =>
    headers.map(field => `"${row[field]}"`).join(",")
  );
  const csvContent = [headers.join(","), ...rows].join("\n");

  // Create download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "roads_data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<style scoped>
.main-container {
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

/* Sidebar (Filters) */


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
  margin-top: 1.5rem;
}
.reporting-wrapper {
  margin-left: auto; /* pushes it to the far right */
}
.table-container {
  margin-top: 1rem;
  width: 100%;
  display: flex;
}

.traffic-table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  text-align: center;
  
}

.traffic-table th,
.traffic-table td {
  width: 144px;
  height: 40px;
  border: 1px solid #ccc;
  vertical-align: middle;
  
}

.icon {
  max-width: 100%;
  max-height: 55px;
  object-fit: contain;
}

.map-container {
  width: 100%;
  height: 40vh;
  border-top: 1px solid #ccc;
  overflow: hidden;
  align-self: center;
}
#map {
  width: 100%;
  height: 40vh; /* or any fixed px/vh value */
}
.filter-class{
  align-content: center;
}
.filter-class {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin: 1rem 0;
}

/* Dropdown button */
.dropdown-btn {
  background: rgb(21, 68, 62);
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.3s;
}

.dropdown-btn:hover {
  background: #1a6a61;
}

/* Dropdown menu */
.dropdown-wrapper {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 110%;
  left: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  list-style: none;
  padding: 5px 0;
  margin: 0;
  width: 180px;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
  z-index: 20;
}

.dropdown-menu li {
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.dropdown-menu li:hover {
  background: #f1f1f1;
}

</style>
