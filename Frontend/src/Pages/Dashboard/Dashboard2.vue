<template>
  <div id="map1" style="position: relative; width: 100%; height: 100%">
    <ToolBox :map="map" @export-map-pdf="handleExportMapPdf" @center-map="handleCenterMap" />
    
    <!-- Google Map background -->
    <div id="google-map" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;"></div>
    
    <!-- OpenLayers overlay -->
    <div id="ol-map" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 1;"></div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import Map from "ol/Map";
import View from "ol/View";
import { fromLonLat, toLonLat } from "ol/proj";
import { defaults as defaultControls } from "ol/control";
import { defaults as defaultInteractions } from "ol/interaction";
import ToolBox from "./Tool-box.vue";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Feature from 'ol/Feature.js';
import LineString from 'ol/geom/LineString.js';
import VectorSource from 'ol/source/Vector.js'; 
import VectorLayer from 'ol/layer/Vector.js';
import Style from 'ol/style/Style.js';
import Stroke from 'ol/style/Stroke.js';
let map = null;
let googleMap = null;
const value= [{
  roadname: "Pakistan",
    type:"LineString",
   coordinates: 
                    [
                        [
                            71.99194902000005,
                            34.62032043000005
                        ],
                        [
                            71.99207353300005,
                            34.62016702400007
                        ],
                        [
                            71.99226951300005,
                            34.61998907800006
                        ],
                        [
                            71.99251946700008,
                            34.619823860000054
                        ],
                        [
                            71.99271741100006,
                            34.61969799000008
                        ],
                        [
                            71.99276308300006,
                            34.61963779000007
                        ],
                        [
                            71.99276073100003,
                            34.619417750000025
                        ],
                        [
                            71.99276759000003,
                            34.61918114000008
                        ],
                        [
                            71.99275225900004,
                            34.61905981100006
                        ],
                        [
                            71.99279458600006,
                            34.61878513100004
                        ],
                        [
                            71.99278524100004,
                            34.61851094200006
                        ],
                        [
                            71.99283517100008,
                            34.61829312200007
                        ],
                        [
                            71.99283786100005,
                            34.61814418100005
                        ],
                        [
                            71.99288848400005,
                            34.618071791000034
                        ],
                        [
                            71.99308686700005,
                            34.61794770000006
                        ],
                        [
                            71.99332197600006,
                            34.617786042000034
                        ],
                        [
                            71.99359425200004,
                            34.61760485600007
                        ],
                        [
                            71.99390143200003,
                            34.61740940100003
                        ],
                        [
                            71.99416961700007,
                            34.61718469300007
                        ],
                        [
                            71.99432852300004,
                            34.61703740200005
                        ],
                        [
                            71.99449725000005,
                            34.616854138000065
                        ],
                        [
                            71.99467474200003,
                            34.61667467500007
                        ],
                        [
                            71.99477332600003,
                            34.61657683400006
                        ],
                        [
                            71.99522689500003,
                            34.61654902300006
                        ],
                        [
                            71.99547775100007,
                            34.616339638000056
                        ],
                        [
                            71.99572810000006,
                            34.61623200100007
                        ],
                        [
                            71.99593039700005,
                            34.61616191300004
                        ],
                        [
                            71.99624673300008,
                            34.61603381100008
                        ],
                        [
                            71.99654309200008,
                            34.61599429300003
                        ],
                        [
                            71.99686055400008,
                            34.616010034000055
                        ],
                        [
                            71.99715177100006,
                            34.61598902900005
                        ],
                        [
                            71.99745076100004,
                            34.61592669700008
                        ],
                        [
                            71.99763598600003,
                            34.61586280800003
                        ],
                        [
                            71.99788717500007,
                            34.61579496200005
                        ],
                        [
                            71.99810636600006,
                            34.61570824200004
                        ],
                        [
                            71.99855704400005,
                            34.61555545700003
                        ],
                        [
                            71.99879977500007,
                            34.61545051200005
                        ],
                        [
                            71.99905486700004,
                            34.61535602600003
                        ],
                        [
                            71.99920448100005,
                            34.61526629100007
                        ],
                        [
                            71.99931479300005,
                            34.61521342200007
                        ],
                        [
                            71.99931991000005,
                            34.615102525000054
                        ],
                        [
                            71.99922404600005,
                            34.61500422100005
                        ]
                    ]
},{roadname: "India",
  coordinates: [78.9629, 20.5937],
},{
    roadname: "China",
  coordinates: [69.3451, 30.3753],
  }]
// Load Google Maps JS API
const loadGoogleMapsApi = () => {
  return new Promise((resolve) => {
    if (window.google && window.google.maps) {
      resolve();
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=`;
      script.async = true;
      script.onload = resolve;
      document.head.appendChild(script);
    }
  });
};

onMounted(async () => {
  await loadGoogleMapsApi();

  const googleMapDiv = document.getElementById("google-map");
  const olMapDiv = document.getElementById("ol-map");

  // Init Google Map
  googleMap = new window.google.maps.Map(googleMapDiv, {
    center: { lat: 30.3753, lng: 69.3451 },
    zoom: 6,
    mapTypeId: "roadmap",
    disableDefaultUI: true,
  });

  // Init OpenLayers Map (no tile layers, just overlays)
  map = new Map({
    target: olMapDiv,
    layers: [],
    view: new View({
      center: fromLonLat([69.3451, 30.3753]),
      zoom: 6,
      enableRotation: false,
    }),
    interactions: defaultInteractions(),
    controls: defaultControls({ attribution: false }),
  });

  // Sync OL → Google
  map.on("moveend", () => {
    const center = toLonLat(map.getView().getCenter());
    const zoom = map.getView().getZoom();
    googleMap.setCenter({ lat: center[1], lng: center[0] });
    googleMap.setZoom(Math.round(zoom));
  });

  // Sync Google → OL
  googleMap.addListener("center_changed", () => {
    const center = googleMap.getCenter();
    const coords = fromLonLat([center.lng(), center.lat()]);
    map.getView().setCenter(coords);
  });

  googleMap.addListener("zoom_changed", () => {
    const zoom = googleMap.getZoom();
    map.getView().setZoom(zoom);
  });
   const features = value.map((item) => {
    const coords = item.coordinates.map((lonLat) => fromLonLat(lonLat));
    console.log("Coordinates for road:", item.roadname, coords);
    return new Feature({
      geometry: new LineString(coords),
      name: item.roadname,
    });
  });

  const vectorSource = new VectorSource({
    features,
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: new Style({
      stroke: new Stroke({
        color: '#FF0000',
        width: 5,
      }),
    }),
  });

  map.addLayer(vectorLayer);
});

const handleExportMapPdf = async () => {
  const mapElement = document.getElementById("map1");

  if (!mapElement) return;

  // Hide OL controls
  const controls = mapElement.querySelectorAll(".ol-control");
  controls.forEach((c) => (c.style.display = "none"));

  try {
    const canvas = await html2canvas(mapElement, {
      useCORS: true,
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const pdf = new jsPDF({
      orientation: imgWidth > imgHeight ? "l" : "p",
      unit: "px",
      format: [imgWidth, imgHeight],
    });
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("map_screenshot.pdf");
  } catch (err) {
    console.error("Error exporting:", err);
  } finally {
    controls.forEach((c) => (c.style.display = ""));
  }
};

const handleCenterMap = (coordinates) => {
  if (map) {
    const center = fromLonLat(coordinates);
    map.getView().setCenter(center);
    googleMap.setCenter({ lat: coordinates[1], lng: coordinates[0] });
  }
};
</script>
<style scoped>
#map1, #google-map, #ol-map {

  min-height: 855px; /* For testing */
}
#google-map {
  z-index: 0;
}
#ol-map {
  z-index: 1;
   /* So Google Map still receives mouse interactions */
}

</style>