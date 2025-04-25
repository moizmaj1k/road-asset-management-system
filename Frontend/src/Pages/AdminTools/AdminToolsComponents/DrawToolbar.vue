<template>
    <div class="bg-white p-2 rounded shadow">
      <button @click="select('Point')">Point</button>
      <button @click="select('LineString')">Line</button>
      <button @click="select('Polygon')">Polygon</button>
      <!-- freehand, circle… -->
      <hr>
      <select v-model="store.entityCategory">
        <option disabled value="">Select entity</option>
        <option>Bridge</option>
        <option>Culvert</option>
        <!-- etc -->
      </select>
    </div>
  </template>
  
  <script setup>
  import { useAdminToolsStore } from '../../../stores/adminTools';
  const store = useAdminToolsStore();
  
  function select(type) {
    store.setDrawMode(type);
  }
  </script>
  