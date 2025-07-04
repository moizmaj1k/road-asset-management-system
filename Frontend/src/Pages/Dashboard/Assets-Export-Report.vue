<template>
  <div class="icon-container cursor-pointer"  @click="Showoption = !Showoption">
    <span class="pi pi-print"></span>
  </div>
  <div v-if="Showoption" class="popup">
    <button @click="exportPdf">Export Pdf</button>
  </div>
</template>
<script setup>
import { ref, defineEmits } from "vue";

const Showoption = ref(false);
const emits = defineEmits(['export-map-pdf'])
const exportPdf = () => {
emits('export-map-pdf')

}
</script>

<style scoped>
.popup {
  position: absolute;
  top: 20rem;
  left: 4rem;
  background-color: white;
  border: 4px solid #ccc;
  border-radius: 8px;
  padding: 10px 15px;
  height: 8rem; /* Set a fixed height */
  overflow-y: auto; /* Enable vertical scrolling */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  z-index: 1100;
  width: 10rem;
  padding: 3px;
}
</style>
