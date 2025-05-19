<template>
  <div class="flex flex-col h-screen">
    <!-- Collapsible tabs bar -->
    <div
      class="relative w-full transition-[height] duration-300 overflow-hidden bg-white"
      :class="store.isSidebarCollapsed ? 'h-8' : 'h-12'"
    >
    <div
      v-show="!store.isSidebarCollapsed"
      class="flex items-center h-12 px-4 space-x-6"
    >
      <router-link
        :to="{ name: 'AdminToolsAdd' }"
        class="text-sm hover:text-blue-600 link-spacing"
        active-class="font-semibold text-blue-600"
      >Add New</router-link>
      <router-link
        :to="{ name: 'AdminToolsEdit' }"
        class="text-sm hover:text-blue-600 link-spacing"
        active-class="font-semibold text-blue-600"
      >Edit Existing</router-link>
    </div>

      <!-- Collapse/Expand button -->
      <button
        @click="store.toggleSidebar()"
        class="absolute top-1 right-4 p-2 hover:bg-gray-100 rounded focus:outline-none"
      >
        <svg v-if="!store.isSidebarCollapsed" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>

    <!-- THIS is the only place we render the child route -->
    <div class="flex-1 overflow-hidden">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { useAdminToolsStore } from '../../stores/adminTools'
const store = useAdminToolsStore()
</script>

<style scoped>
.link-spacing {
  /* adjust these values to taste */
  letter-spacing: 0.1em;
  word-spacing: 0.05em;
}
</style>
