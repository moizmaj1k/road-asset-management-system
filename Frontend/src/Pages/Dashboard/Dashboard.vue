<template>
  <div id="map1" >
    <ToolBox :map="map" @export-map-pdf="handleExportMapPdf" @center-map="handleCenterMap" />
    <div id="map"></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Map from "ol/Map";
import View from "ol/View";
import { FullScreen, ScaleLine, defaults as defaultControls } from "ol/control";
import { defaults as defaultInteractions } from "ol/interaction/defaults";
import { Tile as TileLayer } from "ol/layer";
import OSM from "ol/source/OSM"; // Keep OSM if you might want to switch back to it
import XYZ from "ol/source/XYZ"; // Essential for custom tile layers
import { fromLonLat } from "ol/proj";
import ToolBox from "./Tool-box.vue";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

let map; // declare map variable

onMounted(() => {
  const mapEl = document.getElementById("map");
  console.log("Map element:", mapEl); // Must NOT be null

  if (!mapEl) return;

  map = new Map({
    target: mapEl,
    layers: [
      // --- Layer 1: Esri World Imagery (Your Current Default Satellite) ---
      new TileLayer({
        source: new XYZ({
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          attributions: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
          maxZoom: 19,
        }),
        visible: false, // Set to TRUE to make this your default base map
        title: "Esri World Imagery (Satellite)",
      }),

      // --- Layer 2: OpenStreetMap (Standard Street Map - now hidden by default) ---
      new TileLayer({
        source: new OSM(),
        visible: true, // Set to FALSE as you wanted a different default
        title: "OpenStreetMap (Standard Roads)",
      }),

      // --- Layer 3: CartoDB Positron (Clean, Light Street Map Style) ---
      new TileLayer({
        source: new XYZ({
          url: 'https://{a-b}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
          attributions: '© <a href="https://carto.com/basemaps/">CartoDB</a>, © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
          maxZoom: 19,
        }),
        visible: false,
        title: "CartoDB Positron (Light Roads)",
      }),

      // --- Layer 4: CartoDB Dark Matter (Dark Street Map Style) ---
      new TileLayer({
        source: new XYZ({
          url: 'https://{a-d}.basemaps.cartocdn.com/dark_matter_all/{z}/{x}/{y}.png',
          attributions: '© <a href="https://carto.com/basemaps/">CartoDB</a>, © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
          maxZoom: 19,
        }),
        visible: false,
        title: "CartoDB Dark Matter (Dark Roads)",
      }),

      // --- Layer 5: Wikimedia Maps (Another OpenStreetMap-based style) ---
      new TileLayer({
        source: new XYZ({
          url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
          attributions: '&copy; <a href="https://wikimediafoundation.org/wiki/Maps_terms_of_use">Wikimedia Maps</a> contributors, <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
          maxZoom: 19,
        }),
        visible: false,
        title: "Wikimedia Maps (Roads)",
      }),

      // --- Layer 6: OpenStreetMap HOT (Humanitarian OSM Team Style) ---
      new TileLayer({
        source: new XYZ({
          url: 'https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png',
          attributions: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, Tiles: <a href="https://hot.openstreetmap.org/">Humanitarian OpenStreetMap Team</a>',
          maxZoom: 18,
        }),
        visible: false,
        title: "OpenStreetMap HOT (Roads)",
      }),
      
      // --- Layer 7: Esri Light Gray Canvas (Very Subtle Base for Data Overlays) ---
      new TileLayer({
        source: new XYZ({
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
          attributions: 'Tiles &copy; Esri &mdash; Sources: Esri, HERE, Garmin, USGS, NGA, EPA, USDA, NPS',
          maxZoom: 16,
        }),
        visible: false,
        title: "Esri Light Gray Canvas (Subtle)",
      }),

      // --- Layer 8: OpenTopoMap (Topographic map with contours) ---
      new TileLayer({
        source: new XYZ({
          url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png',
          attributions: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
          maxZoom: 17,
        }),
        visible: false,
        title: "OpenTopoMap (Terrain)",
      }),
    ],
    view: new View({
      center: fromLonLat([69.3451, 30.3753]), // Your original center for Pakistan
      zoom: 6,
    }),
    controls: defaultControls({ attribution: false }).extend([
      new FullScreen(),
      new ScaleLine(),
    ]),
    interactions: defaultInteractions(),
  });
});
const handleExportMapPdf = async () => {
  const mapElement = document.getElementById('map1');

  if (!mapElement) {
    console.error("Map element not found for screenshot.");
    return;
  }

  // Hide OpenLayers controls temporarily to get a clean screenshot
  const controls = mapElement.querySelectorAll('.ol-control');
  controls.forEach(control => {
    control.style.display = 'none';
  });

  // Take screenshot using html2canvas
  try {
    const canvas = await html2canvas(mapElement, {
      useCORS: true, // Important for cross-origin map tiles
      scale: 2, // Increase scale for higher resolution screenshot
      logging: false, // Disable html2canvas logging if not needed
    });

    const imgData = canvas.toDataURL('image/png'); // Get image data as PNG

    // Calculate PDF dimensions based on the canvas aspect ratio
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const pdf = new jsPDF({
      orientation: imgWidth > imgHeight ? 'l' : 'p', // Landscape if width > height, else Portrait
      unit: 'px', // Use pixels as unit for consistency with canvas
      format: [imgWidth, imgHeight] // Set PDF format to image dimensions
    });

    // Add the image to the PDF
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // Save the PDF
    pdf.save('map_screenshot.pdf');

    console.log("Map exported to PDF successfully!");

  } catch (error) {
    console.error("Error exporting map to PDF:", error);
  } finally {
    // Show OpenLayers controls again
    controls.forEach(control => {
      control.style.display = ''; // Reset display style
    });
  }
};
const handleCenterMap = (coordinates) => {
  if (map) {
    // Set the map view to the new center
    map.getView().setCenter(fromLonLat(coordinates));
    // Optional: You might want to set a specific zoom level as well
    // map.getView().setZoom(6); 
    console.log("Map centered to:", coordinates);
  } else {
    console.warn("Map object not yet initialized when Center Map was clicked.");
  }
};

// Optional: destroy map cleanly when component unmounts
// onBeforeUnmount(() => {
//   if (map) {
//     map.setTarget(undefined);
//     map = null;
//   }
// });
</script>

<style scoped>
#map {
  width: 100%;
  height: 53.4rem;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  position: relative;
}

/* Apply styles deeply to OpenLayers controls */
::v-deep .ol-control {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

::v-deep .ol-zoom {
  top: 10px;
  left: 10px;
  height: 0px; /* This makes the default zoom buttons essentially invisible */
  background: none;
}

::v-deep .ol-zoom-in,
::v-deep .ol-zoom-out {
  background-color: #4caf50;
  color: white;
  font-weight: bold;
  font-size: 18px;
}

::v-deep .ol-zoom-in:hover,
::v-deep .ol-zoom-out:hover {
  background-color: #388e3c;
}

::v-deep .ol-full-screen {
  top: 10px;
  right: 2rem;
  background-color: #2196f3;
  color: rgb(255, 0, 0);
  width: 10px;
  height: 10px;
  background: none;
}
::v-deep .ol-scale-line {
  bottom: 10px;
  left: 10px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  height: 30px;
}
</style>