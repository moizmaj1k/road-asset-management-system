<template>
  <div class="h-full flex">
    <!-- 20% toolbar -->
    <div class="w-1/10 m-1 overflow-y-auto">
      <DrawToolbar />
    </div>

    <!-- center map -->
    <div class="flex-1 m-1 overflow-hidden">
      <OLMap />
    </div>

    <!-- 25% form -->
    <div class="w-1/4 m-1 overflow-y-auto">
      <FeatureForm
        :geometry="store.featureGeometry"
        :category="store.entityCategory"
        @save="saveFeature"
      />
    </div>
  </div>
</template>

<script setup>
import { useAdminToolsStore } from '../../stores/adminTools'
import DrawToolbar from './AdminToolsComponents/DrawToolbar.vue'
import OLMap from './AdminToolsComponents/OLMap.vue'
import FeatureForm from './AdminToolsComponents/FeatureForm.vue'

const store = useAdminToolsStore()
function saveFeature(payload) {
  console.log('Saving feature to backend:', payload)
  // store.saveFeature(payload)
}
</script>

<style scoped>
/* no extra CSS — it’s a simple flex layout */
</style>
