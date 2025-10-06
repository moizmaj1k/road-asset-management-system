<script setup>
import { defineProps, defineEmits, watch, computed, ref } from "vue";

const props = defineProps({
  item: {
    type: Object,
    default: () => ({ type: "", data: {} })
  }
});

const emit = defineEmits(["close"]);

watch(
  () => props.item,
  (newVal) => {
    console.log("SidePanel received:", JSON.stringify(newVal, null, 2));
  },
  { immediate: true, deep: true }
);

const closePanel = () => emit("close");
const formatKey = (key) => {
  let formatted = key.replace(/_/g, " ").toLowerCase();

  if (/_km$/i.test(key)) {
    formatted = formatted.replace(/ km$/i, " (KM)");
  } else if (/_m$/i.test(key)) {
    formatted = formatted.replace(/ m$/i, " (M)");
  }

  return formatted;
};

const getPicsArray = (pics) => {
  if (!pics) return [];

  // If it's already an array
  if (Array.isArray(pics)) {
    return pics.filter((url) => typeof url === "string" && url.trim().length > 0);
  }

  // If it's an object (rare case)
  if (typeof pics === "object") {
    return Object.values(pics)
      .filter((url) => typeof url === "string")
      .map((url) => url.trim());
  }

  // If it's a string (comma separated)
  if (typeof pics === "string") {
    return pics
      .split(",")
      .map((url) => url.trim())
      .filter((url) => url.length > 0);
  }

  return [];
};
const selectedImage = ref(null);
const rotation = ref(0);
const openImage = (link) => {
  selectedImage.value = link;
   rotation.value = 0;
};
const closeImage = () => {
  selectedImage.value = null;
   rotation.value = 0;
};
const rotateImage = () => {
  rotation.value = (rotation.value + 90) % 360;
};
</script>

<template >
  <transition name="slide" style="padding-bottom: 6rem;margin-top: 6.1rem;">
    <div v-if="item.data && Object.keys(item.data).length" class="side-panel mt-16">
      <div class="side-panel-header">
        <h3>{{ item.type === "roads" ? "Road Details" : "Asset Details" }}</h3>
        <button class="close-btn" @click="closePanel">✕</button>
      </div>

      <div class="side-panel-content">
<div
  v-for="(value, key) in item.type === 'roads' ? item.data.properties : item.data"
  :key="key + '-' + typeof value"
  class="row"
>
  <span class="key">{{ formatKey(key) }}:</span>
  <span class="value">
    <template v-if="key === 'pics' && value">
      <div class="pics-wrapper">
       <img
  v-for="(link, i) in getPicsArray(value)"
  :key="i"
  :src="link"
  alt="Asset Image"
  class="pic-thumb"
  @click="openImage(link)"
/>

      </div>
    </template>
    <template v-else-if="typeof value === 'object' && value !== null">
      {{ JSON.stringify(value) }}
    </template>
    <template v-else>
      {{ value }}
    </template>
  </span>
</div>

      </div>
    </div>
  </transition>
 <!-- ✅ Fullscreen Image Viewer -->
  <div v-if="selectedImage" class="fullscreen-overlay" @click.self="closeImage">
    <div class="fullscreen-controls">
      <button class="control-btn" @click="rotateImage">⟳</button>
      <button class="control-btn" @click="closeImage">✕</button>
    </div>
    <img
      :src="selectedImage"
      class="fullscreen-img"
      alt="Fullscreen view"
      :style="{ transform: `rotate(${rotation}deg)` }"
    />
  </div>
</template>


<style scoped>
.side-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 420px;
  height: 100%;
  background-color: #fff;
  border-left: 1px solid #ccc;
  box-shadow: -2px 0 5px rgba(0,0,0,0.1);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 10px;
}

.side-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
  margin-bottom: 10px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.side-panel-content table {
  width: 100%;
  border-collapse: collapse;
}

.side-panel-content td {
  padding: 6px 4px;
  border-bottom: 1px solid #eee;
}

.side-panel-content td.key {
  font-weight: bold;
  width: 40%;
  color: #333;
}

.side-panel-content td.value {
  width: 60%;
  color: #555;
}

/* Slide-in animation */
.slide-enter-active {
  transition: transform 0.3s ease;
}
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
.pics-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.pic-thumb {
  width: 120px;
  height: auto;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.2s ease;
  object-fit: cover;
}

.pic-thumb:hover {
  transform: scale(1.05);
}
.key-value-row {
  display: flex;
  gap: 6px;
  margin-bottom: 4px;
}

.row {
  display: flex;
  align-items: flex-start;
  margin-bottom: 6px;
  gap: 6px;
}

.key {
  font-weight: 600;
  white-space: nowrap; /* keeps "District Name:" together */
}

.value {
  flex: 1;
  word-break: break-word;
}

.pic-link {
  cursor: pointer;
  margin-right: 4px;
}
.fullscreen-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5000;
}

.fullscreen-img {
  max-width: 90%;
  max-height: 90%;
  border-radius: 8px;
}

.close-fullscreen {
  position: absolute;
  top: 20px;
  right: 30px;
  background: none;
  border: none;
  font-size: 32px;
  color: white;
  cursor: pointer;
}
/* Controls */
.fullscreen-controls {
  position: absolute;
  top: 20px;
  right: 30px;
  display: flex;
  gap: 10px;
}

.control-btn {
  background: rgba(255,255,255,0.2);
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background 0.2s;
}
.control-btn:hover {
  background: rgba(255,255,255,0.4);
}
</style>
