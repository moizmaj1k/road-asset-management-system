<script setup>
import { ref, onMounted, watch } from 'vue';
import { useAdminToolsStore } from '../../../stores/adminTools';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Draw from 'ol/interaction/Draw';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

const mapElement = ref(null);
const store = useAdminToolsStore();
let map, vectorLayer, drawInteraction;

onMounted(() => {
  vectorLayer = new VectorLayer({ source: new VectorSource() });
  map = new Map({
    target: mapElement.value,
    layers: [new TileLayer({ source: new OSM() }), vectorLayer],
    view: new View({ center: [0,0], zoom: 2 })
  });
});

watch(() => store.drawMode, (mode) => {
  if (drawInteraction) map.removeInteraction(drawInteraction);
  if (mode) {
    drawInteraction = new Draw({
      source: vectorLayer.getSource(),
      type: mode
    });
    drawInteraction.on('drawend', (evt) => {
      store.setFeatureGeometry(evt.feature.getGeometry().getCoordinates());
    });
    map.addInteraction(drawInteraction);
  }
});
</script>

<template>
  <div ref="mapElement" class="w-full h-full"></div>
</template>

<style>
div { height: 100%; }
</style>
