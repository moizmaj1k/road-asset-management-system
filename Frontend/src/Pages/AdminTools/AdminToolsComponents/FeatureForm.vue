<template>
  <div class="form-panel flex flex-col p-4 bg-white h-full overflow-y-auto text-sm">
    <label class="block mb-4">
      <span class="block text-xs font-semibold mb-1">Choose Entity to Add</span>
      <select v-model="selected" class="w-full p-1 border rounded text-sm">
        <option disabled value="">Select asset</option>
        <option v-for="e in entities" :key="e">{{ e }}</option>
      </select>
    </label>

    <form @submit.prevent="onSave" class="flex-1">
      <div v-if="selected==='Bridge'" class="mb-4">
        <label class="block text-xs mb-1">Name</label>
        <input v-model="form.name" class="w-full p-1 border rounded mb-2 text-sm"/>
        <label class="block text-xs mb-1">Length (m)</label>
        <input type="number" v-model="form.length" class="w-full p-1 border rounded text-sm"/>
      </div>

      <div v-else-if="selected==='Culvert'" class="mb-4">
        <label class="block text-xs mb-1">Diameter (cm)</label>
        <input type="number" v-model="form.diameter" class="w-full p-1 border rounded mb-2 text-sm"/>
        <label class="block text-xs mb-1">Material</label>
        <input v-model="form.material" class="w-full p-1 border rounded text-sm"/>
      </div>

      <!-- …other entity sections… -->

      <button
        type="submit"
        :disabled="!selected"
        class="w-full mt-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm disabled:opacity-50"
      >
        Save {{ selected || 'Asset' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useAdminToolsStore } from '../../../stores/adminTools'
const store = useAdminToolsStore()

const entities = ['Bridge','Culvert','Road','Sign','Traffic Light','Other']
const selected = ref('')
const form = reactive({ name:'', length:null, diameter:null, material:'', /*…*/ })

watch(selected, () => {
  Object.keys(form).forEach(k => form[k] = typeof form[k]==='number'?null:'')
})

const emit = defineEmits(['save'])
function onSave() {
  emit('save', { geometry: store.featureGeometry, entity: selected.value, ...form })
}
</script>

<style scoped>
.form-panel { box-sizing: border-box; }
</style>
