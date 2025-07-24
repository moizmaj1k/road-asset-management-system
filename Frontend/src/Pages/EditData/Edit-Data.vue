<template>
    <div class="road-feature-selector">
      <div class="features">
        <button
          v-for="feature in features"
          :key="feature.key"
          @click="selectFeature(feature.key)"
          :class="{ active: currentFeature === feature.key }"
        >
          {{ feature.label }}
        </button>
      </div>
      <component :is="currentFormComponent" />
    </div>
  </template>
  
  <script setup>
  import { ref, computed, defineAsyncComponent } from 'vue'
  
  // Feature map
  const features = [
    {key: 'Road', label: 'Road' },
  { key: 'drainage', label: 'Drainage' },
  { key: 'culvert', label: 'Culvert' },
  { key: 'SignBoard', label: 'Sign Board' },
  { key: 'Bridge', label: 'Bridge' },
  { key: 'Toll', label: 'Toll Plaza' },
  { key: 'LightPole', label: 'Light Pole' },
  { key: 'Interchange', label: 'Interchange' },
  { key: 'PatchCondition', label: 'Patch Condition' },
  { key: 'CommercialEntity', label: 'Commercial Entity' },
  { key: 'RoadCrossing', label: 'Road Crossing' },
  { key: 'RetainingWall', label: 'Retaining Wall' },
  { key: 'DikeCurbStone', label: 'Dike & Curb Stone' },
  { key: 'GuardRail', label: 'Guard Rail' },
  { key: 'Tunnel', label: 'Tunnel' },
  // add remaining 10 here
]
  const currentFeature = ref(features[0].key)
  
  // Dynamic import map
  const featureComponentMap = {
    Road: defineAsyncComponent(() => import('../EditData/Forms/Road-Form.vue')),
     drainage: defineAsyncComponent(() => import('../EditData/Forms/Drainage-Form.vue')),
     culvert: defineAsyncComponent(() => import('../EditData/Forms/Culvert-Form.vue')),
     SignBoard: defineAsyncComponent(() => import('../EditData/Forms/Signboard-Form.vue')),
     Bridge: defineAsyncComponent(() => import('../EditData/Forms/Bridge-Form.vue')),
      Toll: defineAsyncComponent(() => import('../EditData/Forms/TollPlaza-Form.vue')),
      LightPole: defineAsyncComponent(() => import('../EditData/Forms/LightPole-Form.vue')),
      Interchange: defineAsyncComponent(() => import('../EditData/Forms/Interchange-Form.vue')),
      PatchCondition: defineAsyncComponent(() => import('../EditData/Forms/PatchCondition-Form.vue')),
      CommercialEntity: defineAsyncComponent(() => import('../EditData/Forms/CommercialEntity-Form.vue')),
      RetainingWall: defineAsyncComponent(() => import('../EditData/Forms/RetainingWall-Form.vue')),
      DikeCurbStone: defineAsyncComponent(() => import('../EditData/Forms/DikeCurbStone-Form.vue')),
      GuardRail: defineAsyncComponent(() => import('../EditData/Forms/GuardRail-Form.vue')),
      Tunnel: defineAsyncComponent(() => import('../EditData/Forms/Tunnel-Form.vue')),
      RoadCrossing: defineAsyncComponent(() => import('../EditData/Forms/RoadCrossing-Form.vue')),

  }
  
  const currentFormComponent = computed(() => featureComponentMap[currentFeature.value])

const selectFeature = (key) => {
  currentFeature.value = key
}
  </script>
  
  <style scoped>
.features {
  display: flex;
  justify-content: space-between; /* Distribute buttons evenly */
  font-size: 15px;
  gap: 0.2rem;
  margin: 1rem 0;
  padding: 0.5rem;
}

.features button {
  flex: 1 1 auto; /* Grow and shrink equally */
  text-align: center;
  padding: 0.5rem 1rem;
  margin: 0 0.25rem; /* Optional: to give small spacing on left/right */
  background: #eee;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  min-width: 100px; /* Optional: ensure buttons don’t shrink too small */
}

.features button.active {
  background: #3f51b5;
  color: white;
}

  </style>
  