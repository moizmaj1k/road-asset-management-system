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
import Feature from 'ol/Feature';
import { LineString } from 'ol/geom';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Stroke, Style } from 'ol/style';
import { MultiLineString } from 'ol/geom';

let map; // declare map variable
const value= [{
  roadname: "Pakistan",
"geometry": {
                "type": "MultiLineString",
                "coordinates": [
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
                ]
            },
                
},

{roadname: "India",
  coordinates: [78.9629, 20.5937],
},{
    roadname: "China",
  coordinates: [69.3451, 30.3753],
  }]
  
onMounted(() => {
  const mapEl = document.getElementById("map");
  if (!mapEl) return;

  // Transform coordinates for MultiLineString
  const transformedCoords = value[0].geometry.coordinates.map(line =>
    line.map(coord => fromLonLat(coord))
  );

  // Create Feature
  const lineFeature = new Feature({
    geometry: new MultiLineString(transformedCoords),
    name: value[0].roadname,
  });

  // Style
  lineFeature.setStyle(
    new Style({
      stroke: new Stroke({
        color: 'red',
        width: 6,
      }),
    })
  );

  // Vector layer
  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      features: [lineFeature],
    }),
  });

  // 🟢 Final combined map instance (ONLY ONCE!)
  map = new Map({
    target: mapEl,
    layers: [
      new TileLayer({
        source: new OSM(),
        visible: true,
        title: "OpenStreetMap (Standard Roads)",
      }),
      vectorLayer // Attach vector layer to same map
    ],
    view: new View({
      center: fromLonLat([72.058, 34.63]),
      zoom: 16,
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
  background-color: #131749;
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
</style>