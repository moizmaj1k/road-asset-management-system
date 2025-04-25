<template>
  <div class="toolbar-panel flex flex-col p-2 bg-white h-full overflow-y-auto">
    <h3 class="text-lg font-semibold mb-2">Map Tools</h3>

    <button @click="select('Point')"   class="tool-btn">Draw Point</button>
    <button @click="select('LineString')" class="tool-btn">Draw Line</button>
    <button @click="select('Polygon')" class="tool-btn">Draw Polygon</button>
    <button @click="select('Circle')"  class="tool-btn">Draw Circle</button>
    <button @click="select('Freehand')" class="tool-btn">Draw Freehand</button>

    <hr class="my-2 border-gray-300"/>

    <button @click="removeLastLayer" class="tool-btn bg-red-500 hover:bg-red-600">
      Remove Last Layer
    </button>
    <button @click="editLayer" class="tool-btn bg-green-500 hover:bg-green-600">
      Edit Layer
    </button>
    <button @click="undo" class="tool-btn bg-yellow-500 hover:bg-yellow-600">
      Undo Last
    </button>
    <button @click="clearAll" class="tool-btn bg-gray-700 hover:bg-gray-800">
      Clear All
    </button>
  </div>
</template>

<script setup>
import { useAdminToolsStore } from '../../../stores/adminTools'
const store = useAdminToolsStore()

function select(type) { store.setDrawMode(type) }
function removeLastLayer() { store.removeLastLayer() }
function editLayer() { store.startEdit() }
function undo() { store.undo() }
function clearAll() { store.clearAll() }
</script>

<style scoped>
.toolbar-panel { box-sizing: border-box; }
.tool-btn {
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  font-size: 0.875rem;
  text-align: left;
  background: #3b82f6;
  color: white;
  border-radius: 0.25rem;
  transition: background .2s;
}
.tool-btn:hover { background: #2563eb; }
</style>
