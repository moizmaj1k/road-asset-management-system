<template>
    <FeatureForm
      :geometry="store.featureGeometry"
      :category="store.entityCategory"
      @save="saveFeature"
    />
  </template>
  <script setup>
  import { useAdminToolsStore } from '../../stores/adminTools';
  import FeatureForm from './AdminToolsComponents/FeatureForm.vue';
  const store = useAdminToolsStore();
  
  function saveFeature(payload) {
    // TODO: replace with real API call
    console.log('Saving feature to backend:', payload);
    // store.saveFeature(payload);
  }
  </script>
  