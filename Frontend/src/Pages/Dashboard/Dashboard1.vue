<template>
    <div id="map1">
      <ToolBox :map="map" @export-map-pdf="handleExportMapPdf" @center-map="handleCenterMap" />
      <div id="map"></div>
      <div id="info" v-if="mapInitialized">
          <h3>Road Structure Details</h3>
          <p><strong>Road:</strong> <span id="info_road">{{ data.road }}</span></p>
          <p><strong>District:</strong> <span id="info_district">{{ data.district }}</span></p>
          <p><strong>Number of Spans:</strong> <span id="info_no_of_spans">{{ data.no_of_spans }}</span></p>
          <p><strong>Span Length:</strong> <span id="info_span_length">{{ data.span_length }}</span> meters</p>
          <p><strong>Reference Location:</strong> <span id="info_location">{{ data.latitude }}, {{ data.longitude }}</span></p>
          <p><em>(Geometry plotted on map)</em></p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from "vue";
  import Map from "ol/Map";
  import View from "ol/View";
  import { FullScreen, ScaleLine, defaults as defaultControls } from "ol/control";
  import { defaults as defaultInteractions } from "ol/interaction/defaults";
  import { Tile as TileLayer } from "ol/layer";
  import OSM from "ol/source/OSM";
  import XYZ from "ol/source/XYZ";
  import { fromLonLat } from "ol/proj";
  
  // Import modules for vector data and WKB
  import VectorLayer from "ol/layer/Vector";
  import VectorSource from "ol/source/Vector";
  import WKB from "ol/format/WKB";
  import { Style, Stroke, Fill, Circle } from "ol/style";
  
  import ToolBox from "./Tool-box.vue"; // Assuming Tool-box.vue is in the same directory
  import html2canvas from "html2canvas";
  import jsPDF from "jspdf";
  import WKT from "ol/format/WKT";
import GeoJSON from 'ol/format/GeoJSON';
  
  let map; // declare map variable
  const mapInitialized = ref(false); // To conditionally render info box after map is ready
  
  const data = {
    road: "s-14",
    district: "600CHA",
    no_of_spans: 2,
    span_length: 20,
    latitude: 30.3753,
    longitude: 69.3451,
    type:"LineString",
    coordinates:[
                    [
                        [
                            72.05677058200007,
                            34.63279286000005
                        ],
                        [
                            72.05747908000006,
                            34.63210205900003
                        ],
                        [
                            72.05828812000004,
                            34.63131776800003
                        ],
                        [
                            72.05850439900007,
                            34.630673881000064
                        ],
                        [
                            72.05875782700008,
                            34.630162519000066
                        ],
                        [
                            72.05895989200008,
                            34.629543271000045
                        ],
                        [
                            72.05911196000005,
                            34.629155138000044
                        ],
                        [
                            72.05919780200003,
                            34.62882992500005
                        ]
                    ]
                ]
    }
  onMounted(() => {
    const mapEl = document.getElementById("map");
    console.log("Map element:", mapEl); // Must NOT be null
  
    if (!mapEl) {
      console.error("Map element not found. Cannot initialize map.");
      return;
    }


    // Parse the WKB geometry
    const wktFormat = new WKT();
let feature;
  const geojsonFormat = new GeoJSON();

try {

  feature = geojsonFormat.readFeature({
    type: 'Feature',
  geometry: {
  type: data.type,
  coordinates: data.coordinates
},
    properties: {}
  }, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857',
  });
  console.log("GeoJSON Geometry:", data.geom);
  console.log("Data object:", data);

  feature.setProperties({
    road: data.road,
    district: data.district,
    no_of_spans: data.no_of_spans,
    span_length: data.span_length,
    latitude: data.latitude,
    longitude: data.longitude,
  });

  // Add feature to your vector source (example):
  // vectorSource.addFeature(feature);

} catch (e) {
  console.error('Error parsing GeoJSON:', e);
}

    // Create a vector source and layer for the WKB feature
    const vectorSource = new VectorSource({
      features: [feature], // Add the parsed feature to the source
    });
  
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        stroke: new Stroke({
          color: "rgba(255, 0, 0, 0.7)", // Red line for the road
          width: 4,
        }),
        // If it's a polygon, you might want a fill
        fill: new Fill({
          color: "rgba(255, 0, 0, 0.2)", // Light red fill for polygons
        }),
        // If the geometry could be a point (e.g., center point), style it
        image: new Circle({
          radius: 8,
          fill: new Fill({ color: 'blue' }),
          stroke: new Stroke({ color: 'white', width: 2 })
        })
      }),
      title: "Road Geometry", // Title for layer switcher if you add one
      zIndex: 10, // Ensure it's on top of base layers
    });
  
    map = new Map({
      target: mapEl,
      layers: [
        // Base Layers
        new TileLayer({
          source: new XYZ({
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            attributions:
              "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
            maxZoom: 58,
          }),
          visible: true, // Make Esri Imagery your default base map
          title: "Esri World Imagery (Satellite)",
        }),
      // /* */  new TileLayer({
      //     source: new OSM(),
      //     visible: true,
      //     title: "OpenStreetMap (Standard Roads)",
      //    }),
        // new TileLayer({
        //   source: new XYZ({
        //     url: "https://{a-b}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
        //     attributions:
        //       "© <a href=\"https://carto.com/basemaps/\">CartoDB</a>, © <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap contributors</a>",
        //     maxZoom: 19,
        //   }),
        //   visible: false,
        //   title: "CartoDB Positron (Light Roads)",
        // }),
        // new TileLayer({
        //   source: new XYZ({
        //     url: "https://{a-d}.basemaps.cartocdn.com/dark_matter_all/{z}/{x}/{y}.png",
        //     attributions:
        //       "© <a href=\"https://carto.com/basemaps/\">CartoDB</a>, © <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap contributors</a>",
        //     maxZoom: 19,
        //   }),
        //   visible: false,
        //   title: "CartoDB Dark Matter (Dark Roads)",
        // }),
        // new TileLayer({
        //   source: new XYZ({
        //     url: "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png",
        //     attributions:
        //       "&copy; <a href=\"https://wikimediafoundation.org/wiki/Maps_terms_of_use\">Wikimedia Maps</a> contributors, <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap contributors</a>",
        //     maxZoom: 19,
        //   }),
        //   visible: false,
        //   title: "Wikimedia Maps (Roads)",
        // }),
        // new TileLayer({
        //   source: new XYZ({
        //     url: "https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png",
        //     attributions:
        //       "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap contributors</a>, Tiles: <a href=\"https://hot.openstreetmap.org/\">Humanitarian OpenStreetMap Team</a>",
        //     maxZoom: 18,
        //   }),
        //   visible: false,
        //   title: "OpenStreetMap HOT (Roads)",
        // }),
        // new TileLayer({
        //   source: new XYZ({
        //     url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
        //     attributions:
        //       "Tiles &copy; Esri &mdash; Sources: Esri, HERE, Garmin, USGS, NGA, EPA, USDA, NPS",
        //     maxZoom: 16,
        //   }),
        //   visible: false,
        //   title: "Esri Light Gray Canvas (Subtle)",
        // }),
        // new TileLayer({
        //   source: new XYZ({
        //     url: "https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png",
        //     attributions:
        //       'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        //     maxZoom: 17,
        //   }),
        //   visible: false,
        //   title: "OpenTopoMap (Terrain)",
        // }),
        // Add the WKB vector layer
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([data.longitude, data.latitude]), // Use the specific coordinates from your data
        zoom: 12, // Start with a closer zoom to see the feature
      }),
      controls: defaultControls({ attribution: false }).extend([
        new FullScreen(),
        new ScaleLine(),
      ]),
      interactions: defaultInteractions(),
    });
  
    // Fit the map view to the extent of the WKB feature after map is rendered
    map.on('rendercomplete', () => {
      if (feature && feature.getGeometry()) {
          const extent = feature.getGeometry().getExtent();
          // Check if extent is valid before fitting
          if (extent[0] !== Infinity && extent[1] !== Infinity && extent[2] !== -Infinity && extent[3] !== -Infinity) {
              map.getView().fit(extent, {
                  padding: [50, 50, 50, 50], // Add some padding around the feature
                  duration: 1000, // Smooth transition
                  constrainResolution: false // Allow any resolution during fit
              });
          }
      }
      mapInitialized.value = true; // Set flag to true once map is fully initialized
    }, { once: true }); // Run this listener only once
  
  
  });
  
  const handleExportMapPdf = async () => {
    const mapElement = document.getElementById("map1");
  
    if (!mapElement) {
      console.error("Map element not found for screenshot.");
      return;
    }
  
    // Hide OpenLayers controls temporarily to get a clean screenshot
    const controls = mapElement.querySelectorAll(".ol-control");
    controls.forEach((control) => {
      control.style.display = "none";
    });
    // Hide the info box temporarily as well
    const infoBox = document.getElementById('info');
    if (infoBox) infoBox.style.display = 'none';
  
    // Take screenshot using html2canvas
    try {
      const canvas = await html2canvas(mapElement, {
        useCORS: true, // Important for cross-origin map tiles
        scale: 2, // Increase scale for higher resolution screenshot
        logging: false, // Disable html2canvas logging if not needed
        ignoreElements: (element) => {
          // Optionally ignore specific elements if they cause issues or are not desired in PDF
          return element.id === 'info'; // Example: don't include the info box in the screenshot
        }
      });
  
      const imgData = canvas.toDataURL("image/png"); // Get image data as PNG
  
      // Calculate PDF dimensions based on the canvas aspect ratio
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const pdf = new jsPDF({
        orientation: imgWidth > imgHeight ? "l" : "p", // Landscape if width > height, else Portrait
        unit: "px", // Use pixels as unit for consistency with canvas
        format: [imgWidth, imgHeight], // Set PDF format to image dimensions
      });
  
      // Add the image to the PDF
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  
      // Save the PDF
      pdf.save("map_screenshot.pdf");
  
      console.log("Map exported to PDF successfully!");
    } catch (error) {
      console.error("Error exporting map to PDF:", error);
    } finally {
      // Show OpenLayers controls again
      controls.forEach((control) => {
        control.style.display = ""; // Reset display style
      });
      // Show the info box again
      if (infoBox) infoBox.style.display = '';
    }
  };
  
  const handleCenterMap = (coordinates) => {
    if (map) {
      // Set the map view to the new center
      map.getView().setCenter(fromLonLat(coordinates));
      // Optional: You might want to set a specific zoom level as well
      map.getView() // A reasonable zoom to see the feature
      console.log("Map centered to:", coordinates);
    } else {
      console.warn("Map object not yet initialized when Center Map was clicked.");
    }
  };
  
  // Optional: destroy map cleanly when component unmounts
  // import { onBeforeUnmount } from 'vue';
  // onBeforeUnmount(() => {
  //   if (map) {
  //     map.setTarget(undefined);
  //     map = null;
  //   }
  // });
  </script>
  
  <style scoped>
  #map1 {
      position: relative; /* Needed for absolute positioning of info box */
      width: 100%;
      height: 53.4rem; /* Ensure parent has defined height */
  }
  
  #map {
    width: 100%;
    height: 100%; /* Fill the parent #map1 */
    border-radius: 10px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
  
  #info {
      position: absolute;
      top: 10px;
      right: 10px; /* Changed to right for better placement */
      background: rgba(255, 255, 255, 0.9);
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      z-index: 1000;
      max-width: 300px;
      font-size: 0.9em;
  }
  #info h3 {
      margin-top: 0;
      color: #333;
      border-bottom: 1px solid #eee;
      padding-bottom: 5px;
      margin-bottom: 10px;
  }
  #info p {
      margin: 5px 0;
      line-height: 1.4;
  }
  #info strong {
      color: #555;
  }
  
  
  /* Apply styles deeply to OpenLayers controls */
  ::v-deep .ol-control {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 4px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  }
  
  ::v-deep .ol-zoom {
    /* top: 10px; Removing fixed top/left so OpenLayers places them */
    /* left: 10px; */
    height: 0px; /* This makes the default zoom buttons essentially invisible */
    background: none;
  }
  
  ::v-deep .ol-full-screen {
    top: 10px; /* Adjust as needed */
    right: 10px; /* Adjust as needed, avoid conflict with info box */
    background-color: #2196f3;
    color: white; /* Changed color to white for visibility */
    width: auto; /* Allow button to size naturally */
    height: auto; /* Allow button to size naturally */
    padding: 5px 8px; /* Add some padding */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3); /* Add box shadow */
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