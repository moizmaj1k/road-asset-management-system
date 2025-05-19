<script setup>
import { ref, onMounted, watch } from 'vue'
import { useAdminToolsStore } from '../../../stores/adminTools'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import Draw from 'ol/interaction/Draw'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'

const mapEl = ref(null)
const store = useAdminToolsStore()
let map, drawInteraction

onMounted(() => {
  const source = new VectorSource()
  map = new Map({
    target: mapEl.value,
    layers: [
      new TileLayer({ source: new OSM() }),
      new VectorLayer({ source })
    ],
    view: new View({ center: [0,0], zoom: 2 })
  })

  watch(() => store.drawMode, (mode) => {
    if (drawInteraction) map.removeInteraction(drawInteraction)
    if (mode) {
      drawInteraction = new Draw({ source, type: mode })
      drawInteraction.on('drawend', e => {
        store.setFeatureGeometry(e.feature.getGeometry().getCoordinates())
      })
      map.addInteraction(drawInteraction)
    }
  })
})
</script>

<template>
  <div ref="mapEl" class="map-container"></div>
</template>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
}
</style>
