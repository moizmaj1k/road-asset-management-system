<template>
  <div ref="mapContainer" class="map" />
  <div class="absolute top-20 left-6"  ><ToolBox/></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import ToolBox from './Tool-box.vue'

const mapContainer = ref(null)

onMounted(() => {
  new Map({
    target: mapContainer.value,
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: [0, 0], // Center in EPSG:3857 projection
      zoom: 2,
    }),
  })
})
</script>

<style scoped>
.map {
  width: 100%;
  height: 53.4rem;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}
</style>
