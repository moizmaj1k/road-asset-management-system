<template>
  <div>
    <ToolBox />
    <div id="map"></div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import Map from "ol/Map";
import View from "ol/View";
import { FullScreen, ScaleLine, defaults as defaultControls } from "ol/control";
import { defaults as defaultInteractions } from "ol/interaction/defaults";
import { Tile as TileLayer } from "ol/layer";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import ToolBox from "./Tool-box.vue";

let map; // declare map variable

onMounted(() => {
  const mapEl = document.getElementById("map");
  console.log("Map element:", mapEl); // Must NOT be null

  if (!mapEl) return;

  map = new Map({
    target: mapEl,
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: fromLonLat([69.3451, 30.3753]),
      zoom: 6,
    }),
    controls: defaultControls({ attribution: false }).extend([
      new FullScreen(),
      new ScaleLine(),
    ]),
    interactions: defaultInteractions(),
  });
});

// Optional: destroy map cleanly when component unmounts
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
}

::v-deep .ol-zoom-in,
::v-deep .ol-zoom-out {
  background-color: #4CAF50;
  color: white;
  font-weight: bold;
  font-size: 18px;
}

::v-deep .ol-zoom-in:hover,
::v-deep .ol-zoom-out:hover {
  background-color: #388E3C;
}

::v-deep .ol-full-screen {
  top: 10px;
  right: 2rem;
  background-color: #2196F3;
  color: rgb(255, 0, 0);
  width: 10px;
  height: 10px;
  background: none;
}
::v-deep .ol-zoom {
  height: 0px;
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

