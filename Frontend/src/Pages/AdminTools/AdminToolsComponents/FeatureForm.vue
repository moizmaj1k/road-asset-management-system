<template>
    <form @submit.prevent="onSave">
      <div v-if="category==='Bridge'">
        <label>Name: <input v-model="form.name"/></label>
        <!-- other bridge fields -->
      </div>
      <div v-else-if="category==='Culvert'">
        <label>Diameter: <input v-model="form.diameter"/></label>
        <!-- culvert fields -->
      </div>
      <!-- more -->
      <button type="submit">Save</button>
    </form>
  </template>
  
  <script setup>
  import { reactive, toRefs, watch } from 'vue';
  const props = defineProps({
    geometry: [Array, Object],
    category: String
  });
  const emit = defineEmits(['save']);
  
  const form = reactive({ name: '', diameter: '' /* etc */ });
  
  watch(() => props.geometry, () => {
    // reset form on new geometry
    Object.assign(form, { name: '', diameter: '' });
  });
  
  function onSave() {
    emit('save', { geometry: props.geometry, category: props.category, ...form });
  }
  </script>
  