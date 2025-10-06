
<template>
<div class="map-container">
        <div id="map"></div>
      </div>
</template>
<script setup>
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
import { ref, onMounted } from "vue";
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

</script>

<style scoped>
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
</style>