<template>
  <div id="map1">
    <ToolBox
      :map="map"
      @export-map-pdf="handleExportMapPdf"
      @center-map="handleCenterMap"
      @filtered-roads="handleFilteredRoads"
      @filtered-assets="handleFilteredAssets"
      @filtered-single-road="handleSingleFilteredRoad"
      @district-boundaries="renderDistrictBoundary"
      @toggleRoadClass="handleToggleRoadClass"
    />
    <div id="map"></div>
    <div style="position: absolute; top: 11%; right: 28%; z-index: 1000">
      <!-- Map icon button -->
      <div
        @click="toggleDropdown"
        style="
          background-color: white;
          padding: 5px;
          border: 1px solid black;
          cursor: pointer;
        "
      >
        <font-awesome-icon
          icon="fa-solid fa-map"
          :style="{
            backgroundColor: 'transparent',
            color: '#000',
            fontSize: '24px',
          }"
        />
      </div>

      <!-- Dropdown -->
      <div
        v-if="showDropdown"
        class="dropdown"
        style="background: white; border: 1px solid gray; margin-top: 5px"
      >
        <div
          v-for="layer in baseLayers"
          :key="layer.name"
          @click="switchBaseMap(layer.url)"
          style="padding: 5px; cursor: pointer"
          @mouseover="hovered = layer.name"
          :style="{
            backgroundColor: hovered === layer.name ? '#eee' : 'white',
          }"
        >
          {{ layer.name }}
        </div>
      </div>
      <div id="popup" class="ol-popup"></div>
    </div>
    <SidePanel
      v-if="sidePanelVisible"
      :item="selectedItem"
      @close="sidePanelVisible = false"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Map from "ol/Map";
import View from "ol/View";
import { FullScreen, ScaleLine, defaults as defaultControls } from "ol/control";
import { defaults as defaultInteractions } from "ol/interaction/defaults";
import { Tile as TileLayer } from "ol/layer";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import ToolBox from "./Tool-box.vue";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Stroke, Style, Icon } from "ol/style";
import GeoJSON from "ol/format/GeoJSON";
import proj4 from "proj4";
import { Point } from "ol/geom";
import { register } from "ol/proj/proj4.js";
import Overlay from "ol/Overlay";
import { defineEmits } from "vue";
import SidePanel from "../../components/SidePanel.vue";
import { Fill, Circle as CircleStyle } from "ol/style";
import RoadLogo from "../../assets/images/road-logo.png";
import BridgeLogo from "../../assets/images/bridge-logo.png";
import SignboardLogo from "../../assets/images/signboard-logo.png";
import LightpoleLogo from "../../assets/images/lightpole-logo.png";
import RetainingwallLogo from "../../assets/images/retainingwall-logo.png";
const sidePanelVisible = ref(false);
const selectedRoad = ref(null);
let useRoadClass = false;
let showRoadIcons = true; // new flag
function handleToggleRoadClass(value) {
  useRoadClass = value;
  if (assetLayers["roads"]) {
    assetLayers["roads"].changed(); // redraw with new colors
  }
}

proj4.defs("EPSG:32643", "+proj=utm +zone=42 +datum=WGS84 +units=m +no_defs");
register(proj4);
const filteredRoadData = ref([]);

const selectedItem = ref(null); // 👈 define this

let roadLayer;
let assetLayer;

const showDropdown = ref(false);
const hovered = ref(null);
const tileUrl = ref("https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png");

const baseLayers = [
  {
    name: "OpenStreetMap",
    url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  },
  {
    name: "Carto Dark",
    url: "https://{a-d}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  },
  {
    name: "Satellite (ESRI)",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  },
  {
    name: "OpenTopoMap",
    url: "https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png",
  },
];

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

let baseTileLayer;
let map;

const switchBaseMap = (newUrl) => {
  showDropdown.value = false;
  if (baseTileLayer && newUrl) {
    baseTileLayer.setSource(new XYZ({ url: newUrl, maxZoom: 19 }));
  }
};

// 🔹 Render API GeoJSON on the map
let districtLayer;

const renderDistrictBoundary = (geoJsonData) => {
  if (!map) return;
  console.log("District boundary data:", geoJsonData);

  let featureCollection;
  if (geoJsonData.type === "Feature") {
    featureCollection = { type: "FeatureCollection", features: [geoJsonData] };
  } else if (geoJsonData.type === "FeatureCollection") {
    featureCollection = geoJsonData;
  } else if (Array.isArray(geoJsonData)) {
    featureCollection = { type: "FeatureCollection", features: geoJsonData };
  } else {
    console.error("Unsupported GeoJSON format:", geoJsonData);
    return;
  }

  // Remove old layer if exists
  if (districtLayer) {
    map.removeLayer(districtLayer);
  }

  // Read features from GeoJSON
  const features = new GeoJSON().readFeatures(featureCollection, {
    featureProjection: "EPSG:3857",
    dataProjection: "EPSG:32642",
  });
  console.log("Parsed district features in OL:", features.length);

  // Style function for district boundaries (only stroke, no fill)
  const styleFunction = () => {
    return new Style({
      stroke: new Stroke({
        color: "#000000", // bright orange
        width: 3,
      }),
      fill: null, // 🚀 no fill so it doesn’t block clicks
    });
  };

  // Create new vector layer for district boundaries
  districtLayer = new VectorLayer({
    source: new VectorSource({ features }),
    style: styleFunction,
  });

  // 🚀 Disable click interactions on district layer
  districtLayer.set("interactive", false);

  // Add to map
  map.addLayer(districtLayer);
};

// store layers by type
const assetLayers = {};

const renderAssetsOnMap = (geoJsonData, assetType, color = "#FF0000") => {
  console.log("Hello form renderasset");
  if (!map) return;
  console.log("RoadLogo path:", RoadLogo);

  let featureCollection;
  if (geoJsonData.type === "Feature") {
    featureCollection = { type: "FeatureCollection", features: [geoJsonData] };
  } else if (geoJsonData.type === "FeatureCollection") {
    featureCollection = geoJsonData;
  } else if (Array.isArray(geoJsonData)) {
    featureCollection = { type: "FeatureCollection", features: geoJsonData };
  } else {
    console.error("Unsupported GeoJSON format:", geoJsonData);
    return;
  }

  // Remove old layer for same type
  if (assetLayers[assetType]) {
    map.removeLayer(assetLayers[assetType]);
  }

  // Read features from GeoJSON
  const features = new GeoJSON().readFeatures(featureCollection, {
    featureProjection: "EPSG:3857",
    dataProjection: "EPSG:32642",
    featureLimit: Infinity, // <-- this ensures ALL 953 are read
  });
  console.log("Parsed features in OL:", features.length);
  // Attach assetType
  features.forEach((f) => f.set("assetType", assetType));

  // 🔹 Count features by geometry type
  let pointCount = 0;
  let lineCount = 0;
  let otherCount = 0;

  features.forEach((f) => {
    const geomType = f.getGeometry().getType();
    if (geomType === "Point") {
      pointCount++;
    } else if (geomType === "LineString" || geomType === "MultiLineString") {
      lineCount++;
    } else {
      otherCount++;
    }
  });

  console.log(
    `Rendered ${features.length} features for ${assetType} → Points: ${pointCount}, Lines: ${lineCount}, Others: ${otherCount}`
  );

  // Style based on geometry type
  const styleFunction = (feature) => {
    const geomType = feature.getGeometry().getType();
    const zoom = map.getView().getZoom(); // get zoom level
    let logoScale = 0.02; // default
    let width = 1;
    if (zoom >= 15) {
      width = 4;
    } else if (zoom >= 12) {
      width = 3;
    } else if (zoom >= 10) {
      width = 2;
    } else {
      width = 1;
    }
    // Dynamically adjust scale
    if (zoom >= 18) {
      logoScale = 0.08; // zoomed in (~300m)
    } else if (zoom >= 16) {
      logoScale = 0.06;
    } else if (zoom >= 14) {
      logoScale = 0.04;
    } else {
      logoScale = 0.02; // zoomed out
    }

    if (geomType === "Point") {
      return new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({ color }),
          stroke: new Stroke({ color: "#fff", width: 2 }),
        }),
      });
    }

    if (geomType === "LineString" || geomType === "MultiLineString") {
      // Base style for all lines
      let featureColor;
      if (feature.get("assetType") === "roads") {
        const props = feature.get("properties") || {};

        if (useRoadClass) {
          // ✅ Mode 2: Color by road_class
          const roadClass = props.road_type;
          console.log("Road class:", roadClass);
          if (roadClass === "Local/Access") {
            featureColor = "#00b0f0"; // Orange for local/access roads
          } else if (roadClass === "Minor Collector") {
            featureColor = "#d8d359"; // Green for minor collectors
          } else if (roadClass === "Major Collector") {
            featureColor = "#47d359"; // Purple for major collectors
          } else if (roadClass === "Arterial") {
            featureColor = "#d86dcd"; // Blue for minor arterials
          } else if (roadClass === "NHA") {
            featureColor = "#f1a983"; // Red for major arterials
          } else if (roadClass === "Freeway") {
            featureColor = "#ff0000"; // Red for expressways
          } else {
            featureColor = "#555555"; // fallback
          }
        } else {
          // ✅ Mode 1: Color by executing_agency
          const execAgency = props.executing_agency;
          if (execAgency === "C&W") {
            featureColor = "#0000FF"; // Blue
          } else if (execAgency === "PKHA") {
            featureColor = "#FF0000"; // Red
          } else if (execAgency === "NHA") {
            featureColor = "#FFFF00"; // Yellow
          } else {
            featureColor = "#888888"; // Fallback grey
          }
        }
      }
      const styles = [
        new Style({
          stroke: new Stroke({
            color: featureColor,
            width: width,
          }),
        }),
      ];

      // Extra icons only for roads
      if (feature.get("assetType") === "roads" && assetType === "roads") {
        let start, end;

        if (geomType === "LineString") {
          const coords = feature.getGeometry().getCoordinates();
          start = coords[0];
          end = coords[coords.length - 1];
        } else if (geomType === "MultiLineString") {
          const coords = feature.getGeometry().getCoordinates();
          start = coords[0][0]; // first point of first line
          const lastLine = coords[coords.length - 1];
          end = lastLine[lastLine.length - 1]; // last point of last line
        }

        styles.push(
          new Style({
            geometry: new Point(start),
            image: new Icon({
              src: RoadLogo,
              scale: logoScale,
              anchor: [0.5, 0.5],
            }),
          }),
          new Style({
            geometry: new Point(end),
            image: new Icon({
              src: RoadLogo,
              scale: logoScale,
              anchor: [0.5, 0.5],
            }),
          })
        );
      }

      return styles;
    }
  };

  // Create new vector layer
  const vectorLayer = new VectorLayer({
    source: new VectorSource({ features }),
    style: styleFunction,
  });

  map.addLayer(vectorLayer);
  assetLayers[assetType] = vectorLayer;
};

// 🔹 Receives data from Toolbox
// 🔹 Render roads (red)

import { createEmpty, extend as extendExtent } from "ol/extent";

const handleFilteredRoads = (apiResponse) => {
  if (!apiResponse?.assets?.roads?.data) {
    console.error("No road data found in API response:", apiResponse);
    return;
  }

  const roadsData = apiResponse.assets.roads.data;

  // 🔹 Compute extent directly from GeoJSON before rendering
  try {
    let featureCollection;
    if (roadsData.type === "Feature") {
      featureCollection = { type: "FeatureCollection", features: [roadsData] };
    } else if (roadsData.type === "FeatureCollection") {
      featureCollection = roadsData;
    } else if (Array.isArray(roadsData)) {
      featureCollection = { type: "FeatureCollection", features: roadsData };
    } else {
      console.error("Unsupported GeoJSON format:", roadsData);
      return;
    }

    const features = new GeoJSON().readFeatures(featureCollection, {
      featureProjection: "EPSG:3857",
      dataProjection: "EPSG:32642",
    });

    if (features.length > 0) {
      let extent = createEmpty();
      features.forEach((f) => {
        extendExtent(extent, f.getGeometry().getExtent());
      });

      map.getView().fit(extent, { padding: [50, 50, 50, 50], duration: 1000 });
    }
  } catch (err) {
    console.error("Error computing extent:", err);
  }

  // 🔹 Finally, render the assets
  renderAssetsOnMap(roadsData, "roads", "#FF0000"); // red
};

// 🔹 Render guard rails (blue)
// Define a color palette for each asset type
const assetColors = {
  bridges: "#1E90FF", // dodger blue
  guard_rails: "#0077FF", // deep blue
  tolls: "#FF8C00", // dark orange
  culverts: "#32CD32", // lime green
  signboards: "#FFD700", // gold
  light_poles: "#FF1493", // deep pink
  retaining_walls: "#8B4513", // saddle brown
  dike_curb_stones: "#800080", // purple
  drainages: "#00CED1", // dark turquoise
  interchanges: "#FF4500", // orange red
  tunnels: "#2F4F4F", // dark slate gray
  patch_conditions: "#FF69B4", // hot pink
  // add more asset types + colors here...
};

const handleFilteredAssets = (apiResponse) => {
  if (!apiResponse) {
    console.warn("No API response");
    return;
  }

  // normalize selected assets
  console.log(
    "Culverts count from API:",
    apiResponse.assets?.culverts?.data?.features?.length
  );

  let selectedAssets = apiResponse?.filters_applied?.assets || "";
  if (typeof selectedAssets === "string") {
    selectedAssets = selectedAssets.split(",").map((a) => a.trim());
  }

  console.log("Parent received filtered-assets:", selectedAssets);

  // loop through and render each asset with its color
  selectedAssets.forEach((assetKey) => {
    const assetEntry = apiResponse.assets?.[assetKey];
    if (assetEntry?.data) {
      const color = assetColors[assetKey] || "#FF0000"; // fallback red if not in map
      console.log(`Rendering ${assetKey} with color ${color}`);
      console.log("Asset entry data:", assetEntry.data);
      renderAssetsOnMap(assetEntry.data, assetKey, color);
    } else {
      console.warn(`No data for asset: ${assetKey}`);
    }
  });
};
//handle single road with assets
const handleSingleFilteredRoad = (apiResponse) => {
  console.log("Single road data received:", apiResponse);

  handleFilteredRoads(apiResponse); // red

  console.log("Culverts data:", roadsData);
};
const renderSingleRoad = (geoJsonData, assetType, color = "#FF0000") => {
  if (!map) return;
  let featureCollection;
  if (geoJsonData.type === "Feature") {
    featureCollection = { type: "FeatureCollection", features: [geoJsonData] };
  } else if (geoJsonData.type === "FeatureCollection") {
    featureCollection = geoJsonData;
  } else if (Array.isArray(geoJsonData)) {
    featureCollection = { type: "FeatureCollection", features: geoJsonData };
  } else {
    console.error("Unsupported GeoJSON format:", geoJsonData);
    return;
  }

  // Remove old layer for same type
  if (assetLayers[assetType]) {
    map.removeLayer(assetLayers[assetType]);
  }

  // Read features from GeoJSON
  const features = new GeoJSON().readFeatures(featureCollection, {
    featureProjection: "EPSG:3857",
    dataProjection: "EPSG:32642",
    featureLimit: Infinity, // <-- this ensures ALL 953 are read
  });
  console.log("Parsed features in OL:", features.length);
  // Attach assetType
  features.forEach((f) => f.set("assetType", assetType));

  // 🔹 Count features by geometry type
  let pointCount = 0;
  let lineCount = 0;
  let otherCount = 0;

  features.forEach((f) => {
    const geomType = f.getGeometry().getType();
    if (geomType === "Point") {
      pointCount++;
    } else if (geomType === "LineString" || geomType === "MultiLineString") {
      lineCount++;
    } else {
      otherCount++;
    }
  });

  console.log(
    `Rendered ${features.length} features for ${assetType} → Points: ${pointCount}, Lines: ${lineCount}, Others: ${otherCount}`
  );

  // Style based on geometry type
  const styleFunction = (feature) => {
    const geomType = feature.getGeometry().getType();
    const zoom = map.getView().getZoom(); // get zoom level
    let logoScale = 0.02; // default

    // Dynamically adjust scale
    if (zoom >= 18) {
      logoScale = 0.08; // zoomed in (~300m)
    } else if (zoom >= 16) {
      logoScale = 0.06;
    } else if (zoom >= 14) {
      logoScale = 0.04;
    } else {
      logoScale = 0.02; // zoomed out
    }

    if (geomType === "Point") {
      return new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({ color }),
          stroke: new Stroke({ color: "#fff", width: 2 }),
        }),
      });
    }

    if (geomType === "LineString" || geomType === "MultiLineString") {
      // Base style for all lines
      let featureColor;
      if (feature.get("assetType") === "roads") {
        // Roads get agency-based color

        const props = feature.get("properties") || {};

        const execAgency = props.executing_agency;
        if (execAgency === "C&W") {
          featureColor = "#0000FF"; // Blue
        } else if (execAgency === "PKHA") {
          featureColor = "#FF0000"; // Red
        } else if (execAgency === "NHA") {
          featureColor = "#FFFF00"; // Yellow
        } else {
          featureColor = "#888888"; // Fallback grey
        }
      } else {
        // Non-roads: use assetColors map if available, fallback to default gray
        featureColor = assetColors[feature.get("assetType")] || "#808080";
      }
      const styles = [
        new Style({
          stroke: new Stroke({
            color: featureColor,
            width: 4,
          }),
        }),
      ];

      // Extra icons only for roads
      if (feature.get("assetType") === "roads") {
        let start, end;

        if (geomType === "LineString") {
          const coords = feature.getGeometry().getCoordinates();
          start = coords[0];
          end = coords[coords.length - 1];
        } else if (geomType === "MultiLineString") {
          const coords = feature.getGeometry().getCoordinates();
          start = coords[0][0]; // first point of first line
          const lastLine = coords[coords.length - 1];
          end = lastLine[lastLine.length - 1]; // last point of last line
        }

        styles.push(
          new Style({
            geometry: new Point(start),
            image: new Icon({
              src: RoadLogo,
              scale: logoScale,
              anchor: [0.5, 0.5],
            }),
          }),
          new Style({
            geometry: new Point(end),
            image: new Icon({
              src: RoadLogo,
              scale: logoScale,
              anchor: [0.5, 0.5],
            }),
          })
        );
      }

      return styles;
    }
  };

  // Create new vector layer
  const vectorLayer = new VectorLayer({
    source: new VectorSource({ features }),
    style: styleFunction,
  });

  map.addLayer(vectorLayer);
  assetLayers[assetType] = vectorLayer;
};

const renderPciLines = (geoJsonData) => {
  // hot pink
};

// 🔹 Initialize map ONCE
onMounted(() => {
  const mapEl = document.getElementById("map");
  if (!mapEl) return;

  baseTileLayer = new TileLayer({
    source: new XYZ({ url: tileUrl.value, maxZoom: 19 }),
  });

  map = new Map({
    target: mapEl,
    layers: [baseTileLayer],
    view: new View({
      center: fromLonLat([72.058, 34.63]),
      zoom: 12,
    }),
    controls: defaultControls({ attribution: false }).extend([
      new FullScreen(),
      new ScaleLine(),
    ]),
    interactions: defaultInteractions(),
  });
  const overlay = new Overlay({
    element: popup,
    autoPan: {
      animation: {
        duration: 250,
      },
    },
  });

  map.addOverlay(overlay);
  map.on("singleclick", function (evt) {
    const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => f);

    if (feature) {
      const props = feature.getProperties();
      const type = props.assetType; // roads | guard_rails | etc.
      delete props.geometry;
      console.log("Feature clicked:", type);
      console.log("Feature clicked:", props);
      const coordinates = evt.coordinate;
      overlay.setPosition(coordinates);
      const data = props.properties || props;
      // build popup dynamically
      let html = ``;

      if (type === "roads") {
        html += `
        <div><h3 style="margin-left:auto; font-size:14px;"><b>Road:</b> <img src="${RoadLogo}" style="width: 28px; height: 28px;" alt="Road Icon" /></h3>
        <p><b>Name:</b> ${data.name || "N/A"}</p>
        <p><b>Length (km):</b> ${data.road_length || "N/A"}</p>
        <p><b>Carriageway:</b> ${data.carriageway_type || "N/A"}</p>
        <p><b>Number of Lanes:</b> ${data.no_of_lanes || "N/A"}</p>
        <p><b>Traffic:</b> ${data.traffic_flow_direction || "N/A"}</p>
      `;
      } else if (type === "guard_rails") {
        html += `
        <div><h3 style="margin-left:auto; font-size:14px;"><b>Guard Rail:</b></h3>
        <p><b>ID:</b> ${data.road_name || "N/A"}</p>
        <p><b>Type:</b> ${data.type_of_guard_rail || "N/A"}</p>
        <p><b>Side:</b> ${data.side || "N/A"}</p>
        <p><b>Condition:</b> ${data.condition || "N/A"}</p>
      `;
      } else if (type === "bridges") {
        html += `
        <div><h3 style="margin-left:auto; font-size:14px;"><b>Bridge:</b> <img src="${BridgeLogo}" style="width: 28px; height: 28px;" alt="Bridge Icon" /></h3>
        <p><b>ID:</b> ${data.road_name || "N/A"}</p>
        <p><b>Spans:</b> ${data.no_of_spans || "N/A"}</p>
        <p><b>Span Length:</b> ${data.span_length || "N/A"}</p>
        <p><b>Total Deck Width:</b> ${data.total_deck_width || "N/A"}</p>
      `;
      } else if (type === "culverts") {
        html += `
        <div><h3 style="margin-left:auto; font-size:14px;"><b>Culvert:</b></h3>
          <p><b>Road name:</b> ${data.road_name || "N/A"}</p>
          <p><b>Type:</b> ${data.construction_type || "N/A"}</p>
          <p><b>Cells:</b> ${data.no_of_cells || "N/A"}</p>
          <p><b>Length:</b> ${data.length || "N/A"}</p>`;
      } else if (type === "sign_boards") {
        html += `
        <div><h3 style="margin-left:auto; font-size:14px;"><b>Sign Board:</b> <img src="${SignboardLogo}" style="width: 28px; height: 28px;" alt="Sign Board Icon" /></h3>
          <p><b>Road name:</b> ${data.road_name || "N/A"}</p>
          <p><b>Type:</b> ${data.type_of_sign_board || "N/A"}</p>
          <p><b>Side:</b> ${data.side || "N/A"}</p>
          <p><b>Condition:</b> ${data.condition || "N/A"}</p>`;
      } else if (type === "tolls") {
        html += `
        <div><h3 style="margin-left:auto; font-size:14px;"><b>Toll:</b></h3>
          <p><b>Road name:</b> ${data.road_name || "N/A"}</p>
          <p><b>Road name:</b> ${data.road_name || "N/A"}</p>
          <p><b>Road name:</b> ${data.road_name || "N/A"}</p>`;
      } else if (type === "light_poles") {
        html += `
        <div><h3 style="margin-left:auto; font-size:14px;"><b>Light Pole:</b> <img src="${LightpoleLogo}" style="width: 28px; height: 28px;" alt="Light Pole Icon" /></h3>
          <p><b>Road name:</b> ${data.road_name || "N/A"}</p>
          <p><b>Type:</b> ${data.type_of_light_pole || "N/A"}</p>
          <p><b>Side:</b> ${data.side || "N/A"}</p>
          <p><b>Condition:</b> ${data.condition || "N/A"}</p>`;
      } else if (type === "interchanges") {
        html += `
        <div><h3 style="margin-left:auto; font-size:14px;"><b>Interchange:</b></h3>
          <p><b>Road name:</b> ${data.road_name || "N/A"}</p>
          <p><b>Type:</b> ${data.type_of_interchange || "N/A"}</p>
          <p><b>Condition:</b> ${data.condition || "N/A"}</p>`;
      } else if (type === "patch_conditions") {
        html += `
        <div><h3 style="margin-left:auto; font-size:14px;"><b>Patch Conditions:</b></h3>
          <p><b>Road name:</b> ${data.road_name || "N/A"}</p>
          <p><b>District:</b> ${data.district || "N/A"}</p>
          <p><b>Condition:</b> ${data.condition || "N/A"}</p>
          `;
      } else if (type === "commercial_entities") {
        html += `
        <div><h3 style="margin-left:auto; font-size:14px;"><b>Commercial Entity:</b></h3>
          <p><b>Road name:</b> ${data.road_name || "N/A"}</p>
          <p><b>District:</b> ${data.district || "N/A"}</p>
          <p><b>Type:</b> ${data.commercial_entity || "N/A"}</p>`;
      } else if (type === "road_crossings") {
        html += `
        <div><h3 style="margin-left:auto; font-size:14px;"><b>Road Crossing:</b></h3>
          <p><b>Road name:</b> ${data.road_name || "N/A"}</p>
          <p><b>Type:</b> ${data.type_of_road_crossing || "N/A"}</p>
          <p><b>Skew?:</b> ${data.is_skewed || "False"}</p>
          <p><b>Headwalls:</b> ${data.type_of_headwalls || "N/A"}</p>
          `;
      } else if (type === "drainages") {
        html += `
        <div><h3 style="margin-left:auto; font-size:14px;"><b>Drainage:</b></h3>
          <p><b>Road name:</b> ${data.road_name || "N/A"}</p>
          <p><b>Drain Type:</b> ${data.drain_type || "N/A"}</p>
          <p><b>Brest wall:</b> ${data.brest_wall_type || "False"}</p>
          <p><b>Side:</b> ${data.side || "N/A"}</p>`;
      } else if (type === "retaining_walls") {
        html += `
        <div><h3 style="margin-left:auto; font-size:14px;"><b>Retaining Wall:</b> <img src="${RetainingwallLogo}" style="width: 28px; height: 28px;" alt="Light Pole Icon" /></h3>
            <p><b>Road name:</b> ${data.road_name || "N/A"}</p>
          <p><b>Type:</b> ${data.type_of_retaining_wall || "N/A"}</p>
          <p><b>Paraphet:</b> ${data.has_paraphet_wall || "False"}</p>
          <p><b>Side:</b> ${data.side || "N/A"}</p>`;
      } else if (type === "dike_curb_stones") {
        html += `
        <div><h3 style="margin-left:auto; font-size:14px;"><b>DikeCurb Stone:</b></h3>
          <p><b>Road name:</b> ${data.road_name || "N/A"}</p>
          <p><b>Type:</b> ${data.type_of_retaining_wall || "N/A"}</p>
          <p><b>Paraphet:</b> ${data.has_paraphet_wall || "False"}</p>
          <p><b>Side:</b> ${data.side || "N/A"}</p>`;
      } else if (type === "tunnels") {
        html += `
        <div><h3 style="margin-left:auto; font-size:14px;"><b>Tunnels:</b></h3>`;
      } else {
        // fallback: show all props
        Object.entries(props).forEach(([k, v]) => {
          html += `<p><b>${k}:</b> ${v}</p>`;
        });
      }

      html += `
      <button id="view-more-btn"
        style="margin-top:5px;background:none;border:1px solid #2196f3;
        color:#2196f3;padding:4px 8px;border-radius:4px;cursor:pointer;">
        View More
      </button>
    </div>`;

      popup.innerHTML = html;

      // button click
      document.getElementById("view-more-btn").onclick = () => {
        handleViewMore({ type, data: props });
        sidePanelVisible.value = true;
        selectedItem.value = { type, data: props };
      };
    } else {
      overlay.setPosition(undefined);
    }
  });
});

//view more button reponsible for passing data to the sidepanel component
const emit = defineEmits(["showSidePanel"]);

function handleViewMore(item) {
  console.log("View More clicked:", item);
  emit("showSidePanel", item); // send type + data
}

// 🔹 Export map to PDF
const handleExportMapPdf = async () => {
  const mapElement = document.getElementById("map1");
  if (!mapElement) return;

  const controls = mapElement.querySelectorAll(".ol-control");
  controls.forEach((c) => (c.style.display = "none"));

  try {
    const canvas = await html2canvas(mapElement, { useCORS: true, scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? "l" : "p",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("map_screenshot.pdf");
  } catch (err) {
    console.error("Error exporting PDF:", err);
  } finally {
    controls.forEach((c) => (c.style.display = ""));
  }
};

// 🔹 Center map
const handleCenterMap = (coordinates) => {
  if (map) {
    map.getView().setCenter(fromLonLat(coordinates));
    console.log("Map centered to:", coordinates);
  }
};
</script>

<style scoped>
#map {
  padding-top: 1.2%;
  width: 100%;
  height: 52.4rem;
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
  background-color: rgb(21, 68, 62);
  color: white;
  font-weight: bold;
  font-size: 18px;
}

::v-deep .ol-zoom-in:hover,
::v-deep .ol-zoom-out:hover {
  background-color: #131749;
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
.ol-popup {
  position: absolute;
  background: white;
  border-radius: 8px;
  padding: 10px;
  border: 1px solid #ccc;
  min-width: 260px;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
</style>
