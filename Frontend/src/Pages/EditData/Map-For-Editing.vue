<template>
    <div id="olMap" class="map"></div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  
  onMounted(async () => {
    const { default: Map } = await import('ol/Map')
    const { default: View } = await import('ol/View')
    const { default: TileLayer } = await import('ol/layer/Tile')
    const { default: OSM } = await import('ol/source/OSM')
    const { defaults: defaultControls } = await import('ol/control')
  
    new Map({
      target: 'olMap',
      controls: defaultControls({
        zoom: false,
        attribution: false
      }),
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    })
  })
  </script>
  
  <style scoped>
  .map {
    width: 100%;
    height: 100%;
  }
  </style>
  