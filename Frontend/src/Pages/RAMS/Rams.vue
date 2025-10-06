<template>
  <h1 class="text-center font-semibold text-lg mt-12">
        Pavement Condition Index (PCI)
      </h1>
  <div class="grid grid-cols-2 grid-rows-2 gap-2 h-[80vh] mt-2">
    <!-- Top Left: Table -->
      
    <div class="card custom-table overflow-auto">
      <div class="relative inline-block">
   <span style="margin-right: 12px;">Filters:</span>
    <Button class="dropdown-btn" @click="toggleDropdownForDistrict">
      {{ selectedDistrict ? selectedDistrict.name : "District: Select District" }}
    </Button>

    <ul
      v-if="showDropdownForDistrict"
      class="absolute mt-2 w-48 bg-white border rounded shadow-lg z-10  max-h-[300px] overflow-y-auto"
    >
      <li
        v-for="district in districts"
        :key="district.code"
        @click="selectDistrict(district)"
        class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
      >
        {{ district.name }}
      </li>
    </ul>
  </div>
      <Button class="dropdown-btn" style="margin-left: 5px;">Road: Select Road</Button>
      <Button 
  class="dropdown-btn ml-2"
>
  Road: Select Road
</Button>

<DataTable
  :value="customers"
  paginator
  :rows="10"
  :rowsPerPageOptions="[10, 20, 50]"
  currentPageReportTemplate="{first} to {last} of {totalRecords}"
  selectionMode="single"
  @row-click="onRowClick"
  :rowClass="rowClass"
>
  <Column field="name" header="Road Name" />
  <Column field="start_rd" header="Start RD" />
  <Column field="end_rd" header="End RD" />
  <Column field="pavement_type" header="Pavement Type" />
  <Column field="pci" header="PCI" />
  <Column field="quality" header="Quality" />
</DataTable>

    </div>

    <!-- Top Right: Line Chart -->
    <div class="card flex justify-center items-center">
      <Chart
        ref="chartLineRef"
        type="line"
        :data="chartDataForLineChart"
        :options="chartOptionsForLineChart"
        class="h-[24rem] w-[70rem]"
      />
    </div>

    <!-- Bottom Left: Doughnut Chart -->
    <div class="card flex justify-center items-center mb-6">
      <Chart
      ref="donutChartRef"
        type="doughnut"
        :data="chartData"
        :options="chartOptions"
        class="w-[30rem] h-[24rem]"
      />
    </div>

    <!-- Bottom Right: OL Map -->
    <div class="card">
      <div class="map-container">
        <div id="map"></div>
         <div id="popup" class="ol-popup">
    <a href="#" id="popup-closer" class="ol-popup-closer"></a>
    <div id="popup-content"></div>
  </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
import Chart from "primevue/chart";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import axios from "axios";
import { fromLonLat } from "ol/proj";
import { set } from "ol/transform";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { transform } from "ol/proj";
import OSM from "ol/source/OSM";
import { Vector as VectorLayer } from "ol/layer";
import VectorSource from "ol/source/Vector";
import { MultiLineString } from "ol/geom";
import Feature from "ol/Feature";
import { Stroke, Style } from "ol/style";
import GeoJSON from "ol/format/GeoJSON";
import Overlay from "ol/Overlay";
import { none } from "ol/centerconstraint";

const customers = ref([]);
const chartData = ref();
const chartOptions = ref(null);
const chartDataForLineChart = ref();
const chartOptionsForLineChart = ref(null);
const data = ref([]);
const dataForChart = ref([]);
const vectorSource = new VectorSource();
const vectorLayer = new VectorLayer({ source: vectorSource });
const map = ref(null);
const dataForPci = ref([]);
const selectedRoadId = ref(null); // keep track of clicked road
const chartLineRef = ref(null);
const basePointColor = "blue";   // default color for all PCI points
const highlightColor = "red";    // highlight for selected
const donutChartRef = ref(null);
const selectedLabel = ref(null);
const selectRoad = ref(null);
const showDropdownForDistrict = ref(false);
const selectedDistrict = ref(null);
const districts = [
  { name: "All Districts", code: "ALL" },
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

const onRowClick = (event) => {
  const road = event.data;
  selectedLabel.value = event.data.start_rd

  highlightRoadOnMap(road);     // OL map highlighting
  highlightRoadOnChart(road);   // Chart.js point highlighting
   highlightDonutSlice(road.quality);
};
const rowClass = (row) => {
  return row.start_rd === selectedLabel.value ? "highlighted-row" : "";
};
const highlightRoadOnMap = (road) => {
  vectorSource.getFeatures().forEach((feature) => {
    const pciValue = feature.get("pci");

    // default style
    let style = new Style({
      stroke: new Stroke({
        color: getPCIColourForMap(pciValue),
        width: 4,
      }),
    });

    // highlight if selected
    if (
      feature.get("start_rd") === road.start_rd &&
      feature.get("end_rd") === road.end_rd
    ) {
      style = new Style({
        stroke: new Stroke({
          color: "black", // highlight outline
          width: 8,
        }),
      });
    }

    feature.setStyle(style);
  });
};
const highlightRoadOnChart = (road) => {
  const chart = chartLineRef.value.chart; // get raw Chart.js instance
  if (!chart) return;

  const dataset = chart.data.datasets[0];

  // find index of the clicked road
  const idx = customers.value.findIndex(
    (c) => c.start_rd === road.start_rd && c.end_rd === road.end_rd
  );
  if (idx === -1) return;

  // Reset all points back to base color
  dataset.pointBackgroundColor = dataset.data.map(() => basePointColor);

  // Highlight only the selected point
  dataset.pointBackgroundColor[idx] = highlightColor;

  chart.update("none"); // "none" avoids full animation → faster redraw
};
const highlightDonutSlice = (label) => {
  console.log(label)
  const chart = donutChartRef.value.chart; // Chart.js instance
  if (!chart) return;

  const dataset = chart.data.datasets[0];
const idx = chart.data.labels.findIndex((l) => l.startsWith(label));

  if (idx === -1) return;

  // Reset all slices to normal
  dataset.backgroundColor = dataset.backgroundColor.map((c, i) =>
    typeof c === "string" ? c : c.original || c
  );
  dataset.borderWidth = dataset.data.map(() => 2);
  dataset.borderColor = dataset.data.map(() => "#fff");

  // Highlight selected slice

  dataset.borderWidth[idx] = 5;
  dataset.borderColor[idx] = "black";

  chart.update("none");
};

const toggleDropdownForDistrict = () => {
  showDropdownForDistrict.value = !showDropdownForDistrict.value;
};

const selectDistrict = (district) => {
  selectedDistrict.value = district;
  showDropdownForDistrict.value = false;

  // Example: send value to API
  console.log("Send to API:", district.code);
};
const getPCIColourForMap = (pci) => {
  if (pci >= 86) return "#028102"; // Good
  else if (pci >= 71) return "#81ff00"; // Satisfactory
  else if (pci >= 56) return "#ffff00"; // Fair
  else if (pci >= 41) return "#ff81dd"; // Poor
  else if (pci >= 26) return "#ff0000"; // Very Poor
  else if (pci >= 11) return "#4a0014"; // Serious
  else if (pci >= 0) return "#bebebe"; // Failed
  else return "grey"; // Failed or unknown
};

onBeforeMount(() => {
  fetchPCIData();
});
onMounted(() => {
  map.value = new Map({
    target: "map",
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      vectorLayer, // keep the layer ready
    ],
    view: new View({
      center: [781869.3018894137, 3822831.6902173166],
      zoom: 13,
      projection: "EPSG:3857", // projection matches API coords
    }),
  });

  const container = document.getElementById("popup");
  const content = document.getElementById("popup-content");
  const closer = document.getElementById("popup-closer");

  const popup = new Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: { duration: 250 },
  });

  map.value.addOverlay(popup);

  closer.onclick = function () {
    popup.setPosition(undefined);
    closer.blur();
    return false;
  };

  // 🔹 Click event to show feature info
  map.value.on("singleclick", function (evt) {
    let featureFound = false;

    map.value.forEachFeatureAtPixel(evt.pixel, function (feature) {
      featureFound = true;
      const start_rd = feature.get("start_rd");
      const end_rd = feature.get("end_rd");
      const pci = feature.get("pci");
      const quality = feature.get("quality");

      content.innerHTML = `
        <b>Road:</b> ${start_rd || ""} - ${end_rd || ""}<br>
        <b>PCI:</b> ${pci}<br>
        <b>Quality:</b> ${quality}
      `;

      popup.setPosition(evt.coordinate);
    });

    // If click on empty space, close popup
    if (!featureFound) {
      popup.setPosition(undefined);
    }
  });
});
const setChartDataForLineChart = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: customers.value.map((item) => item.start_rd), // 🔹 X-axis = start_rd
    datasets: [
      {
      
        data: customers.value.map((item) => item.pci), // 🔹 Y-axis = pci
        fill: false,
        borderColor: documentStyle.getPropertyValue("--p-cyan-500"),
        pointRadius: 6,        // default size (3 is default → 6 is fatter)
      pointHoverRadius: 8,
        tension: 0.4,
      },
    ],
  };
};

const setChartOptionsForLineChart = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--p-text-muted-color"
  );
  const surfaceBorder = documentStyle.getPropertyValue(
    "--p-content-border-color"
  );

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        display: false, // hides legend entirely
        labels: {
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};
const fetchPCIData = async () => {
  try {
    const token = localStorage.getItem("access_token");
    console.log("Token being sent:", token);

    const response = await axios.get("http://localhost:8000/api/pcis/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
     const raw = response.data;
data.value = raw;
    const parseChainage = (val) => {
      if (!val) return 0;
      const [left, right] = val.split("+");
      return parseInt(left) * 1000 + parseInt(right);
    };



// parseChainage already defined earlier...

// 1) customers (table-only, NO geometry), sorted by chainage
// 1) customers (table-only, NO geometry), sorted by chainage
customers.value = raw
  .map((item) => ({
    id: item.id, // keep a unique identifier (or use road_name+start_rd+end_rd)
    name: item.road_name,
    start_rd: item.start_rd,
    end_rd: item.end_rd,
    pavement_type: item.pavement_type,
    pci: item.pci,
    quality: item.quality,
  }))
  .sort((a, b) => parseChainage(a.end_rd) - parseChainage(b.end_rd));

dataForChart.value = customers.value.map((item) => item.pci);

// 2) Build dataForPci in the SAME order as customers
dataForPci.value = customers.value.map((cust) => {
  return raw.find(
    (r) =>
      r.road_name === cust.name &&
      r.start_rd === cust.start_rd &&
      r.end_rd === cust.end_rd
  );
});

// ✅ debug check
console.log("customers (sorted):", customers.value.map(c => c.end_rd));
console.log("dataForPci (sorted with geometry):", dataForPci.value.map(r => r.end_rd));


    console.log("Data for PCI:", dataForPci.value);
    const geojsonFormat = new GeoJSON();

const featureCollection = {
  type: "FeatureCollection",
  features: dataForPci.value
    .filter((road) => road.geometry) // only valid geometries
    .map((road) => ({
      type: "Feature",
      geometry: road.geometry,
      properties: {
        pci: road.pci,
        quality: road.quality,
        start_rd: road.start_rd,
        end_rd: road.end_rd,
        pavement_type: road.pavement_type,
      },
    })),
};

let features = geojsonFormat.readFeatures(featureCollection, {
  dataProjection: "EPSG:32642",   
  featureProjection: "EPSG:3857", 
});

features = features.sort((a, b) => {
  return parseChainage(a.get("end_rd")) - parseChainage(b.get("end_rd"));
});

vectorSource.clear();
vectorSource.addFeatures(features);
features.forEach((feature) => {
  const pciValue = feature.get("pci");
  feature.setStyle(
    new Style({
      stroke: new Stroke({
        color: getPCIColourForMap(pciValue),
        width: 4,
      }),
    })
  );
});

// ✅ Add features to vector source
vectorSource.clear();
vectorSource.addFeatures(features);

// ✅ Zoom to features
if (features.length > 0) {
  map.value.getView().fit(vectorSource.getExtent(), {
    padding: [50, 50, 50, 50],
  });
}
  // Optional: click to inspect PCI


    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
    chartDataForLineChart.value = setChartDataForLineChart();
    chartOptionsForLineChart.value = setChartOptionsForLineChart();
  } catch (error) {
    console.error(
      "Error fetching PCI data:",
      error.response?.data || error.message
    );
  }
};

const setChartData = () => {
  console.log("Data for Chart:", dataForChart.value);

  // categories in order
  const labels = [
    "Good",
    "Satisfactory",
    "Fair",
    "Poor",
    "Very Poor",
    "Serious",
    "Failed",
  ];

  // initialize counts for each category
  const counts = {
    Good: 0,
    Satisfactory: 0,
    Fair: 0,
    Poor: 0,
    "Very Poor": 0,
    Serious: 0,
    Failed: 0,
  };

  // classify each PCI into a bucket
  dataForChart.value.forEach((pci) => {
    if (pci >= 85) counts.Good++;
    else if (pci >= 70) counts.Satisfactory++;
    else if (pci >= 55) counts.Fair++;
    else if (pci >= 40) counts.Poor++;
    else if (pci >= 25) counts["Very Poor"]++;
    else if (pci >= 10) counts.Serious++;
    else counts.Failed++;
  });

  // colors map to labels
  const backgroundColors = [
    "#158210", // Good
    "#87ff2a", // Satisfactory
    "#fdff31", // Fair
    "#fc7cdc", // Poor
    "#fa0019", // Very Poor
    "#480015", // Serious
    "#c1c1c1", // Failed
  ];

  return {
    labels: labels.map((label) => `${label} (${counts[label]})`), // ✅ append counts to labels
    datasets: [
      {
        data: labels.map((label) => counts[label]), // keep counts for chart
        backgroundColor: backgroundColors,
      },
    ],
  };
};

const setChartOptions = () => ({
  cutout: "60%",
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right",
      labels: {
        color: "#000",
      },
    },
  },
});
</script>
<style scoped>
:deep(.custom-table .p-paginator) {
  background: transparent;

  border: none;
}
.custom-table {
  width: 55rem;
  margin-left: 1rem;
}
/* Center all table body cells */
:deep( .p-datatable-tbody > tr > td) {
  font-size: medium;
  font-weight: light;
  text-align: center;
  vertical-align: middle;
}

/* ✅ Center paginator */
:deep(.custom-table .p-paginator) {
  justify-content: center !important;
  background: transparent;
  border: none;
}

:deep(.custom-table .p-paginator .p-paginator-pages .p-paginator-page) {
  border-radius: 6px;
  margin: 0 4px;
}
:deep(.p-datatable-column-title) {
  font-size: large;
  font-weight: bold;
  padding: 0.5rem;
  margin-left: 1.7rem;
}
:deep(.custom-table .p-paginator .p-paginator-page.p-highlight) {
  background: #06b6d4; /* cyan */
  color: white;
}

:deep(.p-paginator.p-component) {
  background-color: #19443e; /* dark blue */
}

:deep(.p-paginator-content) {
  gap: 12px;
  color: white;
  align-items: center;
}
:deep(.p-select-dropdown) {
  padding-left: 0.5rem;
}
.map-container {
  width: 100%;
  height: 40vh;
  border-top: 1px solid #ccc;
  overflow: hidden;
  align-self: center;
  margin-top: 1rem;
}
#map {
  width: 100%;
  height: 40vh; /* or any fixed px/vh value */
}
.ol-popup {
  position: absolute;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
  min-width: 200px;
}
.ol-popup:after, .ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
.ol-popup-closer:after {
  content: "✖";
}
.dropdown-btn {
  background: rgb(21, 68, 62);
  color: white;
  padding: 7px 15px;
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
:deep(.highlighted-row) {
  background-color: #091624 !important;
  color: #fff !important;
  font-weight: bold;
}
</style>
